# Console Tic-Tac-Toe

## Install
1. npm i

## Test
1. npm test

## Manual Play
1. Open a Node REPL or browser console
2. Paste the contents of src/TTT/index.js minus the last line (`module.exports = TTT`)

A sample game:
```javascript
    // Create game with players x and o
	const ttt = new TTT('x', 'o')
	
	ttt.start()
	
 	ttt.move('x', 0, 0)
	ttt.move('o', 1, 0)
    ttt.move('x', 0, 1)
    ttt.move('o', 1, 1)
    ttt.move('x', 0, 2)
Player x won, game over!
```
