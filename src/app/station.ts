import { Mesh, Quaternion, Vector3 } from 'merlin';
import { Entity } from './entity';
import { Context } from './types';

export class Station extends Entity {
    upperCentrifugeSpeed = -Math.PI / 180;
    lowerCentrifugeSpeed = Math.PI / 180;
    upperCentrifugeRotation = 0;
    lowerCentrifugeRotation = 0;

    constructor(ctx: Context, position = new Vector3(), orientation = new Quaternion()) {
        super(new Mesh(ctx.models.get('station').scene), position, orientation);
        ctx.scene.add(this.mesh.value);
    }

    update(dt: number) {
        super.update(dt);

        this.upperCentrifugeRotation += this.upperCentrifugeSpeed * dt;
        this.lowerCentrifugeRotation += this.lowerCentrifugeSpeed * dt;
    }

    render(alpha: number, dt: number) {
        super.render(alpha, dt);

        this.mesh.value.children[0].rotation.z = this.lowerCentrifugeRotation + this.lowerCentrifugeSpeed * dt * alpha;
        this.mesh.value.children[1].rotation.z = this.upperCentrifugeRotation + this.upperCentrifugeSpeed * dt * alpha;
        this.mesh.value.children[2].rotation.z = this.upperCentrifugeRotation + this.upperCentrifugeSpeed * dt * alpha;
    }
}
