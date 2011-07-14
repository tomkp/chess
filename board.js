var board = function() {

    var spaces =
        [
            ['R','N','B','Q','K','B','N','R'],
            ['P','P','P','P','P','P','P','P'],
            [' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' '],
            ['p','p','p','p','p','p','p','p'],
            ['r','n','b','q','k','b','n','r']
        ];


    var display = function() {
        var rows = spaces.map(function(columns) {
            return columns.join(" ");
        });
        return rows.join('\n');
    };


    var locate = function(notation) {
        console.info("locate", notation);
        var y = "abcefghij".indexOf(notation.charAt(0));
        var x = 8 - parseInt(notation.charAt(1));
        return spaces[x][y];
    };

    var move = function(from, to) {
        console.info("move", from, to, locate(from), locate(to));
    };


    return {
        display: display,
        move: move
    }
};


var b = board();
console.info(b.display());


var game = "1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. c4 Nc6 6. Nc3 Nf6 7. 0-0 g6 8. d4 cxd4 9. Nxd4 Bg7 10. Nde2 Qe6 11. Nd5 Qxe4 12. Nc7+ Kd7 13. Nxa8 Qxc4 14. Nb6+ axb6 15. Nc3 Ra8 16. a4 Ne4 17. Nxe4 Qxe4 18. Qb3 f5 19. Bg5 Qb4 20. Qf7 Be5 21. h3 Rxa4 22. Rxa4 Qxa4 23. Qxh7 Bxb2 24. Qxg6 Qe4 25. Qf7 Bd4 26. Qb3 f4 27. Qf7 Be5 28. h4 b5 29. h5 Qc4 30. Qf5+ Qe6 31. Qxe6+ Kxe6 32. g3 fxg3 33. fxg3 b4 34. Bf4 Bd4+ 35. Kh1 b3 36. g4 Kd5 37. g5 e6 38. h6 Ne7 39. Rd1 e5 40. Be3 Kc4 41. Bxd4 exd4 42. Kg2 b2 43. Kf3 Kc3 44. h7 Ng6 45. Ke4 Kc2 46. Rh1 d3 47. Kf5 b1=Q 48. Rxb1 Kxb1 49. Kxg6 d2 50. h8=Q d1=Q 51. Qh7 b5 52. Kf6+ Kb2 53. Qh2+ Ka1 54. Qf4 b4 55. Qxb4 Qf3+ 56. Kg7 d5 57. Qd4+ Kb1 58. g6 Qe4 59. Qg1+ Kb2 60. Qf2+ Kc1 61. Kf6 d4 62. g7 1-0";

//var game = "1. e4 e5 2. Nf3 Nc6 3. Bb5 {This opening is called the Ruy Lopez.} 3... a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8  10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2";

var pieces = {
    "B":"bishop",
    "N":"knight",
    "K":"king",
    "Q":"queen",
    "R":"rook"
};




var i = 0;

game = game.replace(/ \{[a-zA-Z \.]+\}/, "");
game = game.replace(/ [0-9]+\.\.\./, "");


var check = function(move) {
    return /\+$/.test(move)?" (check)":"";
};

var z = game.replace(/[0-9]*\. [a-zA-Z0-9\+=-]+[ ]+[a-zA-Z0-9\+-]+/g, function(move) {
    var steps = move.split(/\s/);
    var whiteMove = steps[1];
    var blackMove = steps[2];
    console.info(steps[0], whiteMove, blackMove);

    var moves = [
        {
            rule: function(move) {
                if (/^[a-h][1-8]\+?$/.test(move)) {
                    return "moves pawn to " + move + check(move);
                }
            }
        },
        {
            rule: function(move) {
                if (/^[KQRNB][a-h][1-8]\+?$/.test(move)) {
                    return "moves " + pieces[move.substr(0,1)] + " to " + move.substr(1,2) + check(move);
                }
            }
        },
        {
            rule: function(move) {
                if (/^[KQRNB]x[a-h][1-8]\+?$/.test(move)) {
                    return pieces[move.substr(0,1)] + " captures " + move.substr(2,2) + check(move);
                }
            }
        },
        {
            rule: function(move) {
                if (/^[a-h][1-8]=[KQRNB]\+?$/.test(move)) {
                    return move.substr(0,2) + " promoted to " + pieces[move.substr(3,1)] + check(move);
                }
            }
        },
        {
            rule: function(move) {
                if (/^(0-0)|(O-O)$/.test(move)) {
                    return "castles kingside";
                }
            }
        },
        {
            rule: function(move) {
                if (/^(0-0-0)|(O-O-O)$/.test(move)) {
                    return "castles queenside";
                }
            }
        },
        {
            rule: function(move) {
                if (/^[a-h]x[a-h][1-8]\+?$/.test(move)) {
                    return move.substr(0,1) + " file pawn captures " + move.substr(2,2) + check(move);
                }
            }
        },
        {
            rule: function(move) {
                if (/^[KQRNB][a-h][a-h][1-8]\+?$/.test(move)) {
                    return pieces[move.substr(0,1)] + " on " + move.substr(1,1) + " file moves to " + move.substr(2,2)  + check(move);
                }
            }
        }
    ];

    for (var j = 1; j <= 2; j++) {
        moves.forEach(function(x) {
            var ww = x.rule(steps[j]);
            if (ww) {
                console.info("\t", (j===1?"white":"black") + " " + ww);
            }
        });
    }


});
