import * as THREE from 'three';
import { Entity } from '../entity';

export class Station extends Entity {
    model: THREE.Object3D;

    constructor(model: THREE.Object3D) {
        super(model);
        this.angularVelocity.y = 0.01;

        this.model.position.copy(this.position);
        this.model.rotation.copy(this.rotation);
    }

    update(dt: number) {
        super.update(dt);
    }

    render(alpha: number, dt: number) {
        super.render(alpha, dt);

        // this.model.children[0].rotation.z = this.rotation.y + this.angularVelocity.y * dt * alpha;
        // this.model.children[1].rotation.z = -this.rotation.y - this.angularVelocity.y * dt * alpha;
        // this.model.children[2].rotation.z = -this.rotation.y - this.angularVelocity.y * dt * alpha;
    }
}
