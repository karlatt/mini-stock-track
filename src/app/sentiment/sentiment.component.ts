import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sentiment } from '../data/models';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  sentiment!: Sentiment;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (d) => (this.sentiment = d['sentiment'])
    );
  }
}
