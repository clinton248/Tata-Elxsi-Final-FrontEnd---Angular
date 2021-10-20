import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public Status = false;
  public LoadingSpinner=false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  
  move_to_register(){
    this.router.navigateByUrl('/register');
  }
  
  
  onSubmit(ForgotPasswordForm:NgForm){
    this.LoadingSpinner=true;
    var email="";
    email=ForgotPasswordForm.controls.email.value;
    this.Status = true;
   
  }
}


 