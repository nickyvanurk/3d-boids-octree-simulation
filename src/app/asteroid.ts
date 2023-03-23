import * as THREE from 'three';
import { Mesh, Quaternion, Vector3 } from 'merlin';
import { Entity } from './entity';
import { Context } from './types';
import { type MeshBasicMaterial } from 'three';

export class Asteroid extends Entity {
    resource = 100;

    private material: MeshBasicMaterial;

    constructor(ctx: Context, position = new Vector3(), orientation = new Quaternion()) {
        const geometry = new THREE.SphereGeometry(5, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        super(new Mesh(sphere), position, orientation);
        ctx.scene.add(this.mesh.value);
        this.material = material;
    }

    update(dt: number) {
        super.update(dt);

        if (this.resource <= 0) {
            this.resource = 0;
            this.material.color.set(0xff0000);
        }
    }

    render(alpha: number, dt: number) {
        super.render(alpha, dt);
    }
}
