import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public ErrorStatus=false;
  public SuccessStatus=false;
  public LoadingSpinner=false;
  public StatusMessage:any;
  constructor(public connectionService:ConnectionService) { }

  ngOnInit(): void {
   
   
  }

  onSubmit(ChangeForm:NgForm){
    this.LoadingSpinner=true;
    var oldpassword="";
    var newpassword="";
    var confirmnewpassword="";
    
   
    oldpassword=ChangeForm.controls.currentpassword.value;
    newpassword=ChangeForm.controls.newpassword.value;
    confirmnewpassword=ChangeForm.controls.confirmnewpassword.value;

    
    this.connectionService
    .changepassword(oldpassword,newpassword,confirmnewpassword)
    .pipe(first())
    .subscribe({
      next: data => {
        this.LoadingSpinner = false;
        this.ErrorStatus=false;
        this.SuccessStatus=true;
      
      
      },
      error: error => {
        this.LoadingSpinner = false;
       this.ErrorStatus=true;
       if(error.error.message!=null){
       this.StatusMessage=error.error.message;
       }
       else{
         
         if(error.statusText=="Bad Request"){
           this.StatusMessage="All fields are required!"
         }
         else{
         this.StatusMessage=error.statusText;
         }
         
       }
       
      }
  });
   
   

}
}