import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any
  currentAcno:any
  users: any = {
    1000: { acno: 1000, uname: "harithac", password: "100", balance: 5000,transaction:[]},
    1001: { acno: 1001, uname: "asheesh", password: "asheesh", balance: 5000,transaction:[] }
  }

  constructor() { 
    this.getDetails()
  }
  getTransaction(){
    return this.users[this.currentAcno].transaction
  }
  saveDetails(){
    if(this.users){
      localStorage.setItem("db",JSON.stringify(this.users))
    }
    if(this.currentUser){
      localStorage.setItem("cusername",JSON.stringify(this.currentUser))
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }
  getDetails(){
    if(localStorage.getItem("db")){
      this.users=JSON.parse(localStorage.getItem("db") || '')
    }
    if(localStorage.getItem("cusername")){
      this.currentUser=JSON.parse(localStorage.getItem("cusername") || '')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")|| '')
    }

  }
  register(acno: any, password: any, uname: any) {
    let db = this.users
    if (acno in db) {
      return false
    }
    else {
      db[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[]
      }
      console.log(db);
      this.saveDetails()
      return true

    }


  }
  login(acno: any, password: any) {
    let database = this.users
    if (acno in database) {
      if (password == database[acno]["password"]) {
        this.currentAcno=acno
        this.currentUser=database[acno]["uname"]
        this.saveDetails()
        return true
      }
      else {
        alert("invalid password")
        return false
      }


    }
    else {
      alert("invalid account number")
      return false
    }

  }
  deposit(acno:any,password:any,amt:any) {
    var amount=parseInt(amt)
    let db = this.users
    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] = db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()
        return db[acno]["balance"]
      }
      else {
        alert("Incorrect password")
        return false
      }

    }
    else {
      alert("Account doesnot exist")
      return false
    }
  }

  withdraw(acno:any,password:any,amt:any) {
    var amount=parseInt(amt)
    let db = this.users
    if (acno in db) {
      if (password == db[acno]["password"]) {
        if(db[acno]["balance"]>amount){
          db[acno]["balance"] = db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"DEBIT"
          })
          this.saveDetails()
          return db[acno]["balance"]

        }
        else{
          alert("Insuffient balance")
        }
       
      }
      else {
        alert("Incorrect password")
        return false
      }

    }
    else {
      alert("Account doesnot exist")
      return false
    }
  }
}
