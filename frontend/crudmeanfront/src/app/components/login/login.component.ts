import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  signupForm !: FormGroup
  constructor(private fb:FormBuilder) { 

    this.loginForm = this.fb.group({
      email : ['' , [Validators.required] , Validators.email],
      password : ['' , [Validators.required]]
    })


    this.signupForm = this.fb.group({
      name : ['' , [Validators.required]],
      email : ['' , [Validators.required] , Validators.email],
      password : ['' , [Validators.required]],
      Cpassword : ['' , [Validators.required]]
    })


  }

  ngOnInit(): void {
  }

  submitUser(){
    console.log(this.signupForm.value);
  }

  loginUser(){
    console.log(this.loginForm.value);
  }

}
