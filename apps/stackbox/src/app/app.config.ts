import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideStackboxApi,
  StackboxConfiguration,
} from '@stackbox/api-stackbox';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStackboxApi(
      new StackboxConfiguration({ basePath: 'http://localhost:3001/' })
    ),
  ],
};
