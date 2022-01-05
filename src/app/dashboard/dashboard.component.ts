import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno = ""
  pswd = ""
  amount = ""

  acno1 = ""
  pswd1 = ""
  amount1 = ""
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern("[0-9]*")]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern("[0-9]*")]]
  })
  withdrawForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern("[0-9]*")]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern("[0-9]*")]]
  })
  user=this.ds.currentUser
  constructor(private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if (this.depositForm.valid) {
      let result = this.ds.deposit(acno, pswd, amount)
      if (result) {
        alert(amount + "credited..New balance is:" + result)

      }

    }
    else {
      alert("Invalid Form")
    }

  }
  withdraw() {
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount
    if (this.withdrawForm.valid) {
      console.log(acno);
      let result = this.ds.withdraw(acno, pswd, amount)
      if (result) {
        alert(amount + "debited..New balance is:" + result)

      }

    }
    else {
      alert("Invalid Form")
    }

  }

}
