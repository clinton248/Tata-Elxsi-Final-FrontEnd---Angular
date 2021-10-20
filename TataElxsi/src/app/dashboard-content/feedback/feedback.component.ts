import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  RatingDiv=true;
  RatingMessage=false;
  public LoadingSpinner = false;
  public Error=false;
  public error:any;  
  Ratings:any;
  Comments:any;
  constructor(private router:Router, public connectionService:ConnectionService) { }

  ngOnInit(): void {
    this.RatingDiv=true;
    this.RatingMessage=false;
  }
  onSubmit(FeedBackForm:NgForm){
    this.LoadingSpinner = true;

    this.Comments=FeedBackForm.controls.comments.value;
    this.Ratings=FeedBackForm.controls.rating.value;
    
      this.connectionService.Ratings=5;

      this.connectionService
      .feedback(localStorage.getItem('CurrentUser'),this.Ratings,this.Comments)
      .pipe(first())
      .subscribe({
        next: data => {
          this.LoadingSpinner = false;
          this.RatingDiv=false;
      this.RatingMessage=true;
        
        },
        error: error => {
          this.Error=true;
          this.error=error.error.message;
          this.LoadingSpinner = false;
       console.log(error)
        }
    });
    
      
    
  }

}
