import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { API_BASE_URL } from '@finnHubApi';
import { environment } from '../environments/environment';
import { ENVIRONMENT } from '@core/interfaces/environment';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from '@core/interceptors/add-token.interceptor';
import {
  LocalStorageProviderService,
  LocalStorageProviderDefaultService,
} from '@core/services/storage';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { routes } from './app.routes';
import { StockLayoutComponent } from './components/stock-layout/stock-layout.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PreSufPipe } from './components/stock-detail/pre-suf-fix.pipe';
import { DecimalPipe, PercentPipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    StockDetailComponent,
    StockLayoutComponent,
    PreSufPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    CardModule,
    InputTextModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: LocalStorageProviderService,
      useClass: LocalStorageProviderDefaultService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
    MessageService,
    DecimalPipe,
    PercentPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
