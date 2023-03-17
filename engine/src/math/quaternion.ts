import { Vector3 } from './vector';

class Quaternion {
    constructor(public x = 0, public y = 0, public z = 0, public w = 0) {}

    static orientationInDirection(axis: Vector3, angle: number) {
        const sinAngle = Math.sin(angle / 2);
        return new Quaternion(sinAngle * axis.x, sinAngle * axis.y, sinAngle * axis.z, Math.cos(angle / 2));
    }

    conjugate() {
        return new Quaternion(-this.x, -this.y, -this.z, this.w);
    }
}
