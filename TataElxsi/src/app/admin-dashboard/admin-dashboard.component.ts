import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent{

  public userlist=false;
  public feedback=false;
  public htmlPage=true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    

  constructor(private breakpointObserver: BreakpointObserver, public connectionService:ConnectionService ) {}
  onUser(){
  this.userlist=true;
  this.feedback=false;
  }
  onHtml()
  {
    this.htmlPage=false;
  }
  logout(){
    this.connectionService.logout();
    
  }

}
