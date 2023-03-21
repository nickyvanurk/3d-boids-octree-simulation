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

    static mult(q1: Quaternion, q2: Quaternion | number) {
        if (q2 instanceof Quaternion) {
            return new Quaternion(
                q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x,
                -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y,
                q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z,
                -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w,
            );
        } else {
            return new Quaternion(q1.x * q2, q1.y * q2, q1.z * q2, q1.w * q2);
        }
    }

    mult(q2: Quaternion | number) {
        if (q2 instanceof Quaternion) {
            this.x = this.x * q2.w + this.y * q2.z - this.z * q2.y + this.w * q2.x;
            this.y = -this.x * q2.z + this.y * q2.w + this.z * q2.x + this.w * q2.y;
            this.z = this.x * q2.y - this.y * q2.x + this.z * q2.w + this.w * q2.z;
            this.w = -this.x * q2.x - this.y * q2.y - this.z * q2.z + this.w * q2.w;
        } else {
            this.x *= q2;
            this.y *= q2;
            this.z *= q2;
            this.w *= q2;
        }
    }
}
