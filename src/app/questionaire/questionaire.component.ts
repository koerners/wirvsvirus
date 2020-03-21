import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent  {
// Hier die richtige Umfrage rein
  json = {
    title: "Dein Verhalten",
    showProgressBar: "top",
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "checkbox",
            "name": "question4",
            "choices": [
              "item1",
              "item2",
              "item3"
            ]
          },
          {
            "type": "boolean",
            "name": "question3",
            "labelTrue": "Yes",
            "labelFalse": "No"
          },
          {
            "type": "radiogroup",
            "name": "question5",
            "choices": [
              "item1",
              "item2",
              "item3"
            ]
          }
        ]
      },
      {
        "name": "page2",
        "elements": [
          {
            "type": "checkbox",
            "name": "question1",
            "choices": [
              "item1",
              "item2",
              "item3"
            ]
          },
          {
            "type": "boolean",
            "name": "question2",
            "labelTrue": "Yes",
            "labelFalse": "No"
          }
        ]
      }
    ],
  };

  onSurveySaved(survey) {
    this.json = survey;
  }

  sendData(result) {
    //TODO update with your own behavior
    console.log(result);
  }

}
