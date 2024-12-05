import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {Experience} from './experience/experience.component';
import {MeteoComponent} from './meteo/meteo.component';

const routes: Routes = [
    {path:'Experience',component:Experience},
    {path:'Meteo', component:MeteoComponent}

]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes)],
};
