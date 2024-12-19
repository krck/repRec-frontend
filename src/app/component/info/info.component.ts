import { ApiQueryService } from '../../service/api-query-service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user-service';
import { RepRecUser } from '../../models/repRecUser';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { roles } from '../../enums/roles';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  user: RepRecUser | null = null;
  userRoles: string[] | undefined = undefined;
  apiVersion: string | undefined = undefined;
  webVersion: string | undefined = undefined;

  constructor(public userService: UserService, private apiQueryService: ApiQueryService) { }

  ngOnInit() {
    // Subscribe to the user$ observable
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.userRoles = user?.userRoles?.map(r => roles.get(r.roleId) ?? "")
    });

    this.apiQueryService.getApiVersion().subscribe(
      (version) => { this.apiVersion = version.version; },
      (error) => { }
    );

    this.webVersion = environment.version;
  }

}
