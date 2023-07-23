import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Category } from 'src/app/shared/model/category.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loggedIn: boolean = false;
  showMobileNav: boolean = false;
  categories: Category[] = [{ id: 'all', name: 'All' }];

  constructor(
    public authService: AuthService,
    private afs: FirestoreService,
    private cookieService: CookieService
  ) {}

  toggleNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  getCategories() {
    if (this.cookieService.get('categories')) {
      this.categories = JSON.parse(this.cookieService.get('categories'));
    } else {
      this.afs.getCategories().subscribe((res) => {
        this.categories = res;
        this.cookieService.set('categories', JSON.stringify(this.categories), {
          expires: 3600,
        });
      });
    }
  }
}
