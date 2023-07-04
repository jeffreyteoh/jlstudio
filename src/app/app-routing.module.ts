import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './features/auth/component/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/component/sign-up/sign-up.component';
import { DashboardComponent } from './features/dashboard/component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './features/auth/component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './features/auth/component/verify-email/verify-email.component';
import { HomeComponent } from './features/home/component/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ContactComponent } from './features/contact/component/contact/contact.component';
import { GalleryComponent } from './features/gallery/components/gallery/gallery.component';
import { AboutComponent } from './features/about/components/about/about.component';
import { ServicesComponent } from './features/services/components/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SignInComponent,
    data: { breadcrumb: {
      label: 'Sign in',
      url: '/signin' 
    }},
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: { breadcrumb:  {
      label: 'Sign Up',
      url: '/signup' 
    } },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: {
      label: 'Dashboard',
      url: '/dashboard' 
    } },
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    data: { breadcrumb: {
      label: 'Forgot Password',
      url: '/forgot' 
    } },
  },
  {
    path: 'verify',
    component: VerifyEmailComponent,
    data: { breadcrumb:  {
      label: 'Verify',
      url: '/verify' 
    }  },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { breadcrumb: {
      label: 'Contact',
      url: '/contact' 
    }},
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { breadcrumb: {
      label: 'Gallery',
      url: '/gallery' 
    }},
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { breadcrumb: {
      label: 'Services',
      url: '/services' 
    }},
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { breadcrumb: {
      label: 'About',
      url: '/about' 
    }},
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
