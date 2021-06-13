/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const BEGIN = 0;
const PLAY = 1;
const GAMEOVER = 2;
const bX = 200
const bY = 200
const JUMP = -6
const GRAVITY = 1.5
let spelStatus

var score = 0; // aantal behaalde punten

const cHeight = 400
const cWidth = 420
const grondHoogte = 40
const GAP = 100

let pilaren
let bird = {}
let gameImages
let pijpN
let pijpZ
let constant

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */
/**
 * set up de pilaren als plaatjes
 */
const setUpPilaren = () => {
  pijpN = gameImages.get(90, 506, 38, 250)
  pijpZ = gameImages.get(0, 506, 38, 250)
  constant = pijpN.height + GAP
}

var setupVogel = function (x, y) {
  const birdImg = gameImages.get(4, 767, 30, 19)
  bird['img'] = birdImg,
  bird['x'] = x,
  bird['y'] = y,
  bird['w'] = birdImg.width,
  bird['h'] = birdImg.height
};

var maakAfstandTussenPilaren = (num) => {
  var base = 100
  var distance = 250
  return base + distance * num
}

var berekenHoogte = (elements) => {
  if (elements) {
    const nh = Math.floor(Math.random() * pijpN.height) - pijpN.height
    const zh = nh + pijpN.height + constant
    return { nh, zh }
  }
  return { nh: 0, zh: pijpN.height + constant }
}

var makePillars = (groups = []) => {
  if (!groups.length || groups[groups.length - 1].s.x === 125) {
    const x = cWidth
    const { nh: y, zh } = berekenHoogte(groups.length)

    groups.push({
      n: { image: pijpN, x, y }, // w: pijpN.width, h: pijpN.height },
      s: { image: pijpZ, x, y: zh, w: pijpZ.width, h: pijpZ.height + cHeight },  //, w: pijpZ.width, h: pijpZ.height },
      x: cWidth,
      y 
    })
  }

  return groups.map((imageGroup) => {
    const x = imageGroup.s.x - 1

    return {
      n: { image: pijpN, x, y: imageGroup.n.y }, //w: imageGroup.n.w, h: imageGroup.n.h },
      s: { image: pijpZ, x, y: imageGroup.y + pijpN.height + GAP,  w: imageGroup.s.w, h: imageGroup.s.h },
      x: x,
      y: imageGroup.y
    }})
}

var tekenVeld = function (pilars = [], birdy) {
  background("#c3dbef");
  rect(0, height - 40, width, grondHoogte)
  fill("green")

  pilars.forEach((imageGroup) => {
    image(imageGroup.n.image, imageGroup.n.x, imageGroup.n.y), //imageGroup.n.w, imageGroup.n.h)
    image(imageGroup.s.image, imageGroup.s.x, imageGroup.s.y, imageGroup.s.w, imageGroup.s.h)
    if(checkGameOver(birdy, imageGroup)) {
      spelStatus = GAMEOVER
    }
  })
};

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */

/**
 * Beweegt de vogel een positief getal laat hem dalen een negatief laat hem stijgen
 * @param {number} direction
 */
var beweegVogel = function (direction) {
  bird.y = bird.y + direction
  image(bird.img, bird.x, bird.y, bird.w, bird.h)
};

/**
 * Zoekt uit of het spel is afgelopen
 * @param {object} birdy 
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function (birdy, pilar) {
  //if (pilar.n.x + pilar.n.w >= bX || !raaktGrond(birdy)) return false
  const ret = (raaktPilaarLinks(birdy, pilar) && isBinnenPilaar(birdy, pilar)) || raaktGrond(birdy)
  if (ret) {
    return (console.log("gameover"), ret)
  }
  return ret

};
const raaktPilaarLinks = (birdy, pilar) => {
  return birdy.x + birdy.w >= pilar.x && birdy.x <= pilar.x + pilar.s.w 
}

const isBinnenPilaar = (birdy, pilar) => {
  return birdy.y <= pilar.y + pijpN.height  || birdy.y + birdy.h >= pilar.y + constant
}

const raaktGrond = (birdy) => {
  return birdy.y + birdy.h >= cHeight - grondHoogte
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(cWidth, cHeight);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  gameImages = loadImage('assets/flappy_images.png')
  spelStatus = BEGIN
}

const reset = (cont) => {
  spelStatus = BEGIN
  if (!cont) noLoop()
}

/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case BEGIN:
      setUpPilaren()
      pilaren = makePillars()
      tekenVeld(pilaren, bird)
      setupVogel(bX, bY)
      spelStatus = PLAY
      break;
    case PLAY:
      pilaren = makePillars(pilaren)
      const collision = tekenVeld(pilaren, bird)
      if(keyIsPressed) {
        beweegVogel(JUMP)
      } else {
        beweegVogel(GRAVITY)
      }
      // if (collision) {
      //   spelStatus = GAMEOVER;
      // }
      break;
    case GAMEOVER:
        reset(confirm("Wil je opnieuw beginnen?"))
      break
  }
}
