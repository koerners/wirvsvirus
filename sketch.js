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



var kontakte, stadtGroesse, speed;



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
            entities.push(new Entity(x, y, i, speed));
        }
    }
}

// Resets map
function reset() {

    kontakte = $("input:radio[name=kontakte]:checked").val()
    speed = 0.2 + (kontakte);
    console.log(speed);
    stadtGroesse = $("input:radio[name=stadt]:checked").val()

    // Set entity radius
    let e = 4
    E_RADIUS = e > 0 ? e : 1;

    // Set infection radius
    let r = 30
    I_RADIUS = r >= 0 ? r : 0;

    // Set initial population
    let ids = ['s0', 'e0', 'i0', 'r0'];
    let size = 100 * parseInt(stadtGroesse);
    console.log(size);
    let idsV = [size, 10, 10, 5];

    population = [];
    for (let i = 0; i < ids.length; i++) {
        let v = idsV[i];
        population.push(v >= 0 ? v : 0);
    }
    randomEntities(population);

    // Set transitions
    ids = ['ds', 'de', 'di', 'dr'];
    idV = [0.1, 1, 0.005, 0];


    let t = [];
    for (let i = 0; i < ids.length; i++) {
        let v = idV[i];
        t.push(constrain(v, 0, 1));
    }
    I_CHANCE = t.shift();
    TRANSITIONS = t;

    hist = [];
    count = countStates()[1];
}



function setup() {
    var canvas =  createCanvas(document.getElementById("sketch-holder").offsetWidth, document.getElementById("sketch-holder").offsetHeight);
    canvas.parent('sketch-holder');

    $.ajax({url: "https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=DE", success: function(result){
        let infizierte = result.locations["0"].latest.confirmed;
        let tote = result.locations["0"].latest.deaths;
        document.getElementById("infiz").innerHTML = infizierte;
        document.getElementById("tote").innerHTML = tote;


      }});

    reset();

    maxHist = ceil(width / 4);
    
   
  }
  
  function draw() {
    background('lightgrey');

 



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
