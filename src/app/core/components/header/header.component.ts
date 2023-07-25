import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Category } from 'src/app/shared/model/category.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { CookieService } from 'ngx-cookie-service';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  showMobileNav: boolean = false;
  categories: Category[] = [];
  activeRoute: string = '/';

  constructor(
    public authService: AuthService,
    private afs: FirestoreService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.activeRoute = this.router.url;
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  toggleNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  getCategories() {
    const sub = this.afs.getCategories().subscribe((res) => {
      this.categories = res;
      sub.unsubscribe();
    });
  }
}
