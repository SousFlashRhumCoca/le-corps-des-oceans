import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {MeteoComponent} from './meteo/meteo.component';
import {AnatomyComponent} from './anatomy/anatomy.component';
import {SqueletteComponent} from './squelette/squelette.component';
import { provideServiceWorker } from '@angular/service-worker';

const routes: Routes = [
    {path:'**',component:SqueletteComponent},
    {path:'anatomy',component:SqueletteComponent},
    {path:'weather', component:MeteoComponent}

]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })],
};
