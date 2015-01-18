/*
 * Pokerbot
 *
 * Play Poker on Spooks!
 *
 * Coded by Bruno02468
 *
 * Licensed under the GNU GPLv3
 *
 */

// Configuration
var waitForPlay = 10;
var waitForAction = 15;
var initial = 1000;
var rounds = 5;

// Setting up objects and basic game variables

var suits = ["Spades", "Clubs", "Diamonds", "Hearts"];

function Card(number, suit) {
    this.number = number;
    this.suit = suit;
    this.sameSuit = function(card) {
        return (this.suit == card.suit);
    }
    this.isAbove = function(card) {
        return (this.number > card.number);
    }
}

function Deck() {
    this.cards = [];
    this.populate = function() {
        for (s in suits) {
            for (var n = 1; n <= 13; n++) {
                cards.push(new Card(n, suits[s]));
            }
        }
        cards.shu
    };
    this.addCard = function(card) {
        cards.push(card);
    };
    this.removeCard = function(card) {
        var index = cards.indexOf(card);
        cards = cards.splice(index, 1);
    };
    this.randomCard = function() {
        var c = cards[Math.floor(Math.random()*cards.length)];
        this.removeCard(c);
    };
}

function Player() {
    this.brunos = initial;
    this.wins = 0;
    this.losses = 0;
    this.hand = [];
    this.giveCards = function(a, b) {
        this.hand = [card, card];
    };
    this.add = function(n) {
        this.brunos += n;
    };
    this.subtract = function(n) {
        this.brunos -= n;
    };
}

function Round() {
    this.players = [];
    this.area = [];
    this.pot = 0;
    this.addPlayer = function(player) {
        players.push(player);
    };
    this.kickPlayer = function(player) {
        var index = players.indexOf(player);
        players = players.splice(index, 1);
    };
}


// Booting up and doing the stuff
CLIENT.submit("/login Dealer brunoisgod666");
CLIENT.submit("/flair $Montserrat|#7e0800/^Dealer");
CLIENT.submit("/font Monterrat");
CLIENT.submit("/color #81aa00");
CLIENT.submit("Pokerbot booted up and ready to go!");

