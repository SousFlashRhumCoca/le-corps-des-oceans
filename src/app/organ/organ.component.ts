import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgtCanvas } from 'angular-three';
import { NgForOf } from '@angular/common';
import { BeardedAnatomyComponent } from '../bearded-anatomy/bearded-anatomy.component';
import { BrainAnatomyComponent } from '../brain-anatomy/brain-anatomy.component';
import { HeartAnatomyComponent } from '../heart-anatomy/heart-anatomy.component';
import { IntestineAnatomyComponent } from '../intestine-anatomy/intestine-anatomy.component';
import { KidneyAnatomyComponent } from '../kidney-anatomy/kidney-anatomy.component';
import { LungsAnatomyComponent } from '../lungs-anatomy/lungs-anatomy.component';
import { SpinalCordAnatomyComponent } from '../spinal-cord-anatomy/spinal-cord-anatomy.component';
import { StomacAnatomyComponent } from '../stomac-anatomy/stomac-anatomy.component';
import { TesticlesAnatomyComponent } from '../testicles-anatomy/testicles-anatomy.component';
import {FootAnatomyComponent} from "../foot-anatomy/foot-anatomy.component";

@Component({
  selector: 'app-organ',
  standalone: true,
  imports: [NgtCanvas, NgForOf],
  template: `
    <ngt-canvas [sceneGraph]="sceneGraph"></ngt-canvas>
    <div class="text-container">
      <div *ngFor="let line of textLines; let i = index" class="text" [style.animationDelay]="i * 5 + 's'">
        {{ line }}
      </div>
    </div>
    <div class="close-button" (click)="navigateToRoot()">&#10005;</div>
  `,
  styles: [
    `
      ngt-canvas {
        background-image: url("/ocean.jpg");
        background-repeat: no-repeat;
        background-size: cover;
      }

      .text-container {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        text-align: center;
      }

      .text {
        position: relative;
        line-height: 2em;
        overflow: hidden;
        opacity: 0;
        animation: fadeIn 10s forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes showHide {
        0% {
          width: 100%;
        }
        40% {
          width: 0%;
        }
        60% {
          width: 0%;
        }
        100% {
          width: 0%;
        }
      }

      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        z-index: 1000;
      }
    `,
  ],
})
export class OrganComponent implements OnInit {
  textLines: string[] = [];
  sceneGraph: any = HeartAnatomyComponent;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const inputString = params['inputString'] || '';
      this.processInputString(inputString);
    });
  }

  processInputString(input: string) {
    if (input === '1') {
      this.textLines = [
        'Les tourbillons océaniques concentrent l’énergie et la redistribuent.',
        'Mais s’ils se désorganisent, c’est le chaos des courants. ',
        'Le cœur, s’il est fort, propulse la vie dans tout notre corps, mais un battement désordonné peut bouleverser l’ensemble de notre équilibre.',
      ];
      this.sceneGraph = HeartAnatomyComponent;
    } else if (input === '2') {
      this.textLines = [
        'Le gyre océanique global ou les zones où le phytoplancton prolifère.',
        "Ces zones stratégiques 'pensent' pour l'océan en orchestrant le transport de la chaleur, des nutriments, et en régulant les écosystèmes marins.",
      ];
      this.sceneGraph = BrainAnatomyComponent;
    } else if (input === '3') {
      this.textLines = [
        "Les abysses sont comme l'estomac de l'océan : c'est là que les matières organiques coulent et se décomposent.",
        "Les organismes qui y vivent, comme les détritivores (crevettes, crabes, étoiles de mer), transforment les débris en nutriments utilisables pour l'écosystème global.",
      ];
      this.sceneGraph = StomacAnatomyComponent;
    } else if (input === '4') {
      this.textLines = [
        'Les échanges entre l’océan et l’atmosphère assurent l’équilibre des gaz vitaux.',
        'Une perturbation, et c’est l’acidification des eaux, une crise pour la planète.',
        'De la même manière, des poumons sains garantissent notre souffle, mais un air pollué ou une fonction altérée, et c’est la vie elle-même qui s’étouffe.',
      ];
      this.sceneGraph = LungsAnatomyComponent;
    } else if (input === '5') {
      this.textLines = [
        'Les récifs coralliens, riches et équilibrés, abritent une vie abondante.',
        'Mais si leur biodiversité décline, les océans en souffrent.',
        'De même, nos intestins, en bonne santé, nourrissent tout notre être, mais leur dérèglement peut être à l’origine de maladies profondes.',
      ];
      this.sceneGraph = IntestineAnatomyComponent;
    } else if (input === '6') {
      this.textLines = [
        'La surface des océans régule la chaleur et protège les profondeurs, mais une pollution excessive brise cette harmonie.',
        'Notre peau agit pareillement : saine, elle nous protège et respire, mais endommagée, elle devient une porte ouverte aux agressions extérieures.',
      ];
      this.sceneGraph = BeardedAnatomyComponent;
    } else if (input === '7') {
      this.textLines = [
        'Les récifs coralliens sont des centres de vie et de reproduction.',
        'Ils abritent une biodiversité massive et jouent un rôle clé dans le renouvellement de nombreuses espèces marines.',
        "Sans eux, l'écosystème marin perdrait une grande partie de sa vitalité et de sa capacité à se perpétuer.",
      ];
      this.sceneGraph = TesticlesAnatomyComponent;
    } else if (input === '8') {
      this.textLines = [
        'Les marées, en régulant les flux et nettoyant les rivages, préservent l’équilibre des côtes.',
        "Si elles viennent à s'altérer, l’accumulation des déchets menace les écosystèmes.",
        'De même, nos reins filtrent les toxines pour nous maintenir en bonne santé, mais quand ils faiblissent, c’est tout notre corps qui s’empoisonne.',
      ];
      this.sceneGraph = KidneyAnatomyComponent;
    } else if (input === '9') {
      this.textLines = [
        'Les marées, en régulant les flux et nettoyant les rivages, préservent l’équilibre des côtes.',
        "Si elles viennent à s'altérer, l’accumulation des déchets menace les écosystèmes.",
        'De même, nos reins filtrent les toxines pour nous maintenir en bonne santé, mais quand ils faiblissent, c’est tout notre corps qui s’empoisonne.',
      ];
      this.sceneGraph = SpinalCordAnatomyComponent;
    } else if (input === '10') {
      this.textLines = [
        'Les pieds interagissent directement avec le sol pour permettre les déplacements.',
        "Les zones littorales sont en interaction constante avec les vagues et les marées, influençant l'écosystème environnant",
      ];
      this.sceneGraph = FootAnatomyComponent;
    }
  }

  navigateToRoot() {
    this.router.navigate(['/']);
  }
}
