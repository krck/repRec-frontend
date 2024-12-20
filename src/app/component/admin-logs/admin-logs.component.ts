import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiQueryService } from '../../service/api-query-service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ErrorLog } from '../../models/errorLog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

enum FilterType {
  LastHour = 1,
  LastDay = 2,
  LastWeek = 3,
}

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatSortModule, MatButtonModule,
    MatInputModule, MatFormFieldModule, MatIconModule, FormsModule
  ],
  templateUrl: './admin-logs.component.html',
  styleUrl: './admin-logs.component.scss'
})
export class AdminLogsComponent implements OnInit {

  displayedColumns: string[] = ['timestamp', 'level', 'userName', 'exceptionType', 'message', 'source'];
  filterType: FilterType = FilterType.LastDay;  // Default filter mode: Last Day
  errorLogRecords: ErrorLog[] = [];

  dataSource!: MatTableDataSource<ErrorLog>;

  @ViewChild(MatSort) sort!: MatSort | null;

  constructor(private apiQueryService: ApiQueryService) { }

  ngOnInit() { this.loadLogs(); }

  onFilterButtonClick(type: FilterType): void {
    // Validate the filter type
    if (type < FilterType.LastHour || type > FilterType.LastWeek) {
      return;
    }

    this.filterType = type;
    this.loadLogs();
  }

  private loadLogs(): void {
    this.apiQueryService.getErrorLogs(this.filterType).subscribe(
      (errorLogs) => {
        this.errorLogRecords = errorLogs;
        this.dataSource = new MatTableDataSource<ErrorLog>(this.errorLogRecords);

        // Sort the user roles by email
        this.dataSource.sort = this.sort;
      },
      (error) => { }
    );
  }

}
