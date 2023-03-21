import { Vector3 } from './vector';

export class Quaternion {
    constructor(public x = 0, public y = 0, public z = 0, public w = 1) {}

    static orientationInDirection(axis: Vector3, angle: number) {
        const sinAngle = Math.sin(angle / 2);
        return new Quaternion(sinAngle * axis.x, sinAngle * axis.y, sinAngle * axis.z, Math.cos(angle / 2));
    }

    clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    static conjugate(q: Quaternion) {
        return new Quaternion(-q.x, -q.y, -q.z, q.w);
    }

    conjugate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
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
        return this;
    }

    dot(q: Quaternion) {
        return this.x * q.x + this.y * q.y + this.z + q.z + this.w * q.w;
    }

    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    }

    normalize() {
        let len = this.length;
        if (len === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        } else {
            len = 1 / len;
            this.x *= len;
            this.y *= len;
            this.z *= len;
            this.w *= len;
        }
    }

    get angle() {
        const q = this.clone();
        if (q.w > 1) q.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalized
        return 2 * Math.acos(q.w);
    }

    get axis() {
        //From: http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
        const q = this.clone();
        if (q.w > 1) q.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalized
        const s = Math.sqrt(1 - q.w * q.w); // assuming quaternion normalised then w is less than 1, so term always positive.
        if (s < 0.001) {
            // test to avoid divide by zero, s is always positive due to sqrt
            // if s close to zero then direction of axis not important
            // if it is important that axis is normalised then replace with x=1; y=z=0;
            return new Vector3(q.x, q.y, q.z);
        }

        return new Vector3(q.x / s, q.y / s, q.z / s);
    }
}
