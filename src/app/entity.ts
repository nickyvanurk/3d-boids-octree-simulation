import { Vector3, Mesh, Quaternion } from 'merlin';

export class Entity {
    mesh: Mesh;
    position: Vector3;
    orientation: Quaternion;
    velocity = new Vector3();
    acceleration = new Vector3();
    angularVelocity = new Quaternion();
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

        // this.orientation.add(Quaternion.mult(this.angularVelocity, dt));
    }

    render(alpha: number, dt: number) {
        this.mesh.position.set(Vector3.add(this.position, Vector3.mult(this.velocity, dt * alpha)));
        if (this.velocity.mag > 0 || this.angularVelocity.length > 0) {
            // this.mesh.orientation.set(
            // Quaternion.add(this.orientation, Quaternion.mult(this.angularVelocity, dt * alpha)),
            // );
        }
        this.mesh.update();
    }

    applyForce(force: Vector3) {
        this.acceleration.add(force);
    }
}
