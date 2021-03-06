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
var waitForJoin = 15;
var waitForAction = 15;
var initial = 1000;
var rounds = 5;

// Setting up objects and basic game variables

var suits = ["Spades", "Clubs", "Diamonds", "Hearts"];

String.prototype.contains = function(it) { 
    return this.toLowerCase().indexOf(it.toLowerCase()) != -1; 
};


function Card(number, suit) {
    this.number = number;
    this.suit = suit;
    this.sameSuit = function(card) {
        return (this.suit == card.suit);
    };
    this.isAbove = function(card) {
        return (this.number > card.number);
    };
    this.toString = function() {
        var color = "#black";
        if (this.suit == "Hearts" || this.suit == "Diamonds") 
            color = "#red";
        var n = number;
        switch (this.number) {
            case 1:
                n = "Ace";
                break;
            case 11:
                n = "Jack";
                break;
            case 12:
                n = "Queen";
                break;
            case 13:
                n = "King";
                break;
        }
        return color + n + " of " + suit + "|";
    };
}

function Deck() {
    this.cards = [];
    this.populate = function() {
        for (s in suits) {
            for (var n = 1; n <= 13; n++) {
                this.cards.push(new Card(n, suits[s]));
            }
        }
    };
    this.addCard = function(card) {
        this.cards.push(card);
    };
    this.removeCard = function(card) {
        var index = this.cards.indexOf(card);
        this.cards = this.cards.splice(index, 1);
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

function Round(parent) {
    this.area = [];
    this.pot = 0;
    this.start = function() {
        send("A new round is starting! Cards are now being dealt!");
        var deck = new Deck();
        deck.populate();
        for (p in parent.players) {
            var player = parent.players[p];
            var nhand = [deck.randomCard(), deck.randomCard()];
            player.hand = nhand;
            var msg = "You've been dealt: " + nhand[0].toString();
            msg += " and " + nhand[1].toString() + ".";
            player.pm(msg);
        }
        send("End of round.");
    };
}

function Match() {
    this.round = null;
    this.roundcount = 1;
    this.players = [];
    this.start = function() {
        var m = "A new match is about to start! Hurry and ";
        send(m + mklink("!join", "join!"));
        var ps = getJoins();
        for (i in ps) {
            this.addPlayer(new Player(ps[i]));
        }
        this.round = new Round(this);
        this.round.start();
    };
    this.nextRound = function() {
        if (roundcount <= 5) {
            roundcount++;
            this.round = new Round(this);
            this.round.start();
        } else {
            this.end();
        }
    };
    this.end = function() {
        send("Match ended, prepare for another one...");
        game = new Match();
        game.start();
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
    send("/pm " + user + "|" + message);
}

function mklink(message, text) {
    var m = "/?javascript:CLIENT.submit(\"" + message + "\");|" + text;
    return mkpm(m + "|");
}

function mkpm(message) {
    return "/pm Dealer|" + message;
}

function send(message) {
    CLIENT.submit(message);
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
function getJoins() {
    joining = true;
    joiners = [];
    sleep(waitForJoin);
    joining = false;
    send("Joining period is over. New match starting!");
    return joiners;
}

// Booting up and doing the stuff
send("/login brunoisgod666 Dealer");
send("/flair $Montserrat|#7e0800/^Dealer");
send("/font Montserrat");
send("/style #81aa00");
send("/mute");
send("/safe");
send("Pokerbot coded by Bruno02468 booted up and ready to go!");

var game = new Match();
game.start();

//Handling user input
CLIENT.on('message', function(data) {
    var text = data.message.trim();
    if (data.nick !== undefined)
    var name = data.nick;
    var trueMessage = parser.removeHTML(parser.parse(text));
    trueMessage = trueMessage.trim();
    argumentString = trueMessage.substring(trueMessage.indexOf(" ") + 1);
    var argumentsArray = argumentString.split(" ");
    
    if (name !== "Dealer") {
        
        //COMMAND HANDLERS
        if (text.contains("!join")) {
            addJoin(name);
        } else if (text.contains("!leave")) {
            game.kickPlayer(name);
        } else if (text.contains("!")) {
            
        }
    }
});
