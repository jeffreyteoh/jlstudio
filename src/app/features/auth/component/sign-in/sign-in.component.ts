import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loading = false;

  constructor(public authService: AuthService, private fb: FormBuilder) {

  }

  signinForm!: FormGroup;

  ngOnInit() {
    let password = 'Test@123test';

    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: [password, Validators.required],
      remember: [false],
    });
  }

  async onSubmit(form: any) {
    console.log(form.value);
    this.signinForm.disable();
    this.loading = true;

    await this.authService.SignIn(form.value.email, form.value.password);


    this.loading = false;

    this.signinForm.enable();
  }
}
