import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {MeteoComponent} from './meteo/meteo.component';
import {AnatomyComponent} from './anatomy/anatomy.component';

const routes: Routes = [
    {path:'Anatomy',component:AnatomyComponent},
    {path:'Meteo', component:MeteoComponent}

]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes)],
};
