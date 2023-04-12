import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from './int';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }

  createUser(data:users):Observable<any>{
    return this.http.post<users>('http://localhost:4300/user' , data);
  }

  getUser():Observable<any>{
    return this.http.get('http://localhost:4300/users')
  }

  deleteUser(id : users):Observable<any>{
    return this.http.delete(`http://localhost:4300/users/${id}`)
  }

  updateUser(id:users , data:users):Observable<any>{
    return this.http.patch(`http://localhost:4300/users/${id}` , data)
  }

}
