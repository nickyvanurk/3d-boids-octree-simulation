import { Vector3 } from './vector';

class Quaternion {
    constructor(public _x = 0, public _y = 0, public _z = 0, public _w = 0) {}

    static orientationInDirection(axis: Vector3, angle: number) {
        const sinAngle = Math.sin(angle / 2);
        return new Quaternion(sinAngle * axis.x, sinAngle * axis.y, sinAngle * axis.z, Math.cos(angle / 2));
    }
}
