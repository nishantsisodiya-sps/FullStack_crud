import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from './int';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private router : Router) { }

  signup(data : signup){
   this.http.post<signup>('http://localhost:4300/register' , data , {observe : 'response'})
   .subscribe(result =>{
    if(result){
      this.router.navigate(['/home'])
    }
   })
  }


  login(data : login){
   this.http.post<login>('http://localhost:4300/login' , data , {observe : 'response'})
   .subscribe(result=>{
    if(result){
      this.router.navigate(['/home'])
    }else{
      window.alert("Invalid credentials");
    }
   })
  }
}
