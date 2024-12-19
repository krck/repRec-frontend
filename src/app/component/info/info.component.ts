import { RestApiService } from '../../service/rest-api.service';
import { UserService } from '../../service/user-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  userName: string | undefined = undefined;

  constructor(public userService: UserService, private restApiService: RestApiService) { }

  ngOnInit() {
    // Subscribe to the user$ observable
    this.userService.user$.subscribe(user => {
      this.userName = user?.nickname;  // Update the local variable when the user data changes
    });
  }

}
