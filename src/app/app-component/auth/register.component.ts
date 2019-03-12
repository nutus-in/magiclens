import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app-service/auth.service';
import { Profile } from '../../app-model/profile';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  isPhoneNumber: Boolean = true;
  userData: Profile;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    $('#liRegister').addClass('active');
    $('#liAdvertisement').removeClass('active');
    $('#liLogin').removeClass('active');
    this.userData = new Profile();
    this.userData.phone_username_type = true;

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(30)],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      terms: [false]
    });
  }

  get f() { return this.registerForm.controls; }

  sendOTP() {
    const PHONE_REGEXP = /^-?([1-9]\d*)?$/;
    let phone = $('#username').val();

    if (phone == "" || !PHONE_REGEXP.test(phone) || phone.length != 10) {
      $('#btnValidPhone').click();
      return null;
    }

    this.authService.sendOTP(phone).subscribe(res => {
      if (res.status == 200 && res.json()["status"] == "success") {
        $('#btnOtpSendSuccessALert').click();
      }
      else {
        $('#btnOtpSendErrorALert').click();
      }
    });
  }

  register() {
    this.submitted = true;
    const PHONE_REGEXP = /^-?([1-9]\d*)?$/;
    
    if (!this.registerForm.invalid) {

      this.userData.username = $('#username').val();
      this.userData.password = $('#password').val();
      this.userData.otp = $('#otp').val();

      if (!PHONE_REGEXP.test(this.userData.username.toString())) {
        this.isPhoneNumber = false;
        return null;
      }

      if (this.registerForm.controls.terms.value) {
        this.authService.register(this.userData).subscribe(res => {
          if (res.status == 201) {
            this.router.navigateByUrl("/registration-success");
          }
          else if (res.status == 200) {
            $('#btnValidOTP').click();
          }
          else if (res.status == 409) {
            $('#btnUserExistsModal').click();
          }
          else {  
            this.router.navigateByUrl("/error");
          }
        });
      }
      else {
        $('#btnTermsValidation').click();
      }
    }
  }

}
