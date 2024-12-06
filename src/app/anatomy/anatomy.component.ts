import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    viewChild,
} from '@angular/core';
import {NgFor} from '@angular/common';
import {extend, injectStore, NgtArgs} from 'angular-three';
import {GLTFLoader, MTLLoader, OBJLoader, OrbitControls} from 'three-stdlib';
import {
    AmbientLight,
    DirectionalLight,
    Group,
    Object3D,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    Vector3,
    Clock,
    Euler,
} from 'three';
import {DialogService} from "../dialog/dialog.service";

@Component({
    standalone: true,
    template: `
        <ngt-group #group>
            <ngt-orbit-controls *args="[camera(), glDomElement()]"/>
            <ngt-grid-helper/>

            <!-- The object will be dynamically inserted here -->

            <ngt-mesh
                    *ngFor="let point of points"
                    (click)="onSphereClick(point)"
                    [position]="point.position"
                    [scale]="0.1"
            >
                <ngt-sphere-geometry/>
                <ngt-mesh-basic-material [parameters]="{ color: 'red' }"/>
            </ngt-mesh>
        </ngt-group>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgtArgs, NgFor]
})
export class AnatomyComponent {
    private groupRef = viewChild.required<ElementRef<Group>>('group');

    private clock = new Clock();

    private mtlLoader = new MTLLoader();
    private objLoader = new OBJLoader();
    private gltfLoader = new GLTFLoader();

    private store = injectStore();
    protected camera = this.store.select('camera');
    protected glDomElement = this.store.select('gl', 'domElement');
    private waterObject: Object3D | null = null;

    points = [
        {
            position: [0.4, 3, 0.5],
            positionCamera: [1.5, 3, 3],
            rotationCamera: [0, 0, 0],
            title: "La peau et la surface de l’eau",
            citation: "La surface des océans régule la chaleur et protège les profondeurs, mais une pollution excessive brise cette harmonie. Notre peau agit pareillement : saine, elle nous protège et respire, mais endommagée, elle devient une porte ouverte aux agressions extérieures.   "
        },
        {
            position: [0, 0, 0.5],
            positionCamera: [1, 0, 2.5],
            rotationCamera: [0, 0, 0],
            title: "Le système circulatoire et les courants marins",
            citation: "Quand les courants marins coulent librement, ils répartissent la chaleur et les nutriments, nourrissant les écosystèmes. Mais qu’un courant soit bloqué, et c’est tout un océan qui souffre. Il en va de même pour notre sang : des artères dégagées assurent la vie, tandis qu’un blocage met tout en péril."
        },
        {
            position: [0, 2, -0.7],
            positionCamera: [1, 2, -3],
            rotationCamera: [0, Math.PI + 0.1, 0],
            title: "Les reins et les marées",
            citation: "Les marées, en régulant les flux et nettoyant les rivages, préservent l’équilibre des côtes. Si elles viennent à s'altérer, l’accumulation des déchets menace les écosystèmes. De même, nos reins filtrent les toxines pour nous maintenir en bonne santé, mais quand ils faiblissent, c’est tout notre corps qui s’empoisonne."
        },
    ]

  constructor(private dialogService: DialogService) {
    extend({
      Group,
      Object3D,
      AmbientLight,
      DirectionalLight,
      OrbitControls,
      Mesh,
      SphereGeometry,
      MeshBasicMaterial
    });

        this.gltfLoader.load('https://static.rullo.fr/water_waves.glb', (gltf) => {
            const object = gltf.scene;
            object.scale.set(0.1, 0.1, 0.1);
            object.position.set(0, 0, 0);
            object.traverse((child) => {
                if (child instanceof Mesh) {
                    const material = child.material as MeshBasicMaterial;
                    material.color.set('skyblue');
                    material.transparent = true;
                    material.opacity = 0.3;
                }
            });
            this.groupRef().nativeElement.add(object);
            this.waterObject = object;
            this.animateWaves();
        });

        this.mtlLoader.load('https://static.rullo.fr/anatomy.mtl', (materials) => {
            materials.preload();
            this.objLoader.setMaterials(materials);
            this.objLoader.load('https://static.rullo.fr/anatomy.obj', (object: Object3D) => {
                // Retrieve the group
                const group = this.groupRef().nativeElement;

                // Add the object to the group
                group.add(object);
                object.scale.set(6, 6, 6);
                object.position.set(0, -5, 0);

                // Add ambient light
                const ambientLight = new AmbientLight(0xffffff, 0.5);
                group.add(ambientLight);

                // Add directional light
                const directionalLight = new DirectionalLight(0xffffff, 1);
                directionalLight.position.set(5, 10, 7.5);
                group.add(directionalLight);

                this.camera().position.set(0, 0, 8);
            });
        });
    }

    animateWaves() {
        const animate = () => {
            if (this.waterObject) {
                const elapsedTime = this.clock.getElapsedTime();
                this.waterObject.position.y = -5 + Math.sin(elapsedTime) * 0.1; // Adjust the amplitude as needed
                this.waterObject.rotation.z = Math.sin(elapsedTime) * 0.05; // Adjust the rotation as needed
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    zoomCamera(targetPosition: Vector3, targetRotation: Euler, duration: number) {
        const startPosition = this.camera().position.clone();
        const deltaPosition = targetPosition.clone().sub(startPosition);

        const startRotation = this.camera().rotation.clone();
        const deltaRotation = new Euler(
            targetRotation.x - startRotation.x,
            targetRotation.y - startRotation.y,
            targetRotation.z - startRotation.z
        );

        const startTime = performance.now();

        const animate = () => {
            const elapsedTime = (performance.now() - startTime) / 1000;
            const t = Math.min(elapsedTime / duration, 1);

            this.camera().position.copy(startPosition.clone().add(deltaPosition.clone().multiplyScalar(t)));
            this.camera().rotation.set(
                startRotation.x + deltaRotation.x * t,
                startRotation.y + deltaRotation.y * t,
                startRotation.z + deltaRotation.z * t
            );

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    resetCamera() {
        this.zoomCamera(new Vector3(0, 0, 8), new Euler(0, 0, 0), 2);
    }

    onSphereClick(point: typeof this.points[number]) {
        if (this.camera().position.equals(new Vector3(...point.positionCamera))) {
            this.resetCamera();
            return;
        }

        this.dialogService.openDialog(point.title, point.citation).subscribe((x) => {
            if (x == 'continued') {
                this.resetCamera();
            }
        })
        this.zoomCamera(new Vector3(...point.positionCamera), new Euler(...point.rotationCamera), 2);
    }
}
