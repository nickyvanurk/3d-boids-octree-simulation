import * as THREE from 'three';
import { Quaternion, Vector3 } from '../math';

export class Mesh {
    value: THREE.Object3D;
    position = new Vector3();
    orientation = new Quaternion();

    constructor(mesh: THREE.Object3D) {
        this.value = mesh;
    }

    update() {
        this.value.position.set(this.position.x, this.position.y, this.position.z);
        this.value.quaternion.set(this.orientation.x, this.orientation.y, this.orientation.z, this.orientation.w);
    }
}
