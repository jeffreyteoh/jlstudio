import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;

  forgotPassForm!: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder) {
    this.forgotPassForm = this.fb.group({
      email: ['', Validators.required],
    });
  }
  
  ngOnInit() {}

  /**
   * Submits the form asynchronously.
   *
   * @param {any} form - the form to submit
   * @return {Promise<void>} a promise that resolves when the form is submitted
   */
  async onSubmit(form: any) {
    this.loading = true;
    await this.authService.ForgotPassword(form.value.email);
    this.loading = false;
  }
}
