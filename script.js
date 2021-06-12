/// @ts-check
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

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten

let bird
let birdUp
let birdDown
let brgImg
let gameImages





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

function preLoad() {
}
var berekenHoogte = (pipeImage) => {
  return pipeImage.height
}
var maakAfstandTussenPilaren = (num) => {
  var base = 100
  var distance = 250
  return base + distance * num
}
var makePillars = () => {

  var pijpN = gameImages.get(89, 506, 38, 250)
  var pijpZ = gameImages.get(0, 506, 38, 250)
  var groups = []

  for (let i = 0; i < 10; i++){
    var height = berekenHoogte(pijpN)
    var berekendeHoogte = height * i
    var x = maakAfstandTussenPilaren(i)
    groups.push({
      s: {image: pijpZ, x, y: pijpN.height + 150, w: pijpZ.width,
      h: pijpZ.height *2
      },
      n: {image: pijpN, x, y:0, w: pijpN.width, h: berekendeHoogte}
    })
  }
  return groups
}
/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  rect(0, height - 40, width, 40)
  fill("green")
  makePillars().forEach((imageGroup) => {
  image(imageGroup.s.image, imageGroup.s.x, imageGroup.s.y, imageGroup.s.w, imageGroup.s.h)
  image(imageGroup.n.image, imageGroup.n.x, imageGroup.n.y, imageGroup.n.w, imageGroup.n.h)
})
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function (x, y) {


};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function (x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVogel = function (x, y) {
  
  };


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function () {

};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function () {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegVogel = function () {

};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function () {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function () {

  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function () {

  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(420, 920);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("#c3dbef");

  gameImages = loadImage('assets/flappy_images.png')

}
1

/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  /*
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegVogel();

      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }

      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenVogel(spelerX, spelerY);


      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
  */
  tekenVeld()
  tekenVogel()
}
