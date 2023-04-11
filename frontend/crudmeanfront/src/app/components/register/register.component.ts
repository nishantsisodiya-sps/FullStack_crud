import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { users } from 'src/app/service/int';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  index : any
  update = false
  myusers: users[] = []
  postuser: users[] = [];
  studentForm !: FormGroup
  data: users[] = []
  constructor(private api: ApiService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {

    this.studentForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    this.getuser()
  }

  getuser() {
    this.api.getUser().subscribe(result => {
      this.myusers = result
    })
  }

  submits() {
    this.api.createUser(this.studentForm.value).subscribe(result => {
      if (result) {
        this.getuser()

      } else {
        console.log("something is missing");
      }
    })
  }

  deleteUser(user: any, i: any) {
    let id = user.myusers[i]._id
    this.api.deleteUser(id).subscribe(result => {
      if (result) {
        this.getuser()
      } else {
        console.log("something went wrong");
      }
    })
  }

  updateUser(user: any, i: any) {

    this.index = i
    var mydata = user.myusers[i]
    this.studentForm.setValue({
      email: mydata.email,
      firstname: mydata.firstname,
      lastname: mydata.lastname,
      phone: mydata.phone,
    })
    this.update = true

  }
  
  updated(user : any){
    let i = this.index
    let id = user.myusers[i]._id
    let data = this.studentForm.value
    this.api.updateUser(id , data).subscribe(result=>{
      if(result){
        this.getuser()
      }else{
        console.log("something went wrong");
      }
    })
  } 
}


