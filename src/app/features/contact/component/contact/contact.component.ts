import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { equivalentValidator } from '../../../../shared/validators/equivalent.validator';
import { ToastService } from '../../../../shared/services/toast.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ContactComponent {
  userForm!: FormGroup;
  showPass:boolean = false;
  showPass2: boolean = false;
  submmited: boolean = false;

  pass: string = 'password';
  pass2 : string = 'password';

  loading: boolean = false;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public toastService: ToastService
  ) {
    this.userForm = fb.group(
      {
        name: ['', [Validators.required]],
        partnerName: [],
        email: [
          '',
          [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)],
        ],
        location: ['', Validators.required],
        tell: [''],
        source: [''],
        date: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        preferred: ['', [Validators.required]],
        ig: [''],
      },
      {
        validators: equivalentValidator('password', 'password2'),
      }
    );
  }

  async onSubmit(form: any) {
    if (this.submmited) {
      return;
    }

    form.disable();
    this.loading = true;

    try {
      const result: EmailJSResponseStatus = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.template.contact,
        form.value,
        environment.emailjs.publicKey
      );

      this.toastService.show(result.text, {type: 'success'});	
      console.log(form);
      this.submmited = true;
    } catch (error) {
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
