import { Mesh, Quaternion, Vector3 } from 'merlin';
import { Entity } from './entity';
import { Context } from './types';
// import * as THREE from 'three';
import { Asteroid } from './asteroid';

// const obj = new THREE.Object3D();

export class Ship extends Entity {
    maxForce = 50;
    resource = 0;
    miningRange = 16;
    baseOrientation = new Quaternion();

    constructor(ctx: Context, position = new Vector3(), orientation = new Quaternion()) {
        super(new Mesh(ctx.models.get('spaceship').scene), position, orientation);
        ctx.scene.add(this.mesh.value);

        this.maxSpeed = 50;
    }

    update(dt: number) {
        super.update(dt);
        this.acceleration.set(0);

        this.calculateOrientation(Vector3.normalize(this.velocity));
    }

    render(alpha: number, dt: number) {
        super.render(alpha, dt);
    }

    seek(target: Vector3) {
        const desired = Vector3.sub(target, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);
        desired.sub(this.velocity);
        desired.limit(this.maxForce);
        this.applyForce(desired);
    }

    arrive(target: Vector3, slowRadius = 10, targetRadius = 0) {
        const desired = Vector3.sub(target, this.position);
        const d = desired.mag - targetRadius;
        desired.mag = d > slowRadius ? this.maxSpeed : (d / slowRadius) * this.maxSpeed;
        desired.sub(this.velocity);
        desired.mult(10); // 0.1s to reach desired speed
        desired.limit(this.maxForce);
        this.applyForce(desired);
    }

    mine(asteroid: Asteroid, multiplier = 5) {
        const distance = Vector3.sub(asteroid.position, this.position).mag;
        if (distance > this.miningRange) {
            this.arrive(asteroid.position, 40, this.miningRange - 1);
        } else {
            if (asteroid.resource > 0) {
                asteroid.resource -= multiplier;
                this.resource += multiplier;
            }
        }
    }

    deposit(destination: Vector3) {
        this.arrive(destination, 45, 0);

        if (this.velocity.mag < 0.1 && this.resource > 0) {
            this.resource = 0;
        }
    }

    calculateOrientation(v: Vector3) {
        const forward = new Vector3(0, 0, 1).multQ(this.orientation);

        if (forward.equals(v)) {
            return this.orientation;
        } else if (forward.equals(new Vector3(-v.x, -v.y, -v.z))) {
            return Quaternion.conjugate(this.orientation);
        }

        const axis = Vector3.cross(forward, v);
        const angle = Math.asin(axis.mag);
        axis.normalize();

        const r = Quaternion.orientationInDirection(axis, angle);
        const target = Quaternion.conjugate(this.baseOrientation).mult(r);
        this.angularVelocity = target.axis.mult(target.angle * 5); // 0.2s to reach desired angle;
    }
}
