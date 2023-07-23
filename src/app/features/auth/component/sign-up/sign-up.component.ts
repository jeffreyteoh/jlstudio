import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { equivalentValidator } from '../../../../shared/validators/equivalent.validator';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  userForm!: FormGroup;
  showPass = false;
  showPass2 = false;

  pass = 'password';
  pass2 = 'password';

  loading = false;

  constructor(public authService: AuthService, private fb: FormBuilder, public toastService: ToastService) {
    let name = 'Jeffrey';
    let email = 'jefubao@gmail.com';
    let password = 'Test@123test';


    this.userForm = fb.group({
      name: [name, [Validators.required]],
      email: [email, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: [password, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      password2: [password, [Validators.required]],
      agree: [true, [Validators.requiredTrue]],
    }, {
      validators: equivalentValidator('password', 'password2'),
    });
  }

  async onSubmit(form: any) {
    form.disable();
    this.loading = true;
    try {
      await this.authService.SignUp(form.value.email, form.value.password, form.value.name);
    }
    catch (error) {
      console.log(error);
    }

    form.enable();
    this.loading = false;

  }

  togglePassword() {
    if (this.pass === 'password') {
      this.pass = 'text';
      this.showPass = true;
    } else {
      this.pass = 'password';
      this.showPass = false;
    }
  }

  togglePassword2() {
    if (this.pass2 === 'password') {
      this.pass2 = 'text';
      this.showPass2 = true;
    } else {
      this.pass2 = 'password';
      this.showPass2 = false;
    }
  }

  get password() {
    return this.userForm.get('password');
  }

  get password2() {
    return this.userForm.get('password2');
  }
}

