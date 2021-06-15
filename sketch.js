let charges = [];

// coulomb force constant k
let k = 30;
let number_of_charges = 20;

let polarities = [-1, 1];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < number_of_charges; i++) {
        let origin_x = random(width);
        let origin_y = random(height);
        let origin_polarity = random(polarities);
        charges.push(new Charge(origin_x, origin_y, origin_polarity));
    }
}

function draw() {
    background(40);
    for (let charge of charges) {
        charge.show();
        charge.coulomb_forces(charges, k);
        charge.edges();
        charge.debug();
        charge.update();
    }
}
