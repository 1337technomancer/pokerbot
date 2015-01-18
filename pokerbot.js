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
String.prototype.contains = function(it) { return this.toLowerCase().indexOf(it.toLowerCase()) != -1; };


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

function Player(name) {
    this.name = name;
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
    this.pm = function(message) {
        pm(this.name, message);
    };
}

function Round() {
    this.area = [];
    this.pot = 0;
}

function Match() {
    this.round = null;
    this.roundcount = 1;
    this.players = [];
    this.start = function() {
        CLIENT.submit("A new match is about to start! Hurry and join!");
        CLIENT.submit("/?javascript:CLIENT.submit('!join');|Join!");
        this.players = getJoins();
        this.round = new Round();
        this.round.start();
    };
    this.nextRound = function() {
        if (roundcount <= 5) {
            roundcount++;
            this.round = new Round();
        } else {
            this.end();
        }
    };
    this.end = function() {
        CLIENT.submit("Match ended, prepare for another one...");
        game = new Match();
    };
    this.addPlayer = function(player) {
        players.push(player);
    };
    this.kickPlayer = function(player) {
        var index = players.indexOf(player);
        players = players.splice(index, 1);
    };
}

function sleep(seconds) {
    var request = new XMLHttpRequest();
    request.open("GET", 
                 "http://bruno02468.com/wait.php?time=" + seconds * 1e6,
                 false);
    request.send();
}

function pm(user, message) {
    CLIENT.submit("/pm " + user + "|" + message);
}

var joining = false;
var joiners = [];
function addJoin(user) {
    if (joining && !joiners.indexOf(user) > -1) {
        joiners.push(user);
    } else {
        pm(user, "#redCan't join at this time.");
    }
}
function allowJoins() {
    joining = true;
    joiners = [];
    setTimeout(function() {
        joining = false;
    }, waitForJoin*1000);
}
function getJoins() {
    allowJoins();
    sleep(waitForJoin);
    return joiners;
}

// Booting up and doing the stuff
CLIENT.submit("/login Dealer brunoisgod666");
CLIENT.submit("/flair $Montserrat|#7e0800/^Dealer");
CLIENT.submit("/font Monterrat");
CLIENT.submit("/color #81aa00");
CLIENT.submit("Pokerbot booted up and ready to go!");

var game = new Match();

//Handling user input
CLIENT.on('message', function(data) {
    var r = $('#messages').children().slice(-1)[0].outerHTML.search(/message (personal-message|general-message|error-message|note-message|system-message)/g);
    var text = data.message.trim();
    if (data.nick !== undefined)
    var name = data.nick;
    var trueMessage = parser.removeHTML(parser.parse(text));
    trueMessage = trueMessage.trim();
    argumentString = trueMessage.substring(trueMessage.indexOf(" ") + 1);
    arguments = argumentString.split(" ");
    
    if (name !== botnick) {
        
        //COMMAND HANDLERS
        if (text.contains("!join")) {
            addJoin(name);
        } else if (text.contains("!")) {
            
        } else if (text.contains("!")) {
            
        }
    }
}
