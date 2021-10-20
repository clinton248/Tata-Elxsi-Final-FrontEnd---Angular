import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/StructureClass';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userdetails: UserDetails[] | any;
  
  constructor(public connectionService:ConnectionService) {

   }

   ngOnInit(): void {
    this.connectionService.getDetails().subscribe(data=>{this.userdetails=[data]; console.log(data) });
   
    
   
    
  }

}
