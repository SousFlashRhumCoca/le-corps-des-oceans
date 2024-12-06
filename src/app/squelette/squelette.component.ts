import {Component, OnInit, effect} from '@angular/core';
import {AnatomyComponent} from '../anatomy/anatomy.component';
import {NgtCanvas} from 'angular-three';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgClass, NgIf} from '@angular/common';
import {NeigeComponent} from '../meteo/neige/neige.component';
import {PluieComponent} from '../meteo/pluie/pluie.component';
import {SoleilComponent} from '../meteo/soleil/soleil.component';
import {NuageComponent} from '../meteo/nuage/nuage.component';
import {SignalService} from "../../service/signal.service";

@Component({
  selector: 'app-squelette',
  standalone: true,
  imports: [NgtCanvas, NgClass, HttpClientModule, NeigeComponent, NgIf, PluieComponent, SoleilComponent, NuageComponent],
  template: `
      <div class="absolute z-10 right-0 flex gap-3">
          <button type='button' (click)="handleClickWeather('sun')">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </button>
          <button type='button' (click)="handleClickWeather('foggy')">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 2.00024C9 1.44796 9.44771 1.00024 10 1.00024C10.5523 1.00024 11 1.44796 11 2.00024V3.00024C11 3.55253 10.5523 4.00024 10 4.00024C9.44771 4.00024 9 3.55253 9 3.00024V2.00024Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0006 7.0005C13.0884 5.78591 11.6359 5.00024 10 5.00024C7.23858 5.00024 5 7.23882 5 10.0002C5 10.3515 5.03623 10.6944 5.10515 11.0252C4.75224 11.1654 4.42503 11.3382 4.12434 11.5416C2.81684 12.426 2.1491 13.7958 2.0226 15.1823C1.77602 17.8852 3.61934 21.0002 7.17706 21.0002L18.5526 21.0002C19.9549 21.0002 21.0916 20.5599 21.8787 19.7891C22.6603 19.0236 23.0183 18.0072 22.9993 17.0093C22.9662 15.2772 21.8019 13.5863 19.7773 13.0961C20.0627 10.5291 18.2721 8.25658 16.092 7.39549C15.437 7.13676 14.7268 6.99329 14.0006 7.0005ZM11.7254 7.55237C11.2376 7.20799 10.6424 7.00568 10 7.00568C8.34615 7.00568 7.00543 8.34639 7.00543 10.0002C7.00543 10.2084 7.02667 10.4116 7.0671 10.6078C7.60146 10.5762 8.1724 10.5992 8.77842 10.6808C9.5493 9.16687 10.5659 8.13298 11.7254 7.55237ZM10.3175 12.1097C11.0062 10.4965 11.9034 9.65869 12.7511 9.27892C13.6015 8.89799 14.5189 8.92449 15.3573 9.25564C17.1117 9.94862 18.2154 11.7921 17.6508 13.5043C17.4178 14.211 17.9363 14.9336 18.6672 14.9565C20.2392 15.0058 20.981 16.071 20.9996 17.0475C21.0091 17.5438 20.8334 18.0134 20.4793 18.3602C20.1306 18.7018 19.5296 19.0002 18.5526 19.0002L7.17706 19.0002C5.0662 19.0002 3.8484 17.1828 4.01433 15.364C4.09409 14.4897 4.50102 13.7014 5.24487 13.1982C5.99008 12.6942 7.21156 12.3849 9.0849 12.7592C9.59289 12.8607 10.1116 12.5921 10.3175 12.1097Z" fill="#ffffff"></path> <path d="M1 10.0002C1 10.5525 1.44772 11.0002 2 11.0002H3C3.55228 11.0002 4 10.5525 4 10.0002C4 9.44796 3.55228 9.00024 3 9.00024H2C1.44772 9.00024 1 9.44796 1 10.0002Z" fill="#ffffff"></path> <path d="M3.63603 5.05061C3.24551 4.66009 3.24551 4.02692 3.63603 3.6364C4.02656 3.24587 4.65972 3.24587 5.05024 3.6364L5.75735 4.34351C6.14788 4.73403 6.14788 5.3672 5.75735 5.75772C5.36683 6.14824 4.73366 6.14824 4.34314 5.75772L3.63603 5.05061Z" fill="#ffffff"></path> <path d="M14.2426 4.34328C13.8521 4.7338 13.8521 5.36697 14.2426 5.75749C14.6332 6.14802 15.2663 6.14802 15.6569 5.75749L16.364 5.05039C16.7545 4.65986 16.7545 4.0267 16.364 3.63617C15.9734 3.24565 15.3403 3.24565 14.9498 3.63617L14.2426 4.34328Z" fill="#ffffff"></path> </g></svg>
          </button>
          <button type='button' (click)="handleClickWeather('rain')">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.99993 1C5.65276 1 5.36339 1.17976 5.16152 1.45177C5.09068 1.5478 4.92673 1.77255 4.709 2.08705C4.41942 2.50534 4.03176 3.08669 3.64247 3.73551C3.25505 4.38123 2.85535 5.11139 2.54959 5.82484C2.25681 6.50802 1.99893 7.24994 2 8.00206C2.00062 8.21313 2.02582 8.42526 2.06046 8.63311C2.11824 8.97986 2.23566 9.45747 2.48051 9.94719C2.72731 10.4408 3.11323 10.9649 3.71085 11.3633C4.31472 11.7659 5.07494 12 5.99994 12C6.92494 12 7.68516 11.7659 8.28904 11.3633C8.88666 10.9649 9.2726 10.4409 9.51942 9.94722C9.76428 9.45751 9.88173 8.9799 9.93952 8.63315C9.9742 8.42505 9.99972 8.21239 10 8.00101C10.0004 7.24888 9.74323 6.50811 9.45038 5.82482C9.14461 5.11137 8.7449 4.38121 8.35746 3.7355C7.96816 3.08668 7.58048 2.50533 7.29089 2.08703C7.07315 1.77254 6.9092 1.54779 6.83835 1.45175C6.63647 1.17975 6.3471 0.999997 5.99993 1ZM7.6121 6.61268C7.35536 6.01363 7.00506 5.36879 6.64248 4.7645C6.42198 4.39701 6.20087 4.05101 5.99996 3.74751C5.79905 4.05101 5.57796 4.397 5.35747 4.76449C4.99491 5.36877 4.64462 6.01361 4.38789 6.61266L4.37335 6.64657C4.19665 7.0585 3.98776 7.54548 4.00018 8.00042C4.01216 8.36034 4.1089 8.73181 4.26939 9.05281C4.39756 9.30917 4.57412 9.53511 4.82025 9.6992C5.06012 9.85912 5.4249 10 5.99994 10C6.57498 10 6.93977 9.85912 7.17966 9.69919C7.42581 9.5351 7.60238 9.30915 7.73057 9.05278C7.89107 8.73179 7.98784 8.3603 7.99982 8.00038C8.01225 7.54551 7.80337 7.05857 7.62668 6.64668L7.6121 6.61268Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9999 1C17.6528 1 17.3634 1.17976 17.1615 1.45177C17.0907 1.5478 16.9267 1.77255 16.709 2.08705C16.4194 2.50534 16.0318 3.08669 15.6425 3.73551C15.2551 4.38123 14.8554 5.11139 14.5496 5.82484C14.2568 6.50802 13.9989 7.24994 14 8.00206C14.0006 8.21313 14.0258 8.42526 14.0605 8.63311C14.1182 8.97986 14.2357 9.45747 14.4805 9.94719C14.7273 10.4408 15.1132 10.9649 15.7108 11.3633C16.3147 11.7659 17.0749 12 17.9999 12C18.9249 12 19.6852 11.7659 20.289 11.3633C20.8867 10.9649 21.2726 10.4409 21.5194 9.94722C21.7643 9.45751 21.8817 8.9799 21.9395 8.63315C21.9742 8.42505 21.9997 8.21239 22 8.00101C22.0004 7.24888 21.7432 6.50811 21.4504 5.82482C21.1446 5.11137 20.7449 4.38121 20.3575 3.7355C19.9682 3.08668 19.5805 2.50533 19.2909 2.08703C19.0732 1.77254 18.9092 1.54779 18.8384 1.45175C18.6365 1.17975 18.3471 0.999997 17.9999 1ZM19.6121 6.61268C19.3554 6.01363 19.0051 5.36879 18.6425 4.7645C18.422 4.39701 18.2009 4.05101 18 3.74751C17.7991 4.05101 17.578 4.397 17.3575 4.76449C16.9949 5.36877 16.6446 6.01361 16.3879 6.61266L16.3734 6.64656C16.1967 7.0585 15.9878 7.54548 16.0002 8.00042C16.0122 8.36034 16.1089 8.73181 16.2694 9.05281C16.3976 9.30917 16.5741 9.53511 16.8203 9.6992C17.0601 9.85912 17.4249 10 17.9999 10C18.575 10 18.9398 9.85912 19.1797 9.69919C19.4258 9.5351 19.6024 9.30915 19.7306 9.05278C19.8911 8.73179 19.9878 8.3603 19.9998 8.00038C20.0123 7.54552 19.8034 7.05858 19.6267 6.6467L19.6121 6.61268Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1615 12.4518C11.3634 12.1798 11.6528 12 11.9999 12C12.3471 12 12.6365 12.1797 12.8384 12.4518C12.9092 12.5478 13.0732 12.7725 13.2909 13.087C13.5805 13.5053 13.9682 14.0867 14.3575 14.7355C14.7449 15.3812 15.1446 16.1114 15.4504 16.8248C15.7432 17.5081 16.0004 18.2489 16 19.001C15.9997 19.2124 15.9742 19.4251 15.9395 19.6332C15.8817 19.9799 15.7643 20.4575 15.5194 20.9472C15.2726 21.4409 14.8867 21.9649 14.289 22.3633C13.6852 22.7659 12.9249 23 11.9999 23C11.0749 23 10.3147 22.7659 9.71085 22.3633C9.11323 21.9649 8.72731 21.4408 8.48051 20.9472C8.23566 20.4575 8.11824 19.9799 8.06046 19.6331C8.02582 19.4253 8.00062 19.2131 8 19.0021C7.99893 18.2499 8.25681 17.508 8.54959 16.8248C8.85535 16.1114 9.25505 15.3812 9.64247 14.7355C10.0318 14.0867 10.4194 13.5053 10.709 13.087C10.9267 12.7726 11.0907 12.5478 11.1615 12.4518ZM12.6425 15.7645C13.0051 16.3688 13.3554 17.0136 13.6121 17.6127C13.6169 17.624 13.6218 17.6353 13.6267 17.6467C13.8034 18.0586 14.0123 18.5455 13.9998 19.0004C13.9878 19.3603 13.8911 19.7318 13.7306 20.0528C13.6024 20.3091 13.4258 20.5351 13.1797 20.6992C12.9398 20.8591 12.575 21 11.9999 21C11.4249 21 11.0601 20.8591 10.8203 20.6992C10.5741 20.5351 10.3976 20.3092 10.2694 20.0528C10.1089 19.7318 10.0122 19.3603 10.0002 19.0004C9.98776 18.5455 10.1967 18.0585 10.3734 17.6466C10.3782 17.6352 10.3831 17.6239 10.3879 17.6127C10.6446 17.0136 10.9949 16.3688 11.3575 15.7645C11.578 15.397 11.7991 15.051 12 14.7475C12.2009 15.051 12.422 15.397 12.6425 15.7645Z" fill="#ffffff"></path> </g></svg>
          </button>
          <button type='button' (click)="handleClickWeather('snow')">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V2.58579L10.7071 2.29289C10.3166 1.90237 9.68342 1.90237 9.29289 2.29289C8.90237 2.68342 8.90237 3.31658 9.29289 3.70711L11 5.41421V9.58579L8.05023 6.63602V4.22192C8.05023 3.66964 7.60252 3.22192 7.05023 3.22192C6.49795 3.22192 6.05023 3.66964 6.05023 4.22192V4.63602L5.63606 4.22185C5.24554 3.83132 4.61237 3.83132 4.22185 4.22185C3.83132 4.61237 3.83132 5.24554 4.22185 5.63606L4.63608 6.05029H4.2218C3.66952 6.05029 3.2218 6.49801 3.2218 7.05029C3.2218 7.60258 3.66952 8.05029 4.2218 8.05029H6.63608L9.58579 11H5.41421L3.70711 9.29289C3.31658 8.90237 2.68342 8.90237 2.29289 9.29289C1.90237 9.68342 1.90237 10.3166 2.29289 10.7071L2.58579 11H2C1.44772 11 1 11.4477 1 12C1 12.5523 1.44772 13 2 13H2.58579L2.29289 13.2929C1.90237 13.6834 1.90237 14.3166 2.29289 14.7071C2.68342 15.0976 3.31658 15.0976 3.70711 14.7071L5.41421 13H9.58579L6.63608 15.9497H4.2218C3.66952 15.9497 3.2218 16.3974 3.2218 16.9497C3.2218 17.502 3.66952 17.9497 4.2218 17.9497H4.63608L4.2218 18.364C3.83128 18.7545 3.83128 19.3877 4.2218 19.7782C4.61233 20.1687 5.24549 20.1687 5.63602 19.7782L6.05023 19.364V19.7781C6.05023 20.3304 6.49795 20.7781 7.05023 20.7781C7.60252 20.7781 8.05023 20.3304 8.05023 19.7781V17.364L11 14.4142V18.5858L9.29289 20.2929C8.90237 20.6834 8.90237 21.3166 9.29289 21.7071C9.68342 22.0976 10.3166 22.0976 10.7071 21.7071L11 21.4142V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21.4142L13.2929 21.7071C13.6834 22.0976 14.3166 22.0976 14.7071 21.7071C15.0976 21.3166 15.0976 20.6834 14.7071 20.2929L13 18.5858V14.4142L15.9498 17.364V19.7781C15.9498 20.3304 16.3975 20.7781 16.9498 20.7781C17.5021 20.7781 17.9498 20.3304 17.9498 19.7781V19.364L18.364 19.7782C18.7545 20.1687 19.3877 20.1687 19.7782 19.7782C20.1687 19.3877 20.1687 18.7545 19.7782 18.364L19.3639 17.9497H19.7782C20.3305 17.9497 20.7782 17.502 20.7782 16.9497C20.7782 16.3974 20.3305 15.9497 19.7782 15.9497H17.3639L14.4142 13H18.5858L20.2929 14.7071C20.6834 15.0976 21.3166 15.0976 21.7071 14.7071C22.0976 14.3166 22.0976 13.6834 21.7071 13.2929L21.4142 13H22C22.5523 13 23 12.5523 23 12C23 11.4477 22.5523 11 22 11H21.4142L21.7071 10.7071C22.0976 10.3166 22.0976 9.68342 21.7071 9.29289C21.3166 8.90237 20.6834 8.90237 20.2929 9.29289L18.5858 11H14.4142L17.3639 8.05029H19.7782C20.3305 8.05029 20.7782 7.60258 20.7782 7.05029C20.7782 6.49801 20.3305 6.05029 19.7782 6.05029H19.3639L19.7782 5.63606C20.1687 5.24554 20.1687 4.61237 19.7782 4.22185C19.3876 3.83132 18.7545 3.83132 18.3639 4.22185L17.9498 4.63602V4.22192C17.9498 3.66964 17.5021 3.22192 16.9498 3.22192C16.3975 3.22192 15.9498 3.66964 15.9498 4.22192V6.63602L13 9.58579V5.41421L14.7071 3.70711C15.0976 3.31658 15.0976 2.68342 14.7071 2.29289C14.3166 1.90237 13.6834 1.90237 13.2929 2.29289L13 2.58579V2Z" fill="#ffffff"></path> </g></svg>
          </button>
      </div>
      <app-neige *ngIf="this.weatherCondition==='Neige'" [ngClass]="bgColor"></app-neige>
      <app-pluie *ngIf="weatherCondition==='Pluie'" [ngClass]="bgColor"></app-pluie>
      <app-soleil *ngIf="weatherCondition==='Ensoleillé'" [ngClass]="bgColor" ></app-soleil>
      <app-nuage *ngIf="weatherCondition==='Nuageux'"></app-nuage>
      <div class="relative w-full h-screen">
        <h1 [style.display]="displayTitle ? 'block' : 'none'"
            class="absolute z-10 top-0 left-0 mb-4 ml-4 select-none font-extrabold bg-gradient-to-r from-blue-600 to-indigo-900 text-transparent bg-clip-text">
          <span class="text-6xl block">Bienvenue sur</span>
          <span class="text-9xl block">Le <br> Corps<br>Des<br> Océans</span>
        </h1>
        <ngt-canvas [ngClass]="bgColor" [sceneGraph]="sceneGraph"/>
      </div>
      <div
          class="absolute text-gray-500 p-5 left-3 bottom-3 rounded bg-white bg-opacity-50 pointer-events-none">
        <div [style.display]="displayLoader ? 'block' : 'none'"
             class="flex items-center justify-center w-full h-full">
          <div class="flex items-center space-x-1 font-bold">
            <div>Chargement du modèle</div>

            <svg fill='none' class="w-8 h-8 animate-spin" viewBox="0 0 32 32"
                 xmlns='http://www.w3.org/2000/svg'>
              <path clip-rule='evenodd'
                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                    fill='currentColor' fill-rule='evenodd'/>
            </svg>


          </div>
        </div>
        <ul class="list-disc list-inside dark:text-gray-400">
          <li>Commencez par vous balader autour du corps</li>
          <li>Cliquez sur les parties du corps qui vous intéressent</li>
          <li>Puis recommencez</li>
          <li>https://sketchfab.com/3d-models/splanchnology-5cfafb312f504815aa3fec55735607a6</li>
          <li>https://sketchfab.com/3d-models/water-waves-142c2596d1944cd0bf4fc1f490c4c248</li>
          <li>
            https://sketchfab.com/3d-models/realistic-human-heart-3f8072336ce94d18b3d0d055a1ece089
          </li>
          <li>
            https://sketchfab.com/3d-models/lambung-stomach-3d-modelling-3d464fe8a1d5417e80b165ecc3e984db
          </li>
          <li>
            https://sketchfab.com/3d-models/realistic-human-lungs-ce09f4099a68467880f46e61eb9a3531
          </li>
          <li>
            https://sketchfab.com/3d-models/small-and-large-intestine-8a1ca8e3ca224cdeb9264674416bde38
          </li>
          <li>https://sketchfab.com/3d-models/human-head-926ba74256cf463c920afc1fdc8bc6ae</li>
          <li>https://sketchfab.com/3d-models/kidney-3aef2741ea754fb486451292b87e159a</li>
          <li>Nuit de l\'info 2024 UHA 4.0</li>
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
export class SqueletteComponent implements OnInit {
  displayTitle: boolean = false;
  sceneGraph = AnatomyComponent;
    public weatherCondition: string | null = null;
    displayLoader: boolean = false;


    temperatures: number[] = []
  arbitrateTemperature = 20;

    constructor(private http: HttpClient, private signalService: SignalService) {
        effect(() => {
            this.displayTitle = this.signalService.getData()();
            this.displayLoader = this.signalService.getLoading()();
        });
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

  handleClickWeather(type: "sun" | "rain" | "snow"|"foggy") {
    switch (type) {
      case "sun":
        this.weatherCondition = 'Ensoleillé'
        this.temperatures.pop();
        this.temperatures.push(30);
        break;
      case "rain":
        this.weatherCondition = 'Pluie'
        this.temperatures.pop();
        this.temperatures.push(15);
        break;
      case "snow":
        this.weatherCondition = 'Neige'
        this.temperatures.pop();
        this.temperatures.push(0);
        break;
        case "foggy":
            this.weatherCondition = 'Nuageux'
            this.temperatures.pop();
            this.temperatures.push(19);
            break;
    default:
      break;
    }
  }

  ngOnInit(): void {
    this.getWeatherData()
  }
}
