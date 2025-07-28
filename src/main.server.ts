// src/main.server.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from '../src/app/core/environment/environment';

if (environment.production) {
  enableProdMode();
}

export default () => bootstrapApplication(AppComponent, appConfig);
