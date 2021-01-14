// Design a Tic Tac Toe Game
// two players, 3x3 Game
// API:
//    move(0,1)
//   isWinner()

class TTT {
  // Note:  player defined as playerToken1 must be the first to play
  constructor (playerToken1, playerToken2) {
    this.matrix = [[], [], []]
    this.players = [playerToken1, playerToken2]
    this.playerCount = undefined
    this.playing = false
    this.winner = undefined
  }

  start () {
    this.resetBoard()
    this.playing = true
    this.playerCount = 0
    this.winner = 'none'
    this.player = this.players[this.playerCount]
  }

  // Board starts with all zeroes
  resetBoard () {
    this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  }

  // Make a move.  Throws an error if move is illegal or code is
  // called out of order
  move (player, row, col) {
    if (row > 2 || col > 2) {
      throw new Error('illegal move')
    }
    if (!this.playing) {
      throw new Error('sorry game is over or was never started')
    }
    if (this.players.indexOf(player) < 0) {
      throw new Error(`player ${player} is unknown`)
    }
    // console.log(`move(): player is ${player}, expected = ${this.getPlayer()}`)
    if (player !== this.getPlayer()) {
      throw new Error('player is out of order')
    }
    if (typeof this.matrix[row][col] === 'string') {
      throw new Error('space already occupied')
    }
    this.matrix[row][col] = player
    // console.log(`move(): ${JSON.stringify(this.matrix)}`)
    if (this.isWinner(player)) {
      this.playing = false
      this.winner = player
      console.log(`Player ${this.getPlayer()} won, game over!`)
    } else if (this.isDraw()) {
      this.playing = false
      console.log(`Players ${this.players[0]} and ${this.players[1]} have played to a draw`)
    }
    ++this.playerCount
  }

  // Return the current player (e.g. 'x', 'o')
  getPlayer () {
    return this.players[this.playerCount % 2]
  }

  // Detects if every cell is filled with marks by the two players
  isDraw () {
    return this.getRow(0).every(item => item !== 0) &&
            this.getRow(1).every(item => item !== 0) &&
            this.getRow(2).every(item => item !== 0)
  }

  // Returns true if player (string) has completed a win
  isWinner (player) {
    return this.getRow(0).every(item => item === player) ||
        this.getRow(1).every(item => item === player) ||
        this.getRow(2).every(item => item === player) ||
        this.getColumn(0).every(item => item === player) ||
        this.getColumn(1).every(item => item === player) ||
        this.getColumn(2).every(item => item === player) ||
        this.getDiag1().every(item => item === player) ||
        this.getDiag2().every(item => item === player) ||
        false
  }

  // Returns a single row (0, 1, or 2) of the matrix as an array
  getRow (row) {
    return this.matrix[row]
  }

  // Returns a single column (0, 1, or 2) of the matrix as an array
  getColumn (col) {
    return this.matrix.map((value, index) => value[col])
  }

  // Returns the top-left-to-lower-right diagonal as an array
  getDiag1 () {
    return [this.matrix[0][0], this.matrix[1][1],
      this.matrix[2][2]]
  }

  // Returns the top-right-to-lower-left diagonal as an array
  getDiag2 () {
    return [this.matrix[2][0], this.matrix[1][1],
      this.matrix[0][2]]
  }
}
module.exports = TTT
