import { NgFor, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import {
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  Clock,
} from 'three';
import { GLTFLoader, OrbitControls } from 'three-stdlib';
import { DialogService } from '../dialog/dialog.service';

@Component({
  standalone: true,
  template: `
    <ngt-group #group>
      <ngt-grid-helper />

      <!-- The object will be dynamically inserted here -->

      <ngt-mesh></ngt-mesh>
    </ngt-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgtArgs, NgFor],
  styles: [``]
})
export class FootAnatomyComponent {
  private groupRef = viewChild.required<ElementRef<Group>>('group');
  private gltfLoader = new GLTFLoader();
  private clock = new Clock();
  private object: Object3D | null = null;

  constructor(private dialogService: DialogService) {
    extend({
      Group,
      Object3D,
      AmbientLight,
      DirectionalLight,
      OrbitControls,
      Mesh,
      SphereGeometry,
      MeshBasicMaterial,
    });

    this.gltfLoader.load('https://static.rullo.fr/foot.glb', (gltf) => {
      const object = gltf.scene;
      object.scale.set(1.5, 1.5, 1.5);
      object.position.set(0, 0, 0);
      gltf.scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          if (mesh.material) {
            // Si une texture est disponible, l'assigner
            if ((mesh.material as any).map) {
              mesh.material = new MeshStandardMaterial({
                map: (mesh.material as any).map,
                // Copiez d'autres propriétés si nécessaire
              });
            }
          }
        }
      });

      const group = this.groupRef().nativeElement;

      // Add ambient light
      const ambientLight = new AmbientLight(0xffffff, 1);
      group.add(ambientLight);

      // Add directional light
      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      group.add(directionalLight);

      group.add(object);
      this.object = object;
      this.animate();
    });
  }

  animate() {
    const animate = () => {
      if (this.object) {
        const elapsedTime = this.clock.getElapsedTime();
        this.object.rotation.y += 0.01; // Add slow rotation around the Y-axis
      }
      requestAnimationFrame(animate);
    };
    animate();
  }
}
