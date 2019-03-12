import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app-service/auth.service';
import { Profile } from '../../app-model/profile';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loginData: Profile;
  isPhoneNumber: Boolean = true;
  siteVisited: Number;
  isUserValid: Boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    $('#liLogin').addClass('active');
    $('#liAdvertisement').removeClass('active');
    $('#liRegister').removeClass('active');
    this.loginData = new Profile();
    this.loginData.phone_username_type = true;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.isUserValid = true;
    this.submitted = true;
    const PHONE_REGEXP = /^-?([1-9]\d*)?$/;
    
    if (!this.loginForm.invalid) {

      this.loginData.username = $('#username').val();
      this.loginData.password = $('#password').val();
      if (!PHONE_REGEXP.test(this.loginData.username.toString())) {
        this.isPhoneNumber = false;
        return null;
      }

      this.authService.login(this.loginData).subscribe(res => {
        if (res.status == 200) {
          window.location.reload();
        }
        else {  
          this.isUserValid = false;
        }
      });
    }
  }

}
