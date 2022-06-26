import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentimentComponent } from './sentiment.component';
import { RouterModule, Routes } from "@angular/router";
import { InsiderSentimentResolver } from "./insider-sentiment.resolver";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { SignPipe } from "./sign.pipe";


const routes: Routes = [
  {
    path: ':code',
    component: SentimentComponent,
    resolve: {
      sentiment: InsiderSentimentResolver
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SentimentComponent,SignPipe]
})
export class SentimentModule { }
