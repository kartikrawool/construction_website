import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../../../model/user.model';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,

  ) {
    this.mainForm();
  }
  ngOnInit() { }

  mainForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

    })
  }

  get myForm() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      if (this.loginForm.value.username == "admin" && this.loginForm.value.password == "admin") {
        window.alert('Login as admin')
        this.ngZone.run(() => this.router.navigateByUrl('/portfolio-list'));
      } else {
        window.alert('Incorrect username or password')
      }
      return;
    }
  }
}
  /* public user : User;

constructor(private loginService: LoginService) {
this.user = new User();
}

validateLogin() {
if(this.user.username && this.user.password) {
this.loginService.validateLogin(this.user).subscribe(result => {
console.log('result is ', result);
}, error => {
console.log('error is ', error);
});
} else {
alert('enter user name and password');
}
}

} */