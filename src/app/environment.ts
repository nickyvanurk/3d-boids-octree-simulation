import * as THREE from 'three';
import * as utils from './utils';
import { Context } from './types';

export class Environment {
    constructor(ctx: Context) {
        ctx.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.setScalar(1);
        ctx.scene.add(dirLight);

        const stars = utils.createPointCloudSphere(1000, 6000, 2000, 12.5, 0xffffff, false);
        ctx.scene.add(stars);
    }
}
