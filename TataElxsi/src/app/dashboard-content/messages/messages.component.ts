import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import {AfterViewChecked, ElementRef, ViewChild,} from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private service:ConnectionService) { }

  public currentDate = Number(new Date())/1;
  public messagesLoading=false;
  public selectedInd: any;
  public refreshChat=false;
  public writeMsg:any=false;
  public editMsg:any=false;
  public CurrentUser:any;
  public sendMsg:any={
    to:"",
    msg:"",
    errors:"",
    errorMsg:""
  };
  public panelOpenState:boolean=true;
  // columnsToDisplay = ['Message', 'From', 'Date', 'Status'];
  expandedElement:any;
  // public allMessages:any=[];

  public allMessages:any = [
    // clear us when working with API
    // {msgId:1,msgFrom:"Sattar", msgTo:"sreehari", msgText:"Hi how are you ? It's Sattar", msgDate:"09-15-2021 12:30 PM", type:"rec", status:"unread" },
    // {msgId:2,msgFrom:"Pavan",msgTo:"sreehari", msgText:"Hi bro Iam Pavan !", msgDate:"09-15-2021 2:30 PM", type:"rec", status:"read" },
    // {msgId:3,msgFrom:"Clinton", msgTo:"sreehari",msgText:"Clinton Here ?", msgDate:"09-15-2021 1:30 PM", type:"rec", status:"unread" },
    // {msgId:4,msgFrom:"Param",msgTo:"sreehari", msgText:"Paramsivam is waiting for bus ?", msgDate:"09-15-2021 1:30 PM", type:"rec", status:"unread" },
    // {msgId:5,msgFrom:"Surendra",msgTo:"sreehari", msgText:"Surendra went to market ?", msgDate:"09-15-2021 1:30 PM", type:"rec", status:"read" },
    // {msgId:6,msgFrom:"Soumyajit",msgTo:"sreehari", msgText:"Soumyajit is Online ?", msgDate:"09-15-2021 1:30 PM", type:"rec", status:"read" },


    // {msgId:7,msgTo:"Sattar", msgFrom:"sreehari", msgText:"Hi Sattar, how are you ?", msgDate:"09-15-2021 12:40 PM", type:"sent", status:"sent" },
    // {msgId:8,msgTo:"Pavan",msgFrom:"sreehari", msgText:"Hi Pavan !", msgDate:"09-15-2021 2:34 PM", type:"sent", status:"sent" },
    // {msgId:9,msgTo:"Clinton", msgFrom:"sreehari",msgText:"Hi Clinton ?", msgDate:"09-15-2021 1:31 PM", type:"sent", status:"sent" },
    // {msgId:10,msgTo:"Param",msgFrom:"sreehari", msgText:"Paramsivam Hi", msgDate:"09-15-2021 1:32 PM", type:"sent", status:"sent" },
    // {msgId:11,msgTo:"Surendra",msgFrom:"sreehari", msgText:"Surendra Hello", msgDate:"09-15-2021 1:37 PM", type:"sent", status:"sent" },
    // {msgId:12,msgTo:"Soumyajit",msgFrom:"sreehari", msgText:"Soumyajit Hii", msgDate:"09-15-2021 1:34 PM", type:"sent", status:"sent" },

]

  public messages:any = []

  public sentMessage:any=[];

  public RecMessages:any=[];

  public selectedChat:any=[];
  public editTimeLimit:any;
  
  ngOnInit(): void {
    this.CurrentUser = localStorage.getItem('CurrentUser');
    this.getAllMessages();

    // setInterval(()=> { this.getAllMessages() }, 5 * 1000);
    // this.prepareChats();  //remove me when working with API

    // this.allMessages = this.messages.map((item:any, i:any) => Object.assign({}, item, this.sentMessage[i]));
    // console.log("Names:::::",this.allMessages);


    // for(let m of this.messages){
    //   if(JSON.stringify(this.allMessages).includes(m.name)){
    //     this.messages.pop(m);
    //   }
    // }

    // console.log("Alllll::",this.messages);


  }
  onToggle(m:any){
    console.log("Message:::",m);
    m.toggle=!m.toggle;
    m.status='read';
  }

  onChatSelect(chat:any,i:any){
    console.log("Chat Selected:::",chat, this.currentDate);
    this.selectedChat=[];
    this.writeMsg = false;
    this.selectedInd=i;
    this.sendMsg.to = chat.name;
    chat.msgDate = Number(new Date(chat.msgDate))/1;
    // this.selectedChat.push(chat);
    for(let m of this.allMessages){
      if(m.msgTo == chat.name){
        m.msgDate = Number(new Date(m.msgDate))/1;
        this.selectedChat.push(m);
      }
    }
    for(let m of this.allMessages){
      if(m.msgFrom == chat.name){
        m.msgDate = Number(new Date(m.msgDate))/1;
        this.selectedChat.push(m);
      }
    }

    this.selectedChat.sort((a:any, b:any) => Number(a.msgDate) - Number(b.msgDate));
    console.log("Selected Chat:::", this.selectedChat);
  }

  onSendMessage(){
    if(!this.sendMsg.msg || this.sendMsg.msg==' ' || !this.sendMsg.to){
      this.sendMsg.errors=true;
      console.log("Missing Message Body or To Address");
    }
    else{
      var newMsg:any = {
        msgFrom:this.CurrentUser,
        msgTo:this.sendMsg.to,
        msgText:this.sendMsg.msg,
        msgDate:new Date().toLocaleString(),
        msgStatus:'sent',
        // type:'sent',
      };
      // this.editTimeLimit = this.editTimeLimit ? this.editTimeLimit: Number(newMsg.msgDate)/1 + 1*60*60*1000;
      // console.log("Edit Within:::",this.editTimeLimit);

      //Service
      console.log("New Msg OBJ Before:::",newMsg);

      this.service.onSendMessage(newMsg).subscribe(data =>{
        if(data){
          data.msgDate = data.time;
          data.editTimeLimit = Number(new Date(newMsg.msgDate))/1 + 1*60*60*1000;
          this.selectedChat.push(data);
          console.log("Message sent successfully!",data);
          this.messages.push(data);
          this.allMessages.push(data);
          this.selectedChat.sort((a:any, b:any) => Number(a.msgDate) - Number(b.msgDate));
          this.prepareChats();
          this.selectedInd = this.messages.indexOf(this.messages.find((o:any) => o.name === data.name));
          console.log("this.selectedInd:::",this.selectedInd, this.messages);
          this.scrollBottom();
        }
      },
      error=>{
        console.log("Failed to send Message", error);
      });
      // this.sentMessage.push(newMsg);

      this.sendMsg.errors=false;
      console.log("Sent:::::::::::",this.selectedChat);
      console.log("Sending message to..",this.sendMsg);
      this.sendMsg.msg="";
      this.writeMsg = false;
      // window.scrollTo(0,document.getElementById("scroll")!.scrollHeight);
    }
  }

  getAllMessages(){
    this.messagesLoading=true;
    this.allMessages=[];
    this.messages=[];
    let params = {
      username:this.CurrentUser
    }
    this.service.getAllMessages(params).subscribe(data =>{
      if(data && data.length > 0){
        for(let item of data){
          item.msgDate = item.time;
          this.allMessages.push(item);
        }
      }
      console.log("allMessages",data, this.allMessages);
      // for(let m of this.allMessages){
      //   if(m.msgFrom != "sreehari"){
      //     m.name = m.msgFrom;
      //     this.messages.push(m);
      //   }
      //   else if(m.msgFrom == "sreehari" && m.msgTo){
      //     m.name = m.msgTo;
      //     this.messages.push(m);
      //   }
      // }

      //Dividing Messages based on sent and received by User
      this.prepareChats();
      this.messagesLoading=false;
      this.refreshChat=false;

    },
    error=>{
      console.log("Failed to Fetch Messages", error);
      this.messagesLoading=false;
    });
    

  }

  prepareChats(){
    // console.log("Length::::::::", this.selectedChat.length)
    // if(this.selectedChat.length>0){
    //   var obj = this.selectedChat[0]
    // }

    for(let m of this.allMessages){
      if(m.msgFrom === this.CurrentUser){
        m.name = m.msgTo;
        m.editTimeLimit = Number(new Date(m.msgDate))/1 + 1*60*60*1000
        this.messages.push(m);
      }
      else if(m.msgTo === this.CurrentUser){
        // if(this.selectedChat.length>0 && obj.msgFrom == m.msgFrom){
        //   this.selectedChat.push(m);
        // }
        m.name = m.msgFrom;
        this.messages.push(m);
      }
    }
    console.log("Before::",this.messages);

    this.messages = [...new Map(this.messages.map((item:any) =>
      [item['name'], item])).values()];

      
    console.log("After::",this.messages);
    if((this.selectedChat.length<=0 || !this.selectedChat) && this.messages.length>0){
      this.selectedInd ? this.selectedInd=this.selectedInd : this.selectedInd=0;
      console.log("First Chat::",this.messages,this.selectedInd);
      let fChat = this.messages[this.selectedInd];
      // this.selectedInd=0;
      this.sendMsg.to = fChat.name;
      for(let m of this.allMessages){
        if(m.msgTo == fChat.name){
          m.msgDate = Number(new Date(m.msgDate))/1;
          this.selectedChat.push(m);
        }
      }
      for(let m of this.allMessages){
        if(m.msgFrom == fChat.name){
          m.msgDate = Number(new Date(m.msgDate))/1;
          this.selectedChat.push(m);
        }
      }
      this.selectedChat.sort((a:any, b:any) => Number(a.msgDate) - Number(b.msgDate));
    }
    

  }

  onMessageEdit(s:any){
    console.log("Edit::::::",s);
    this.service.editMessage(s).subscribe((response:any)=>{
      console.log("Edited Message..!",response);
      if(response && response.status=='success'){
        // this.getAllMessages();
      }
    },
    error=>{
      console.log("Failed to Edit Message", error);
    });
    this.prepareChats();

    // this.getAllMessages();
  }

  onMessageDelete(s:any){
    console.log("Delete::::::",s);
    let ind = this.selectedChat.indexOf(this.selectedChat.find((o:any) => o.msgId === s.msgId));
    this.selectedChat.splice(ind,1);

    let ind2 = this.allMessages.indexOf(this.allMessages.find((o:any) => o.msgId === s.msgId));
    this.allMessages.splice(ind2,1);

    let ind3 = this.messages.indexOf(this.messages.find((o:any) => o.msgId === s.msgId));
    this.messages.splice(ind3,1);
     
    this.service.deleteMessage(s).subscribe((response:any)=>{
      if(response && response.status=='success'){
        console.log("Deteled Message..!")
      }
    },
    error=>{
      console.log("Failed to Delete Message", error);
    });
    this.prepareChats();
  }

  onEditRequest(key:any, s:any){
    console.log("EditRequest::::::",key,s);
    if(key == 'dots'){
      s.edit=true;
      s.delete=true;
    }
    else if(key == 'editbox'){
      s.msgEdit=true;
    }
    
  }

  checkEmailExists(email:any){
    // console.log("Email Check:::",email.value);
    this.service.checkEmail(email.value).subscribe((data:any)=>{
      console.log("CheckEmail:::",data);
      if(data && data.status == 'Success'){
        this.sendMsg.errorMsg="";
      }
      else{
        this.sendMsg.errorMsg="Please type valid Username.";
      }
    },err=>{
      console.log("CheckEmail:::",err);
      this.sendMsg.errorMsg="Please type valid Username.";
    });
  }

  scrollBottom(){
    const El = document.getElementById('scroll')!;
    El.scrollTo({top:El.scrollHeight, behavior: 'smooth'});
  }
}
