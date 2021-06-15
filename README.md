# charges-simulation
a little simulation of charges and their motion due to other charges present around them 

It uses the Coulomb's on forces between charges and the law of superposition.


- Coulomb forces:
```

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

```

- law of superposition

```
    applyForce(force) {
        this.acc.add(force);
    }
```

