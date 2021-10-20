import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { Feedback } from './feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  url="http://localhost:40225/feedback"
  constructor(private http: HttpClient) { }


  
  getAllFeedback(): Observable<any> {  
    return this.http.get<any>(this.url ); 
}
deleteFeedbackById(feedbackid: number): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + "/" +feedbackid,  
httpOptions);  
}  
ReplyToFeedback(id:number,reply:any){
  console.log("Feedback to be edited:::", reply);

   return  this.http.put(this.url+"/"+id,reply)
.pipe(
  map((response) => {
   return response;
  })
);

} 

editFeedback(feedback:any){
  console.log("Feedback to be edited:::", feedback);
  return this.http.put(this.url+`/${feedback.id}`, feedback);
}

}
