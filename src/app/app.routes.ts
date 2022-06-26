import { Routes } from '@angular/router';
import { StockLayoutComponent } from './components/stock-layout/stock-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: StockLayoutComponent,
  },
  {
    path: 'sentiment',
    loadChildren: () => import('@sentiment').then((mt) => mt.SentimentModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
