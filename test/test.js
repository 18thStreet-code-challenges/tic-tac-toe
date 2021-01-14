const assert = require('chai').assert
var TTT = require('../src/TTT')
describe('Tic Tac Toe', function() {
    describe('Error play cases', function() {
        let ttt
        beforeEach(() => {
            ttt = new TTT('x', 'o')
        })
        it('should instantiate the TTT object', function () {
            assert.equal(typeof ttt, 'object');
        });
        it('starting a game should set class instance variables', function () {
            ttt.start()
            assert.equal(ttt.getPlayer(), 'x')
            assert.equal(ttt.playerCount, 0)
            assert.equal(ttt.playing, true)
        });
        it('unrecognized players should not be allowed', () => {
            ttt.start()
            assert.throws(() => {
                ttt.move('q', 0, 0)
            })
        })
        it('Players cannot start until game begins', function () {
            assert.throws(() => {
                ttt.move('x', 0, 0)
            })
        });
        it('Arguments must be in 0-2 range', function () {
            ttt.start()
            assert.throws(() => {
                ttt.move('x', 3, 3)
            })
        });
        it('Player should take their turn', function () {
            ttt.start()
            assert.throws(() => {
                ttt.move('x', 0, 0)
                ttt.move('x', 1, 0)
            })
        });
        it('First player defined in constructor must go first', function () {
            ttt.start()
            assert.throws(() => {
                ttt.move('o', 0, 0)
            })
        });

        it('Player cannot mark an occupied square', function () {
            ttt.start()
            assert.throws(() => {
                ttt.move('x', 0, 0)
                ttt.move('o', 0, 0)
            })
        });
    })
    describe('Legal play cases', () => {
        let ttt
        beforeEach(() => {
            ttt = new TTT('x', 'o')
        })
        it('Opening move should succeed', function () {
            ttt.start()
            assert.doesNotThrow(() => ttt.move('x', 0, 0))
        });
        it('Game may be restarted', function () {
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 0)
                ttt.start()
                ttt.move('x', 0, 0)
            })
            assert.equal(ttt.winner, 'none')
            assert.equal(ttt.playing, true)
        });
        it('Horizontal win should be detected', function () {
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 0)
                ttt.move('o', 1, 0)
                ttt.move('x', 0, 1)
                ttt.move('o', 2, 1)
                ttt.move('x', 0, 2)
            })
            assert.equal(ttt.winner, 'x')
            assert.equal(ttt.playing, false)
        });
        it('Vertical win should be detected', function () {
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 0)
                ttt.move('o', 0, 1)
                ttt.move('x', 1, 0)
                ttt.move('o', 1, 2)
                ttt.move('x', 2, 0)
            })
            assert.equal(ttt.winner, 'x')
            assert.equal(ttt.playing, false)
        });
        it('Win without restart prevents further play', function () {
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 0)
                ttt.move('o', 0, 1)
                ttt.move('x', 1, 0)
                ttt.move('o', 1, 2)
                ttt.move('x', 2, 0)
            })
            assert.throws(() => {
                ttt.move('x', 0, 0)
            })
        });
        it('Diagonal wins should be detected', function () {
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 0)
                ttt.move('o', 0, 1)
                ttt.move('x', 1, 1)
                ttt.move('o', 1, 2)
                ttt.move('x', 2, 2)
            })
            assert.equal(ttt.winner, 'x')
            assert.equal(ttt.playing, false)
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 2)
                ttt.move('o', 0, 1)
                ttt.move('x', 1, 1)
                ttt.move('o', 1, 2)
                ttt.move('x', 2, 0)
            })
            assert.equal(ttt.winner, 'x')
            assert.equal(ttt.playing, false)
        });
        it('Playing to a draw should be detected', function () {
            ttt.start()
            assert.doesNotThrow(() => {
                ttt.move('x', 0, 1)
                ttt.move('o', 0, 0)
                ttt.move('x', 1, 0)
                ttt.move('o', 0, 2)
                ttt.move('x', 1, 2)
                ttt.move('o', 1, 1)
                ttt.move('x', 2, 0)
                ttt.move('o', 2, 1)
                ttt.move('x', 2, 2)
            })
            assert.equal(ttt.winner, 'none')
            assert.equal(ttt.playing, false)
        });
    })
});
