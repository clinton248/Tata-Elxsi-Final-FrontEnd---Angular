import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/StructureClass';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  public userdetails: UserDetails[] | any;//=[{"userName":"Rahul R","email":"rahulgowda@gmail.com","phoneNumber":"7406850205","continent":"Asia","country":"India","address":"Bangalore","language":"Kannada"}]
  public users: UserDetails[] | any ;
  
 // public userdetails :any =[{"Username":"Rahul R","Email":"rahulgowda@gmail.com","Phone":"7406850205","Continent":"Asia","Country":"India","Address":"Bangalore","Language":"Kannada"}]
  public checked=false;
  // public disabled=false;
  public isChecked=true;
  public color="#e366d6"
  //public value : any;
  // public checked=false;

  constructor(private service:ConnectionService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(data =>{
          this.userdetails=data;
        })

  }
/*  ChangeStatus()
  {
    console.log("Checked::", this.isChecked);
   // console.log("Checked::", this.users.status);
  } */
  onValChange(status : any, UserName : any)
  {
    if(status=="true"){status=false}
    else{status=true}   
   this.service.editstatus(status , UserName ).subscribe(data => {});     }


}
