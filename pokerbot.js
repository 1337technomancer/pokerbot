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
    function sameSuit(card) {
        return (this.suit == card.suit);
    }
    function isAbove(card) {
        return (this.number > card.number);
    }
}

function Deck() {
    this.cards = [];
    function populate() {
        for (s in suits) {
            for (var n = 1; n <= 13) {
                cards.push(new Card(n, suits[s]));
            }
        }
    }
    function addCard(card) {
        cards.push(card);
    }
    function randomCard() {
        return cards[Math.floor(Math.random()*cards.length)];
    }
}

function Player() {
    this.brunos = initial;
    this.wins = 0;
    this.losses = 0;
    this.hand = [];
    function giveCards(a, b) {
        this.hand = [card, card];
    }
    function add(n) {
        this.brunos += n;
    }
    function subtract(n) {
        this.brunos -= n;
    }
}

function Table() {
    this.players = [];
    this.area = [];
    this.pot = 0;
    function addPlayer(player) {
        players.push(player);
    }
    function kickPlayer(player) {
        var index = players.indexOf(player);
        players = players.splice(index, 1);
    }
}
