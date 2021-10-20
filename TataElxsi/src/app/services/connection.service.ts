import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Notification, UserDetails } from '../models/StructureClass';
import { Observable, throwError } from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import { Feedback } from '../models/StructureClass';
import { DatePipe, formatDate } from '@angular/common';

@Injectable()
export class ConnectionService {
  
 
  public Ename="";
  public Ratings:any;
  public Comments:any;
  public CurrentUser:any;
  public CurrentUserToken:any;
  public NotificationCount=0;
  public CurrentUserEmail : any;

  public CurrentUserRole : any;

  public CurrentUserStatus : any;
  data: any = []
  public header = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('CurrentUserToken')
 });
 url="http://localhost:40225/feedback"
 constructor(private http:HttpClient, public router:Router) { 

}


  
  getAllFeedback(): Observable<Feedback[]> {  
    return this.http.get<Feedback[]>(this.url ); 
}
deleteFeedbackById(feedbackid: number): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + "/" +feedbackid,  
httpOptions);  
}  
ReplyToFeedback(fbs:any,reply:any){

 
   var userName=fbs.userName;
   var id=fbs.id;
   var feedback=fbs.feedback;
   var reply=reply.value;  
var date=formatDate(Date.now(),'dd-MM-yyyy HH:mm:ss ','en-US');
  
alert(date)
   var replyDate=new Date();
 
   return  this.http.put(this.url+"/"+id, {id,userName,feedback,date,reply,replyDate})
.pipe(
  map((response) => {
   return response;
  })
);

 }
  
 

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
 getUsers():Observable<UserDetails[]>
  {
    return this.http.get<UserDetails[]>(environment.baseUrl1+"/api/User/all").pipe(catchError(this.handleError));
  
  } 
  // editstatus(params:any):Observable<any>{
  //   console.log("Params::", params);
  editstatus(Status:any, UserName:any):Observable<any>{
    //console.log("Params::", params);
   // var UserName=localStorage.getItem('CurrentUser');
   
  //  const body = new HttpParams().set('UserName',userName).set('status', status)
  //  console.log("status :: " , status)
  //  console.log("status :: " , userName)
   //console.log("body :: " , body)
   Status ? Status="true" : Status = "false";
  return this.http.put<any>(environment.baseUrl1+"/api/User/Edit",{UserName,Status});
   // return this.http.put<any>(environment.baseUrl+"/Edit", { UserName, status })
  } 
  
    
 
  

setName(name: string){
  this.Ename=name;  
}

  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(environment.baseUrl+"Authentication/Login", { username, password })
  //     .pipe(
  //       map((user) => {
  //         this.CurrentUser=JSON.stringify(user.user);
  //         this.CurrentUserToken=JSON.stringify(user.token);
  //         this.CurrentUser=this.CurrentUser.replace(/['"]+/g, '');
  //         this.CurrentUserToken=this.CurrentUserToken.replace(/['"]+/g, '');
  //         localStorage.setItem('CurrentUser', this.CurrentUser);
  //         localStorage.setItem('CurrentUserToken', this.CurrentUserToken);
       
  //        return user;
  //       })
  //     );
  // } 
  login(username: string, password: string) {

    return this.http

      .post<any>(environment.baseUrl+"Authentication/Login", { username, password })

      .pipe(

        map((user) => {

         

          console.log("user::::",user)
          this.CurrentUser=JSON.stringify(user.dateSet.userName);

          this.CurrentUserToken=JSON.stringify(user.dateSet.token);

          this.CurrentUserEmail=JSON.stringify(user.dateSet.email);

          this.CurrentUserRole=JSON.stringify(user.dateSet.role);

          this.CurrentUserStatus=JSON.stringify(user.dateSet.status);

       



         this.CurrentUser=this.CurrentUser.replace(/['"]+/g, '');

        this.CurrentUserToken=this.CurrentUserToken.replace(/['"]+/g, '');

         this.CurrentUserEmail=this.CurrentUserEmail.replace(/['"]+/g, '');

         this.CurrentUserRole=this.CurrentUserRole.replace(/['"]+/g, '');

       this.CurrentUserStatus=this.CurrentUserStatus.replace(/['"]+/g, '');

       

          localStorage.setItem('CurrentUser', this.CurrentUser);

          localStorage.setItem('CurrentUserToken', this.CurrentUserToken);

          localStorage.setItem('CurrentUserEmail',  this.CurrentUserEmail);

         localStorage.setItem('CurrentUserRole', this.CurrentUserRole);

        localStorage.setItem('CurrentUserStatus',  this.CurrentUserStatus);

 

         return user;

        })

      );

  }

  register(UserName: string, Email: string, Password: string, Continent: string, Country: string, Language: string, Address: string, PhoneNumber: string) {
    return this.http
      .post<any>(environment.baseUrl+"Authentication/Register", { UserName, Email, Password, Continent, Country, Language, Address, PhoneNumber })
      .pipe(
        map((response) => { 
        return response;
        })
      );
  }
 
  editprofile(Continent: string, Country: string, Language: string, Address: string, PhoneNumber: string) {
    var UserName=localStorage.getItem('CurrentUser');
    return this.http
      .put<any>(environment.baseUrl+"Authentication/Edit", { UserName, Continent, Country, Language, Address, PhoneNumber })
      .pipe(
        map((response) => { 
        return response;
        })
      );
  }
  feedback(username: any, ratings: string, comments: string) {
    var Email=localStorage.getItem('CurrentUserEmail');
    return this.http
      .post<any>(environment.baseUrl1+"/feedback", {
          "UserName":username,
          "Feedback":comments,
          "Date":new Date().toJSON()
      })
      .pipe(
        map((response) => {
         return response;
        })
      );
  }
  changepassword(currentpassword: string, newpassword: string, confirmnewpassword: string) {
    var username=localStorage.getItem('CurrentUser');
    return this.http
      .post<any>(environment.baseUrl+"Authentication/ResetPassword", { username, currentpassword, newpassword, confirmnewpassword })
      .pipe(
        map((response) => {
         return response;
        })
      );
  }
  
  ClearNotification(id:number){
   
       return  this.http.delete(environment.baseUrl+"Notification/"+localStorage.getItem('CurrentUser'), { headers:this.header })
    .pipe(
      map((response) => {
       return response;
      })
    );
 
  }

  MarkAllNotification(id:number){
   var UserName=localStorage.getItem('CurrentUser');
   var Status="Read";
    return  this.http.put(environment.baseUrl+"Notification/", { headers:this.header, UserName, Status })
 .pipe(
   map((response) => {
    return response;
   })
 );

}  

  logout() {
    localStorage.removeItem('CurrentUser'); 
    localStorage.removeItem('CurrentUserToken');
    localStorage.removeItem('AlertMessage');
    localStorage.removeItem('AlertMessageStatus');
    localStorage.removeItem('AlertMessageEmail');
    this.router.navigateByUrl('/login');
  }
  getNotification(): Observable<Notification[]> {
    var Count=0;
    return this.http.get<any>(environment.baseUrl+"Notification/"+localStorage.getItem('CurrentUser'),{headers:this.header})
    .pipe(
      map((response) => { 
        for (let x of response) {
          if(x.Status=="Read"){
            Count++;
          }
      }
      this.NotificationCount=response.length-Count;
      
        
       return response;
      })
    );
  } 

  getDetails(): Observable<UserDetails[]> {
    return this.http.get<any>(environment.baseUrl+"Authentication/UserData/"+localStorage.getItem('CurrentUser'),{headers:this.header})
    .pipe(
      map((response) => { 
        localStorage.setItem('CurrentUserEmail', response.email);

        
       return response;
      })
    );
  } 

  
onSendMessage(params:any):Observable<any>{
  let obj = {
    "msgFrom": params.msgFrom,
    "msgTo": params.msgTo,
    "msgText": params.msgText,
    "time": params.msgDate,
  }
  console.log("Message params", obj);

  return this.http.post(environment.baseUrl+'Message',obj);
}
getAllMessages(params:any):Observable<any>{
  // let email = "sreehari";
  let username = params.username;
  console.log("Getting",username," Messages");
  return this.http.get(environment.baseUrl+'Message/'+username);
}
editMessage(params:any){
  // let msgId = params.msgId;
  let obj = {
    "msgId": params.msgId,
    "msgFrom": params.msgFrom,
    "msgTo": params.msgTo,
    "msgText": params.msgText,
    "time": params.time,
  }
  console.log("Edit Msg params", obj);

  return this.http.put(environment.baseUrl+'Message/'+obj.msgId,obj);
}

deleteMessage(params:any){
  let msgId = params.msgId;
  console.log("Deleting msgId::",msgId);
  return this.http.delete(environment.baseUrl+'Message/'+msgId);
}

checkEmail(email:any){
  console.log("Email::::",email)
  let params=
  {
    "Email":email
  }
  // return this.http.post(environment.baseUrl+'Authentication/EmailCheck',params);
  return this.http.post(environment.baseUrl+'Authentication/EmailCheck',params);
  
}
}





