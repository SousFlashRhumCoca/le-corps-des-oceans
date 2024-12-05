import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';



@Component({
  selector: 'app-meteo',
  standalone: true,
  imports: [
    NgClass,
    HttpClientModule
  ],
  template: `
    <div [ngClass]="bgColor">
      <p>Le nombre est : {{ temperatures[this.temperatures.length -1] }}</p> 
      <button (click)="changeNumber()">Changer le nombre</button>
    </div>
  `,
  styles: ``
})
export class MeteoComponent implements OnInit{
  public temperatures: number[] = [];
  public hours: string[] = [];
  constructor(private http: HttpClient) {
  }
  number: number = 0;

  get bgColor(): string {
    console.log(this.temperatures[1]);
    if (this.temperatures[this.temperatures.length -1] < 0) return 'bg-red-500'; // Rouge si négatif
    if (this.temperatures[this.temperatures.length -1] === 0) return 'bg-yellow-500'; // Jaune si zéro
    return 'bg-green-500'; // Vert si positif
  }
  changeNumber(): void {
    this.number = Math.floor(Math.random() * 21) - 10; // Génère un nombre entre -10 et 10
  }
  async getWeatherData() {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude: '48.8566', // Paris (exemple)
      longitude: '2.3522',
      hourly: 'temperature_2m',
    };

    this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=temperature_2m`).subscribe((data: any) => {
      this.processWeatherData(data);
      console.log(data);
    });

  }
  processWeatherData(data: any) {
    const hourlyData = data.hourly;
    this.temperatures = hourlyData.temperature_2m.slice(0, 24); // Températures pour 24 heures
    this.hours = hourlyData.time.slice(0, 24).map((time: string) => time.split('T')[1]); // Heures (HH:mm)
  }

  ngOnInit(): void {
    this.getWeatherData()
  }
}
