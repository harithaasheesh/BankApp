import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="yor perfect banking partner"
  accno="Account number please"
  acno=""
  pswd=""
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern("[0-9]*")]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })


  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
// login(){
//   var acno=this.acno
//   var pswd=this.pswd
//   let database=this.users
//   if(acno in database){
//     if(pswd==database[acno]["password"]){
//       alert("login successfull")
//     }
//     else{
//       alert("invalid password")
//     }
    

//   }
//   else{
//     alert("invalid account number")
//   }
//   alert("login clicked")
// }

// acnoChange(event:any){
//   this.acno=event.target.value
//   console.log(this.acno);

  
  
// }
// paswdChange(event:any){
//   this.pswd=event.target.value
//   console.log(this.pswd);
  
  
// }


// login(a:any,p:any){
//   console.log(a);
  
//   var acno=a.value
//   var pswd=p.value
//   let database=this.users
//   if(acno in database){
//     if(pswd==database[acno]["password"]){
//       alert("login successfull")
//     }
//     else{
//       alert("invalid password")
//     }
    

//   }
//   else{
//     alert("invalid account number")
//   }
//   alert("login clicked")
// }

login(){
    var acno=this.loginForm.value.acno
    var password=this.loginForm.value.pswd
    if(this.loginForm.valid){
      let result=this.ds.login(acno,password)
      if(result){
        alert("login successfull")
        this.router.navigateByUrl('dashboard')
      }
      

    }
    else{
      alert("Invalid Form")
    }
   
    
  }
}
