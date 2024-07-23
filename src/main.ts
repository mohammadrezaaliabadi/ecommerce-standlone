import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers:[
    importProvidersFrom(PaginationModule.forRoot()),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
