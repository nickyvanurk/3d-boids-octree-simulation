export class Vector3 {
    constructor(public x = 0, public y = 0, public z = 0) {}

    set(x: Vec3ArrayNum, y?: number, z?: number) {
        const p = parseArgs(x, y, z);
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
        return this;
    }

    clone() {
        return new Vector3().set(this);
    }

    static add(v1: Vec3ArrayNum, v2: Vec3ArrayNum, target = v1 instanceof Vector3 ? v1.clone() : new Vector3()) {
        return target.set(v1).add(v2);
    }

    add(x: Vec3ArrayNum, y?: number, z?: number) {
        const p = parseArgs(x, y, z);
        this.x += p.x;
        this.y += p.y;
        this.z += p.z;
        return this;
    }

    static sub(v1: Vec3ArrayNum, v2: Vec3ArrayNum, target = v1 instanceof Vector3 ? v1.clone() : new Vector3()) {
        return target.set(v1).sub(v2);
    }

    sub(x: Vec3ArrayNum, y?: number, z?: number) {
        const p = parseArgs(x, y, z);
        this.x -= p.x;
        this.y -= p.y;
        this.z -= p.z;
        return this;
    }

    static mult(v1: Vec3ArrayNum, v2: Vec3ArrayNum, target = v1 instanceof Vector3 ? v1.clone() : new Vector3()) {
        return target.set(v1).mult(v2);
    }

    mult(x: Vec3ArrayNum, y?: number, z?: number) {
        const p = parseArgs(x, y, z);
        this.x *= p.x;
        this.y *= p.y;
        this.z *= p.z;
        return this;
    }

    get magSq() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    get mag() {
        return Math.sqrt(this.magSq);
    }

    set mag(s: number) {
        this.normalize();
        this.mult(s);
    }

    static normalize(v: Vector3, target = v.clone()) {
        return target.set(v).normalize();
    }

    normalize() {
        const len = this.mag;
        if (len !== 0) this.mult(1 / len);
        return this;
    }

    limit(max: number) {
        const mSq = this.magSq;
        if (mSq > max ** 2) {
            this.normalize().mult(max);
        }
        return this;
    }

    static dot(v1: Vector3, v2: Vector3) {
        return v1.clone().dot(v2);
    }

    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    static cross(v1: Vector3, v2: Vector3) {
        return v1.clone().cross(v2);
    }

    cross(v: Vector3) {
        this.x = this.y * v.z - this.z * v.y;
        this.y = this.z * v.x - this.x * v.z;
        this.z = this.x * v.y - this.y * v.x;
        return this;
    }

    static get left() {
        return new Vector3(-1, 0, 0);
    }

    static get right() {
        return new Vector3(1, 0, 0);
    }

    static get up() {
        return new Vector3(0, 1, 0);
    }

    static get down() {
        return new Vector3(0, -1, 0);
    }

    static get forward() {
        return new Vector3(0, 0, -1);
    }

    static get back() {
        return new Vector3(0, 0, 1);
    }
}

export class Vector2 {
    constructor(public x = 0, public y = 0) {}

    set(x: Vec2ArrayNum, y?: number) {
        const p = parseArgs(x, y);
        this.x = p.x;
        this.y = p.y;
        return this;
    }

    clone() {
        return new Vector2().set(this);
    }

    static add(v1: Vec2ArrayNum, v2: Vec2ArrayNum, target = v1 instanceof Vector2 ? v1.clone() : new Vector2()) {
        return target.set(v1).add(v2);
    }

    add(x: Vec2ArrayNum, y?: number) {
        const p = parseArgs(x, y);
        this.x += p.x;
        this.y += p.y;
        return this;
    }

    static sub(v1: Vec2ArrayNum, v2: Vec2ArrayNum, target = v1 instanceof Vector2 ? v1.clone() : new Vector2()) {
        return target.set(v1).sub(v2);
    }

    sub(x: Vec2ArrayNum, y?: number) {
        const p = parseArgs(x, y);
        this.x -= p.x;
        this.y -= p.y;
        return this;
    }

    static mult(v1: Vec2ArrayNum, v2: Vec2ArrayNum, target = v1 instanceof Vector2 ? v1.clone() : new Vector2()) {
        return target.set(v1).mult(v2);
    }

    mult(x: Vec2ArrayNum, y?: number) {
        const p = parseArgs(x, y);
        this.x *= p.x;
        this.y *= p.y;
        return this;
    }

    get magSq() {
        return this.x ** 2 + this.y ** 2;
    }

    get mag() {
        return Math.sqrt(this.magSq);
    }

    set mag(s: number) {
        this.normalize();
        this.mult(s);
    }

    static normalize(v: Vector2, target = v.clone()) {
        return target.set(v).normalize();
    }

    normalize() {
        const len = this.mag;
        if (len !== 0) this.mult(1 / len);
        return this;
    }

    limit(max: number) {
        const mSq = this.magSq;
        if (mSq > max ** 2) {
            this.normalize().mult(max);
        }
        return this;
    }

    static get left() {
        return new Vector2(-1, 0);
    }

    static get right() {
        return new Vector2(1, 0);
    }

    static get up() {
        return new Vector2(0, -1);
    }

    static get down() {
        return new Vector2(0, 1);
    }
}

type Vec3ArrayNum = Vector3 | number[] | number;
type Vec2ArrayNum = Vector2 | number[] | number;

function parseArgs(x: Vec3ArrayNum | Vec2ArrayNum, y?: number, z?: number) {
    const p = { x: 0, y: 0, z: 0 };
    if (x instanceof Vector3) {
        p.x = x.x || 0;
        p.y = x.y || 0;
        p.z = x.z || 0;
    } else if (x instanceof Vector2) {
        p.x = x.x || 0;
        p.y = x.y || 0;
        p.z = 0;
    } else if (x instanceof Array) {
        p.x = x[0] || 0;
        p.y = x[1] || 0;
        p.z = x[2] || 0;
    } else if (!y && !z) {
        p.x = x || 0;
        p.y = x || 0;
        p.z = x || 0;
    } else {
        p.x = x || 0;
        p.y = y || 0;
        p.z = z || 0;
    }
    return p;
}
