import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { LightgalleryModule } from 'lightgallery/angular';


import { ContactComponent } from './features/contact/component/contact/contact.component';
import { DashboardComponent } from './features/dashboard/component/dashboard/dashboard.component';
import { SignInComponent } from './features/auth/component/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/component/sign-up/sign-up.component';
import { VerifyEmailComponent } from './features/auth/component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './features/auth/component/forgot-password/forgot-password.component';
import { HomeComponent } from './features/home/component/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PreloaderComponent } from './core/components/preloader/preloader.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './core/components/header/header.component';

import { GalleryComponent } from './features/gallery/components/gallery/gallery.component';
import { AlbumComponent } from './features/gallery/components/album/album.component';
import { ToastComponent } from './core/components/toast/toast.component';

import { AuthService } from './shared/services/auth.service';
import { ToastService } from './shared/services/toast.service';
import { AdminComponent } from './features/dashboard/component/admin/admin.component';
import { ProfileComponent } from './features/dashboard/component/profile/profile.component';
import { SideNavComponent } from './features/dashboard/component/side-nav/side-nav.component';
import { DropzoneComponent } from './core/components/dropzone/dropzone.component';

import { DialogComponent } from './core/components/dialog/dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './shared/services/storage.service';
import { FirestoreService } from './shared/services/firestore.service';

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
    ToastComponent,
    AdminComponent,
    AlbumComponent,
    ProfileComponent,
    SideNavComponent,
    DropzoneComponent,
    DialogComponent
  ],
  providers: [
    AuthService,
    ToastService,
    StorageService,
    FirestoreService,
    CookieService,  
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    LazyLoadImageModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    HttpClientModule,
    LightgalleryModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
