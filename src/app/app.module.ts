import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { DashboardComponent } from './features/dashboard/component/dashboard/dashboard.component';
import { SignInComponent } from './features/auth/component/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/component/sign-up/sign-up.component';
import { VerifyEmailComponent } from './features/auth/component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './features/auth/component/forgot-password/forgot-password.component';
import { AuthService } from './shared/services/auth.service';
import { HomeComponent } from './features/home/component/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PreloaderComponent } from './core/components/preloader/preloader.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ContactComponent } from './features/contact/component/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { GalleryComponent } from './features/gallery/components/gallery/gallery.component';
import { ServicesComponent } from './features/services/components/services/services.component';
import { AboutComponent } from './features/about/components/about/about.component'; 


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    HomeComponent,
    PageNotFoundComponent,
    PreloaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    HeaderComponent,
    ContactComponent,
    GalleryComponent,
    ServicesComponent,
    AboutComponent,
  ],
  providers: [AuthService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
