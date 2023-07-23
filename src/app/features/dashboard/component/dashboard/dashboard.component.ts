import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  curNav: string = 'album';

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      // this.authService.SignOut();
    }
  }


  navigateTo(nav: string) {
    this.curNav = nav;
  }
}