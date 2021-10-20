import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService} from '../services/connection.service';
import { Notification } from '../models/StructureClass';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public Name: any;
  public count=0;
  public HomeContent = false;
  public EditProfileContent = false;
  public FeedbackContent = false;
  public MessagesContent = false;
  public NotificationClicked=false;
  public NotificationStatus=false;
  public ChangePasswordContent=false;
  public NotificationCount:any;
 
  
  
  constructor(private router:Router,public connectionService:ConnectionService) { 
  }
  public notification:Notification[] | any;
  public AlertMessage:any;
  public AlertMessageStatus:any;

  ngOnInit(): void {
    this.HomeContent = true;
    this.EditProfileContent = false;
    this.FeedbackContent = false;
    this.MessagesContent = false;
    this.NotificationClicked=false;
    this.ChangePasswordContent=false;
    this.Name = localStorage.getItem('CurrentUser');
    if(this.Name==null){
      this.connectionService.logout();
    }
   this.connectionService.getNotification().subscribe(data=>{this.notification=data; console.log(data)});
   this.NotificationCount=this.connectionService.NotificationCount;
  
}

  edit(){
    this.HomeContent = false;
    this.EditProfileContent = true;
    this.FeedbackContent = false;
    this.MessagesContent = false;
    this.ChangePasswordContent=false;
  
  }
  feedback(){
    this.HomeContent = false;
    this.EditProfileContent = false;
    this.FeedbackContent = true;
    this.MessagesContent = false;
    this.ChangePasswordContent=false;
   
  }
  messages(){
    this.HomeContent = false;
    this.EditProfileContent = false;
    this.FeedbackContent = false;
    this.MessagesContent = true;
    this.ChangePasswordContent=false;
 
  }
  home(){
    this.HomeContent = true;
    this.EditProfileContent = false;
    this.FeedbackContent = false;
    this.MessagesContent = false;
    this.ChangePasswordContent=false;
   
  }
  changepassword(){
    this.ChangePasswordContent=true;
    this.HomeContent = false;
    this.EditProfileContent = false;
    this.FeedbackContent = false;
    this.MessagesContent = false;
  }

  logout(){
    this.connectionService.logout();
    
  }
  ClearAllNotification(){
  
       this.connectionService.ClearNotification(1)
       .pipe(first())
       .subscribe({
        next: data => {
            this.NotificationStatus =false;
            this.AlertMessageStatus=true;
            this.AlertMessage="Cleared All Notification";
           
        },
        error: error => {
          this.NotificationStatus =true;
          this.AlertMessageStatus=true;
          this.AlertMessage="No Notification Found";
          
        
        }
    });
  }

  MarkAllAsRead(){
    this.connectionService.MarkAllNotification(1)
       .pipe(first())
       .subscribe({
        next: data => {
            this.NotificationStatus =true;
            this.AlertMessageStatus=true;
            this.AlertMessage="Marked All as Read";
           
        },
        error: error => {
          this.NotificationStatus =false;
          console.log(error);
          this.AlertMessageStatus=true;
          this.AlertMessage="No Notification Found";
         
        }
    });
  }
  call(){
    this.NotificationClicked=true;
    this.count++;
    this.NotificationCount=this.connectionService.NotificationCount;

    
  }
 
  
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if((this.NotificationClicked==true)&&(this.count==0)){
      this.NotificationClicked=false;

    }
    else{
      if(this.NotificationClicked!=false){
      this.NotificationClicked=true;
      this.count--;
      }
    }
  }
}
