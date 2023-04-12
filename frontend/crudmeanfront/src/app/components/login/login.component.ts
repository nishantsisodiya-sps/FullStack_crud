import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { signup } from 'src/app/service/int';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  signupForm !: FormGroup
  signupdata : [] = []
  constructor(private fb:FormBuilder , private Authapi : AuthService , private router : Router) { 

    this.loginForm = this.fb.group({
      email : ['' , [Validators.required]],
      password : ['' , [Validators.required]]
    })


    this.signupForm = this.fb.group({
      name : ['' , [Validators.required]],
      email : ['' , [Validators.required]],
      password : ['' , [Validators.required]],
      Cpassword : ['' , [Validators.required]]
    })


  }

  ngOnInit(): void {
  }

  submitUser(){
    let data = this.signupForm.value;
    this.Authapi.signup(data)
  }

  loginUser(){
    let data = this.loginForm.value;
    this.Authapi.login(data)
  }

}
