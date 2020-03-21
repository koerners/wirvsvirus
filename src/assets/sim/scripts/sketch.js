const COLORS = [
    [0, 172, 193],          // susceptible
    [255, 179, 0],          // exposed
    [213, 0, 0],            // infected
    [85, 139, 47],          // recovered
];
var E_RADIUS = 8;           // particle radius

var entities;
var population;

var hist;
var maxHist;
var count;

var I_CHANCE = 0.1;         // chance for an entity to become infected
var I_RADIUS = 24;          // radius within which entities can be infected
var TRANSITIONS = [
    1,                      // exposed      -> infected
    0.005,                  // infected     -> recovered
    0                       // recovered    -> susceptible
];

var graphType = 0;          // 0 = line graph, 1 = pie chart, 2 = none
var showRadius = false;     // whether to display infection radius


let radius_e_q ,
  radius_i_q ,
S0_q,
E0_q ,
I0_q ,
R0_q;




/*
 * Other functions
 */



// Draws a line graph of all entities
function lineGraph() {
    // Transparent rect behind graph
    fill(0, 127);
    noStroke();
    rect(0, 25, hist.length, 150);

    // Plot history of each state
    noFill();
    strokeWeight(2);
    for (let i = 0; i < COLORS.length; i++) {
        stroke(COLORS[i]);
        beginShape();
        for (let j = 0; j < hist.length; j++) {
            let y = map(hist[j][i], 0, count, 175, 25);
            vertex(j, y);
        }
        endShape();
    }
    strokeWeight(1);

    // Draw line at current draw location
    stroke(204);
    line(hist.length, 25, hist.length, 175);
}

// Draws a pie chart of all entities
function pieChart() {
    let results = countStates();
    let states = results[0];
    let total = results[1];

    // Draw pie chart
    let radius = 75;
    let lastAngle = 0;
    for (let i = 0; i < states.length; i++) {
        let angle = states[i] / total * TWO_PI;
        if (angle === 0) continue;

        // Arc
        fill(COLORS[i].concat(191));
        noStroke();
        ellipseMode(RADIUS);
        arc(100, 100, radius, radius, lastAngle, lastAngle + angle);
        lastAngle += angle;
    }
}

// Fills map randomly with entities of each state
// Requires an array of SEIR
function randomEntities(states) {
    entities = [];
    for (let i = 0; i < states.length; i++) {
        for (let j = 0; j < states[i]; j++) {
            let x = random(width);
            let y = random(height);
            entities.push(new Entity(x, y, i));
        }
    }
}

// Resets map
function reset() {
    // Set entity radius
    let e = parseInt(document.getElementById('e_r').value);
    E_RADIUS = e > 0 ? e : 1;

    // Set infection radius
    let r = parseInt(document.getElementById('i_r').value);
    I_RADIUS = r >= 0 ? r : 0;

    // Set initial population
    let ids = ['s0', 'e0', 'i0', 'r0'];
    population = [];
    for (let i = 0; i < ids.length; i++) {
        let v = parseInt(document.getElementById(ids[i]).value);
        population.push(v >= 0 ? v : 0);
    }
    randomEntities(population);

    // Set transitions
    ids = ['ds', 'de', 'di', 'dr'];
    let t = [];
    for (let i = 0; i < ids.length; i++) {
        let v = parseFloat(document.getElementById(ids[i]).value);
        t.push(constrain(v, 0, 1));
    }
    I_CHANCE = t.shift();
    TRANSITIONS = t;

    hist = [];
    count = countStates()[1];
}




/*
 * Main p5.js functions
 */

function setup() {

    radius_e_q = localStorage.getItem('rE');
    radius_i_q = localStorage.getItem('rI');
    S0_q = localStorage.getItem('s0');
    E0_q = localStorage.getItem('e0');
    I0_q = localStorage.getItem('i0');
    R0_q = localStorage.getItem('r0');


    let m = document.getElementById('sketch');
    let canvas = createCanvas(m.offsetWidth, m.offsetHeight);
    canvas.parent(m);
    resizeCanvas(m.offsetWidth, m.offsetHeight, true);

    reset();

    maxHist = ceil(width / 4);
}

function draw() {
    background('#E8E8E8');

    hist.push(countStates()[0]);
    if (hist.length > maxHist) hist.shift();

    for (let i = 0; i < entities.length; i++) {
        entities[i].act();
    }

    if (graphType === 0) {
        lineGraph();
    } else if (graphType === 1) {
        pieChart();
    }
}




/*
 * User input
 */

function keyPressed() {
    switch (keyCode) {
        case 32:
            // Spacebar
            showRadius = !showRadius;
            break;
        case 71:
            // G
            graphType++;
            if (graphType > 2) graphType = 0;
            break;
        case 77:
            // M
            importScenario(prompt('Input scenario string:'));
            break;
        case 82:
            // R
            reset();
            break;
        case 88:
            // X
            copyToClipboard(exportScenario());
            break;
    }
}
