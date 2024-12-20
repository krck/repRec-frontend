import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiQueryService } from '../../service/api-query-service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Role, roles } from '../../enums/roles';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserRoleRecord {
  email: string;
  emailVerified: boolean,
  createdAt?: Date;
  roleName: string;
};

@Component({
  selector: 'app-admin-user-roles',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatSortModule,
    MatInputModule, MatFormFieldModule, MatIconModule, FormsModule
  ],
  templateUrl: './admin-user-roles.component.html',
  styleUrl: './admin-user-roles.component.scss'
})
export class AdminUserRolesComponent implements OnInit {

  displayedColumns: string[] = ['email', 'emailVerified', 'createdAt', 'roleName'];
  userRoleRecords: UserRoleRecord[] = [];

  dataSource!: MatTableDataSource<UserRoleRecord>;

  @ViewChild(MatSort) sort!: MatSort | null;

  constructor(private apiQueryService: ApiQueryService) { }

  ngOnInit() {
    this.apiQueryService.getUserRoles().subscribe(
      (userRolesRes) => {
        // Transform the user roles into a more readable format
        this.userRoleRecords = userRolesRes.flatMap((userRole) => {
          return (userRole.userRoles?.map((role) => {
            return {
              email: userRole.email,
              emailVerified: userRole.emailVerified,
              createdAt: userRole.createdAt ? new Date(userRole.createdAt) : undefined,
              roleName: roles.get(role.roleId) ?? "Unknown"
            };
          }) ?? []);
        });

        this.dataSource = new MatTableDataSource<UserRoleRecord>(this.userRoleRecords);

        // Sort the user roles by email
        this.dataSource.sort = this.sort;
      },
      (error) => { }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
