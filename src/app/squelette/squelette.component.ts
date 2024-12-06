import {Component, OnInit} from '@angular/core';
import {AnatomyComponent} from '../anatomy/anatomy.component';
import {NgtCanvas} from 'angular-three';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgClass, NgIf} from '@angular/common';
import {NeigeComponent} from '../meteo/neige/neige.component';
import {PluieComponent} from '../meteo/pluie/pluie.component';
import {SoleilComponent} from '../meteo/soleil/soleil.component';
import {NuageComponent} from '../meteo/nuage/nuage.component';

@Component({
  selector: 'app-squelette',
  standalone: true,
  imports: [NgtCanvas, NgClass, HttpClientModule, NeigeComponent, NgIf, PluieComponent, SoleilComponent, NuageComponent],
  template: `
    
    <app-neige *ngIf="this.weatherCondition==='Neige'" [ngClass]="bgColor"></app-neige>
    <app-pluie *ngIf="weatherCondition==='Pluie'" [ngClass]="bgColor"></app-pluie>
    <app-soleil *ngIf="weatherCondition==='Ensoleillé'" [ngClass]="bgColor" ></app-soleil>
    <app-nuage></app-nuage>
    <ngt-canvas [ngClass]="bgColor" [sceneGraph]="sceneGraph" />
    <div class="absolute text-gray-500 p-5 left-3 bottom-3 rounded bg-white bg-opacity-50 pointer-events-none">
      <ul class="list-disc list-inside dark:text-gray-400">
        <li>https://sketchfab.com/3d-models/splanchnology-5cfafb312f504815aa3fec55735607a6</li>
        <li>https://sketchfab.com/3d-models/water-waves-142c2596d1944cd0bf4fc1f490c4c248</li>
      </ul>
    </div>
  `,
  styles: `
    .ngt-canvas-orange {
      background: #fdba74;
    }
    .ngt-canvas-yellow {
      background: #fef08a;
    }
    .ngt-canvas-blue {
        background: #67e8f9;
    }
    .ngt-canvas-dark-blue{
        background: #60a5fa;
    }
  `
})
export class SqueletteComponent implements OnInit{
  sceneGraph = AnatomyComponent;
  temperatures = [] = []
  public weatherCondition: string | null = null;


  constructor(private http: HttpClient) {
  }
  public hours: string[] = [];

  get bgColor(): string {
    if (this.temperatures[this.temperatures.length -1] <= 0) return 'ngt-canvas-dark-blue'; // Rouge si négatif
    if (this.temperatures[this.temperatures.length -1] > 0 && this.temperatures[this.temperatures.length -1]< 18) return 'ngt-canvas-blue'; // Jaune si zéro
    if (this.temperatures[this.temperatures.length -1] > 18 && this.temperatures[this.temperatures.length -1]< 25) return 'ngt-canvas-yellow'; // Jaune si zéro
    if (this.temperatures[this.temperatures.length -1] > 25) return 'ngt-canvas-orange'; // Jaune si zéro
    return 'ngt-canvas-blue'; // Vert si positif
  }
  async getWeatherData() {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude: '43.296398', // Paris (exemple)
      longitude: '5.370000',
      hourly: 'temperature_2m,snowfall,cloudcover,weathercode',
    };

    this.http.get(apiUrl,{params}).subscribe((data: any) => {
      this.processWeatherData(data);
      console.log(data);
    });

  }
  processWeatherData(data: any) {
    const hourlyData = data.hourly;
    this.temperatures = hourlyData.temperature_2m.slice(0, 24); // Températures pour 24 heures
    this.hours = hourlyData.time.slice(0, 24).map((time: string) => time.split('T')[1]); // Heures (HH:mm)

    const snowfall = hourlyData.snowfall[0];
    const cloudcover = hourlyData.cloudcover[0];

    if (snowfall > 0) {
      this.weatherCondition = 'Neige';
    }else if (snowfall> 0 && this.temperatures[this.temperatures.length -1] > 0) {
      this.weatherCondition = 'Pluie';
    }
    else if (cloudcover < 20) {
      this.weatherCondition = 'Ensoleillé';
    } else if (cloudcover < 80) {
      this.weatherCondition = 'Nuageux'
    } else {
      this.weatherCondition = 'Nuageux';
    }
  }

  ngOnInit(): void {
    this.getWeatherData()
  }
}
