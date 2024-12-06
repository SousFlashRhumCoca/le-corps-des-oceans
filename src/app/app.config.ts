import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {MeteoComponent} from './meteo/meteo.component';
import {SqueletteComponent} from './squelette/squelette.component';
import { provideServiceWorker } from '@angular/service-worker';
import {OrganComponent} from "./organ/organ.component";

const routes: Routes = [
    {path:'anatomy',component:SqueletteComponent},
    {path:'weather', component:MeteoComponent},
    {path:'organ',component:OrganComponent},
    {path:'**',component:SqueletteComponent},
]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })],
};
