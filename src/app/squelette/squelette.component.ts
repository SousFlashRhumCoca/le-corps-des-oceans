import {Component, effect} from '@angular/core';
import {AnatomyComponent} from '../anatomy/anatomy.component';
import {NgtCanvas} from 'angular-three';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgClass} from '@angular/common';
import {SignalService} from "../../service/signal.service";

@Component({
    selector: 'app-squelette',
    standalone: true,
    imports: [NgtCanvas, NgClass, HttpClientModule],
    template: `
        <div class="relative w-full h-screen">
            <h1 [style.display]="displayTitle ? 'block' : 'none'"
                class="absolute z-10 top-0 left-0 mb-4 ml-4 select-none font-extrabold bg-gradient-to-r from-blue-600 to-indigo-900 text-transparent bg-clip-text">
                <span class="text-6xl block">Bienvenue sur</span>
                <span class="text-9xl block">Le <br> Corps<br>Des<br> Océans</span>
            </h1>
            <ngt-canvas [ngClass]="bgColor" [sceneGraph]="sceneGraph"/>
        </div>
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

        .ngt-canvas-dark-blue {
            background: #60a5fa;
        }
    `
})
export class SqueletteComponent {
    displayTitle: boolean = false;
    sceneGraph = AnatomyComponent;
    temperatures = [] = []
    arbitrateTemperature = 20;

    constructor(private http: HttpClient, private signalService: SignalService) {
        effect(() => {
            this.displayTitle = this.signalService.getData()();
        });
    }

    public hours: string[] = [];

    get bgColor(): string {
        if (this.temperatures[this.temperatures.length - 1] <= 0) return 'ngt-canvas-dark-blue'; // Rouge si négatif
        if (this.temperatures[this.temperatures.length - 1] > 0 && this.temperatures[this.temperatures.length - 1] < 18) return 'ngt-canvas-blue'; // Jaune si zéro
        if (this.temperatures[this.temperatures.length - 1] > 18 && this.temperatures[this.temperatures.length - 1] < 25) return 'ngt-canvas-yellow'; // Jaune si zéro
        if (this.temperatures[this.temperatures.length - 1] > 25) return 'ngt-canvas-orange'; // Jaune si zéro
        return 'ngt-canvas-blue'; // Vert si positif
    }

    async getWeatherData() {
        const apiUrl = 'https://api.open-meteo.com/v1/forecast';
        const params = {
            latitude: '43.296398', // Paris (exemple)
            longitude: '5.370000',
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
