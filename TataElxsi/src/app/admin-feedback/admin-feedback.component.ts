import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { FeedbackService } from '../services/feedback.service';
@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
  dataSaved = false;
  feedbackForm: any;
  allFeedbacks: any = [];
  ReplyTextboxStatus = false;
  ReplyTextbox: any;
  feedbackid: any;
  public editFeedback: any = false;
  public replyFeedback: any = false;
  public fieldName: any = "";
  public currentInd: any;
  public updateFeedbackSpinner = false;
  public showBox:any=false;
  public fbEdited:any={};
  public Errors={
    prevRep:'',
    error:false,
    msg:" "
  };
  //allFeedbacks:any=[{"UserName":"Sanjay","Email":"Sanjay@gmail.xom","DateTime":"10-10-2021 10:23 PM","Comment":"Hello Hi welcome", "Rating":"5"}]
  feedbackIdUpdate = null;
  massage: any;

  constructor(public formbulider: FormBuilder, public feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackForm = this.formbulider.group({
      // Id: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      Feedback: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      //  Rating: ['', [Validators.required]],  
      //   DateTime: ['', [Validators.required]],  

    });
    this.loadAllFeedbacks();
  }
  loadAllFeedbacks() {
    this.updateFeedbackSpinner = true;
    this.feedbackService.getAllFeedback().subscribe(data => {
      this.allFeedbacks = data;
      console.log(data);
      if (data) {
        this.Errors.error=false;
        this.updateFeedbackSpinner = false;

      }
    });
  }
  deleteFeedback(fb: any) {
    console.log("Delete:::", fb)
    if (confirm("Are you sure you want to delete this ?")) {
      this.feedbackService.deleteFeedbackById(fb.id).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllFeedbacks();
        this.feedbackIdUpdate = null;
        this.feedbackForm.reset();

      });
    }
  }
  resetForm() {
    this.feedbackForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
  FeedBackReply(id: any) {
    this.ReplyTextboxStatus = true
    this.feedbackid = id;

  }

  editOrReplyFeedback(key: any, feedback: any) {
    console.log("Key:::", key, feedback)
  }

  feedbackreplysubmit(fbs: any) {
    var replyfeedbackfromadmin = fbs.value;
    console.log(replyfeedbackfromadmin)
    this.feedbackService
      .ReplyToFeedback(this.feedbackid, replyfeedbackfromadmin)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          console.log(data)

        },
        error: (error: any) => {
          console.log(error)

        }
      });
  }

  onEditFeedback(key: any, editFeedback1: any, fbReply:any,ind: any) {
    this.Errors.prevRep = editFeedback1.feedback;
    var editFeedback = editFeedback1;
    console.log("Key::::", key, " Edit:::", editFeedback, ind, fbReply, " >>>>",JSON.stringify(editFeedback));

    // {"reply":fbReply.reply, "replyDate": new Date().toJSON()}
    this.currentInd = ind;
    if (key == 'edit') {
      editFeedback.feedback = fbReply.reply;
      // this.fieldName = 'Edit this ';
      this.feedbackService.editFeedback(editFeedback).subscribe(data => {
        console.log("response after editing feedback:::", data);
        if(data){
          this.Errors.error=false;
          this.loadAllFeedbacks();
        }
      },
      err=>{
        this.Errors.error = true;
        this.Errors.msg = err.error.message;
        console.log("Error Edit:::", this.Errors.msg, err);
      });
    }
    else if (key == 'reply') {

      editFeedback.reply = fbReply.reply;
      editFeedback.replyDate = new Date().toJSON();
      // this.fieldName = 'Reply To ';
      this.feedbackService.ReplyToFeedback(editFeedback.id, editFeedback).subscribe(data => {
        console.log("Reply:::", data);
        if(data){
          this.Errors.error=false;
          this.loadAllFeedbacks();
        }
      },
      err=>{
        this.Errors.error = true;
        this.Errors.msg = err.error.message;
        console.log("Error Reply:::", err);
      });
    }
  }
}
