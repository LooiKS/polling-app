import {Component, OnInit} from '@angular/core';
import {PollModel} from "../../../shared/model/poll.model";

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  pollList: PollModel[] = [];
  dataLoading: boolean = false;

  optionRadioValue;

  constructor() {
  }

  ngOnInit(): void {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.pollList = [
      {
        vote: 2,
        question: "U finish FYP GOK?",
        expirationDateTime: date,
        createdAt: new Date(),
        choice: [
          {
            id: 1,
            text: "No, mah noob"
          },
          {
            id: 2,
            text: "Yes, mah geng"
          }
        ],
        user: {
          id: 1,
          email: 'ken@gmail.com',
          name: 'Chee Kean',
          username: 'ckkeeen'
        }
      }
    ];
  }

  getPolls(): void {

  }


}
