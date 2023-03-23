import { Quaternion } from 'three/src/math/Quaternion';
import { Entity } from '../../../src/app/entity';
import { Vector3 } from '../math';

// Align matches another orientation
class Align3D {
    constructor(public character: Entity, public target: Entity) {}

    getSteering() {}
}

export const SteeringOutput = {
    linear: Vector3,
    angular: Vector3,
};

class Kinematic {
    position: Vector3;
    orientation: Quaternion;
    velocity: Vector3;
    rotation: Vector3;
}
