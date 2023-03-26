import { Vector3, Mesh, Quaternion } from 'merlin';

export class Entity {
    mesh: Mesh;
    position: Vector3;
    orientation: Quaternion;
    velocity = new Vector3();
    acceleration = new Vector3();
    angularVelocity = new Vector3();
    maxSpeed = 1;

    constructor(mesh: Mesh, position = new Vector3(), orientation = new Quaternion()) {
        this.mesh = mesh;
        this.position = position;
        this.orientation = orientation;

        this.mesh.position.set(position);
        this.mesh.orientation.set(orientation);
        this.mesh.update();
    }

    update(dt: number) {
        this.velocity.add(Vector3.mult(this.acceleration, dt));
        this.velocity.limit(this.maxSpeed);
        this.position.add(Vector3.mult(this.velocity, dt));

        const w = new Quaternion(
            this.angularVelocity.x * dt,
            this.angularVelocity.y * dt,
            this.angularVelocity.z * dt,
            0,
        );
        this.orientation.add(w.mult(this.orientation).mult(0.5));
        this.orientation.normalize();
    }

    render(alpha: number, dt: number) {
        this.mesh.position.set(Vector3.add(this.position, Vector3.mult(this.velocity, dt * alpha)));
        if (this.velocity.mag > 0 || this.angularVelocity.mag > 0) {
            const w = new Quaternion(
                this.angularVelocity.x * dt * alpha,
                this.angularVelocity.y * dt * alpha,
                this.angularVelocity.z * dt * alpha,
                0,
            );
            this.mesh.orientation.set(Quaternion.add(this.orientation, w.mult(this.orientation).mult(0.5)));
        }
        this.mesh.update();
    }

    applyForce(force: Vector3) {
        this.acceleration.add(force);
    }
}
