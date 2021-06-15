// for simplicity the magnitude of the charge is always set to 1,
// but it can be changed to any other magnitude using a magnitude property
// and the random function.

class Charge {
    constructor(x, y, polarity) {
        // properties of the charge
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.polarity = polarity;
        this.max_force = 1;
        this.max_vel = 3;
        this.debug_vector_length = 20;
    }

    show() {
        strokeWeight(8);
        // blue charges are positive and
        // yeloow charges are negative
        if (this.polarity == 1) {
            stroke(40, 70, 255);
        } else {
            stroke(200, 200, 40);
        }
        point(this.pos.x, this.pos.y);
    }

    // the physics engine
    // ----------------------------- //
    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.limit(this.max_vel);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    // ----------------------------- //

    // this function deals with the edge cases i.e., when the charge
    // flies off the scree, it is brought aring by "wrapping" the
    // canvas around itself
    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }

        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    // this function allows us to clearly see the
    // direction of the velocity vector and hence where
    // the charge is heading
    debug() {
        stroke(40, 200, 70);
        strokeWeight(2);
        line(
            this.pos.x,
            this.pos.y,
            this.pos.x + cos(this.vel.heading()) * this.debug_vector_length,
            this.pos.y + sin(this.vel.heading()) * this.debug_vector_length
        );
    }

    // function to calculate the coulomb force for
    // each of the individual charge
    coulomb_forces(charges, k) {
        // for all the charges in the array the coulomb force is calculated
        // as per the Coulomb force law and the law of superposition

        // the coulomb force:
        // F = k(q1 * q2)/r²
        // where k = 1/4πε
        //      ε = permittivity of free space.

        // law of superposition:
        //      the net force on an object is the vectorial sum
        //      of all the forces on the that object
        for (let charge of charges) {
            if (charge !== this) {
                let r = dist(
                    this.pos.x,
                    this.pos.y,
                    charge.pos.x,
                    charge.pos.y
                );
                r = max(r, 8); // restricting the value of r so r != 0, thus F != ∞ .

                let charge_product = this.polarity * charge.polarity;
                let sqr_r = pow(r, 2);

                // the initial vector is a vector pointing at the opposite charge.
                let coulomb_force = p5.Vector.sub(this.pos, charge.pos);

                // setting the magnitude of the coulomb force using
                // the coulomb force equation
                coulomb_force.setMag(charge_product);
                coulomb_force.mult(k);
                coulomb_force.div(sqr_r);
                coulomb_force.limit(this.max_force);

                this.applyForce(coulomb_force);
            }
        }
    }
}
