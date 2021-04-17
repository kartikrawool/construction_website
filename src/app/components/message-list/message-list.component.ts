import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  Message: any = [];
  constructor(private apiService: ApiService) {
    this.readMessage();
  }

  ngOnInit(): void {
  }

  readMessage() {
    this.apiService.getMessages().subscribe((data) => {
      this.Message = data;
    })
  }

  removeMessage(message: { _id: any; }, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteMessage(message._id).subscribe((data) => {
        this.Message.splice(index, 1);
      }
      )
    }
  }
}
