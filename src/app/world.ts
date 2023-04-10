import { Fleet } from './fleet';
import { Station } from './station';
import { Context } from './types';
import { Ship } from './ship';
import { Asteroid } from './asteroid';
import { Vector3 } from '../../engine/src/math/vector';
import { Environment } from './environment';

export class World {
    env: Environment;
    station: Station;
    fleet: Fleet;
    ship: Ship;
    asteroid: Asteroid;
    asteroids: Asteroid[];
    currentAsteroid = 0;
    home = new Vector3();

    constructor(ctx: Context) {
        this.env = new Environment(ctx);
        this.ship = new Ship(ctx, new Vector3(0, 0, 0));
        this.asteroids = [
            new Asteroid(ctx, new Vector3(50, 0, 50)),
            new Asteroid(ctx, new Vector3(-50, 0, 50)),
            new Asteroid(ctx, new Vector3(50, 0, -50)),
            new Asteroid(ctx, new Vector3(-50, 0, -50)),
        ];
    }

    update(dt: number) {
        const asteroid = this.asteroids[this.currentAsteroid];
        if (asteroid.resource > 0) {
            this.ship.mine(asteroid);
        } else if (this.currentAsteroid < this.asteroids.length - 1) {
            this.currentAsteroid++;
        } else {
            this.ship.deposit(this.home);
        }

        this.ship.update(dt);
        for (const asteroid of this.asteroids) {
            asteroid.update(dt);
        }
    }

    render(alpha: number, dt: number) {
        this.ship.render(alpha, dt);
        for (const asteroid of this.asteroids) {
            asteroid.render(alpha, dt);
        }
    }
}
