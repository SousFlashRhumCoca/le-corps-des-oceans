import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {MeteoComponent} from './meteo/meteo.component';
import {AnatomyComponent} from './anatomy/anatomy.component';
import {SqueletteComponent} from './squelette/squelette.component';

const routes: Routes = [
    {path:'Anatomy',component:SqueletteComponent},
    {path:'Meteo', component:MeteoComponent}

]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes)],
};
