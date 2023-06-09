// Define constants for board dimensions
const ROWS = 10;
const COLS = 10;
var player_hits_to_win = 17;
var computer_hits_to_win = 17;

// Define Ship class
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

// Define Board class
class Board {
  constructor() {
    this.ships = [];
    this.grid = [];

    for (let row = 0; row < ROWS; row++) {
      this.grid[row] = new Array(COLS).fill(null);
    }
  }

    addShip(ship, row, col, isVertical) {
      if (isVertical) {
          for (let i = 0; i < ship.length; i++) {
              if (row + i >= ROWS) {
                  return false; // Ship placement exceeds board limits
                }
                if (this.grid[row + i][col] !== null) {
                    return false; // Ship overlaps with another ship
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this.grid[row + i][col] = ship;
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                if (col + i >= COLS) {
                    return false; // Ship placement exceeds board limits
                }
                if (this.grid[row][col + i] !== null) {
                    return false; // Ship overlaps with another ship
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this.grid[row][col + i] = ship;
            }
        }
        
        this.ships.push(ship);
        return true;
    }
  
    receiveAttack(row, col) {
      const target = this.grid[row][col];
      if (target === null) {
          this.grid[row][col] = "miss";
          return "miss";
        } else if (target === "miss" || target === "hit") {
            return false;
        } else {
            return "hit";
        }
    }
}

// Define Game class
class Game {
  constructor() {
    this.playerBoard = new Board();
    this.computerBoard = new Board();
    this.isPlayerTurn = true;
    this.random_positions = true;
    this.playerDoubleShot = false;
    this.playerNucShot = false;
    this.ComputerDoubleShot = false;
    this.ComputerNucShot = false;
  }

    start() {
        
        player_hits_to_win = 17;
        computer_hits_to_win = 17;
        this.playerBoard = new Board();
        this.playerDoubleShot = false;
        this.playerNucShot = false;
        this.ComputerDoubleShot = true;
        this.ComputerNucShot = true;
        if(this.placePlayerShips()){
            this.placeComputerShips();
            this.renderPlayerBoard();
            this.renderComputerBoard();
            document.getElementById("double_shot_btn").disabled = false;
            document.getElementById("nuc_shot").disabled = false;

            return true
        }
        else{
            this.renderPlayerBoard();
            alert("Incorrect Placement")
            return false
        }
    }

  placePlayerShips() {
    const ship1 = new Ship("Carrier", 5);
    const ship2 = new Ship("Battleship", 4);
    const ship3 = new Ship("Destroyer", 3);
    const ship4 = new Ship("Submarine", 3);
    const ship5 = new Ship("Patrol Boat", 2);
    if(this.random_positions == false){
        const carrier_x = parseInt(document.getElementById("carrier-input-x").value);
        const carrier_y = parseInt(document.getElementById("carrier-input-y").value);
        const carrier_V = parseInt(document.getElementById("carrier-input-is-vertical").value);    
        
        const battleship_x = parseInt(document.getElementById("battleship-input-x").value);
        const battleship_y = parseInt(document.getElementById("battleship-input-y").value);
        const battleship_V = parseInt(document.getElementById("battleship-input-is-vertical").value);    
        
        const destroyer_x = parseInt(document.getElementById("destroyer-input-x").value);
        const destroyer_y = parseInt(document.getElementById("destroyer-input-y").value);
        const destroyer_V = parseInt(document.getElementById("destroyer-input-is-vertical").value);    
        
        const submarine_x = parseInt(document.getElementById("submarine-input-x").value);
        const submarine_y = parseInt(document.getElementById("submarine-input-y").value);
        const submarine_V = parseInt(document.getElementById("submarine-input-is-vertical").value);    
        
        const patrol_x = parseInt(document.getElementById("patrol-input-x").value);
        const patrol_y = parseInt(document.getElementById("patrol-input-y").value);
        const patrol_V = parseInt(document.getElementById("patrol-input-is-vertical").value);    
        
        
        return (this.playerBoard.addShip(ship1, carrier_x, carrier_y, carrier_V) && 
        this.playerBoard.addShip(ship2, battleship_x, battleship_y,battleship_V)&&
        this.playerBoard.addShip(ship3, destroyer_x, destroyer_y, destroyer_V) &&
        this.playerBoard.addShip(ship4, submarine_x, submarine_y, submarine_V) &&
        this.playerBoard.addShip(ship5, patrol_x, patrol_y, patrol_V));
    }else{
        while(!this.playerBoard.addShip(ship1, Math.floor((Math.random() * 5)), Math.floor((Math.random() * 5)), Math.floor((Math.random() * 2))));

        while(!this.playerBoard.addShip(ship2, Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 2))));

        while(!this.playerBoard.addShip(ship3, Math.floor((Math.random() * 7)), Math.floor((Math.random() * 7)), Math.floor((Math.random() * 2))));

        while(!this.playerBoard.addShip(ship4, Math.floor((Math.random() * 7)), Math.floor((Math.random() * 7)), Math.floor((Math.random() * 2))));
        
        while(!this.playerBoard.addShip(ship5, Math.floor((Math.random() * 8)), Math.floor((Math.random() * 8)), Math.floor((Math.random() * 2))));
        return true;
    }
}

    placeComputerShips() {
        const ship1 = new Ship("Carrier", 5);
        while(!this.computerBoard.addShip(ship1, Math.floor((Math.random() * 5)), Math.floor((Math.random() * 5)), Math.floor((Math.random() * 2))));

        const ship2 = new Ship("Battleship", 4);
        while(!this.computerBoard.addShip(ship2, Math.floor((Math.random() * 6)), Math.floor((Math.random() * 6)), Math.floor((Math.random() * 2))));

        const ship3 = new Ship("Destroyer", 3);
        while(!this.computerBoard.addShip(ship3, Math.floor((Math.random() * 7)), Math.floor((Math.random() * 7)), Math.floor((Math.random() * 2))));

        const ship4 = new Ship("Submarine", 3);
        while(!this.computerBoard.addShip(ship4, Math.floor((Math.random() * 7)), Math.floor((Math.random() * 7)), Math.floor((Math.random() * 2))));
        
        const ship5 = new Ship("Patrol Boat", 2);
        while(!this.computerBoard.addShip(ship5, Math.floor((Math.random() * 8)), Math.floor((Math.random() * 8)), Math.floor((Math.random() * 2))));

    }

    renderPlayerBoard() {
        const playerBoardElement = document.getElementById("player-board");
        playerBoardElement.innerHTML = "";
    
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
    
                const result = this.playerBoard.grid[row][col];

                if (result === null) {
                    cell.classList.add("empty");
                } else if (result == "miss") {
                    cell.classList.add("miss");
                } else if (result == "hit") {
                    cell.classList.add("hit");
                } else {
                    cell.classList.add("ship");
                }
    
                playerBoardElement.appendChild(cell);
            }
        }
    }
    
    renderComputerBoard() {
        const computerBoardElement = document.getElementById("computer-board");
        computerBoardElement.innerHTML = "";
    
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
    
                const result = this.computerBoard.grid[row][col];
                if (result == null) {
                    cell.classList.add("empty");
                } else if (result == "miss") {
                    cell.classList.add("miss");
                } else if (result == "hit") {
                    cell.classList.add("hit");
                } else {
                    cell.classList.add("empty");
                }
    
                if (this.isPlayerTurn) {
                    cell.addEventListener("click", () => this.handlePlayerTurn(row, col));
                }

                computerBoardElement.appendChild(cell);
            }
        }
    }
    

    async handlePlayerTurn(row, col) {
        const result = this.computerBoard.receiveAttack(row, col);
        
        if (result === "miss") {
            this.isPlayerTurn = false;
            this.renderPlayerBoard();
            this.renderComputerBoard();
            await delay(500);
            if(this.playerNucShot == true){
                this.playerNucShot = false;
                this.isPlayerTurn = true;
                document.getElementById("nuc_shot").disabled = true;
                document.getElementById("nuc_shot").style.background = "none"
                if(this.computerBoard.receiveAttack(row -1, col -1) == "hit"){
                    this.computerBoard.grid[row-1][col-1] ="hit";
                    if (--player_hits_to_win == 0) {
                        this.handleGameOver(true);
                    }
                }
                if(this.computerBoard.receiveAttack(row -1, col +1) == "hit"){
                    this.computerBoard.grid[row-1][col+1] ="hit";
                    if (--player_hits_to_win == 0) {
                        this.handleGameOver(true);
                    }
                }
                if(this.computerBoard.receiveAttack(row +1, col +1) == "hit"){
                    this.computerBoard.grid[row+1][col+1] ="hit";
                    if (--player_hits_to_win == 0) {
                        this.handleGameOver(true);
                    }
                }
                if(this.computerBoard.receiveAttack(row +1, col -1) == "hit"){
                    this.computerBoard.grid[row+1][col-1] ="hit";
                    if (--player_hits_to_win == 0) {
                        this.handleGameOver(true);
                    }
                }
                this.isPlayerTurn = false;

                this.handleComputerTurn();

            }
            else if(this.playerDoubleShot == true){
                this.playerDoubleShot = false;
                document.getElementById("double_shot_btn").disabled = true;
                document.getElementById("double_shot_btn").style.background = "none"
                this.isPlayerTurn = true;
                this.handlePlayerTurn(row, col);
                this.renderComputerBoard();

            }else{

                this.handleComputerTurn();
            }
        } else if (result === "hit") {
            this.computerBoard.grid[row][col] ="hit"
            this.renderPlayerBoard();
            this.renderComputerBoard();
            await delay(500);
            if (--player_hits_to_win == 0) {
                this.handleGameOver(true);
            } else {
                this.handlePlayerTurn(row, col);
            }
        }
    }

    async handleComputerTurn() {
        const randomRow = Math.floor(Math.random() * ROWS);
        const randomCol = Math.floor(Math.random() * COLS);
        

        const result = this.playerBoard.receiveAttack(randomRow, randomCol);

        if (result === "miss") {
            if(this.ComputerNucShot == true && Math.random() < 0.1){
                this.ComputerNucShot = false;
                if(this.playerBoard.receiveAttack(randomRow -1, randomCol -1) == "hit"){
                    this.playerBoard.grid[randomRow-1][randomCol-1] ="hit";
                    if (--computer_hits_to_win == 0) {
                        this.handleGameOver(false);
                    }
                }
                if(this.playerBoard.receiveAttack(randomRow -1, randomCol +1) == "hit"){
                    this.playerBoard.grid[randomRow-1][randomCol+1] ="hit";
                    if (--computer_hits_to_win == 0) {
                        this.handleGameOver(false);
                    }
                }
                if(this.playerBoard.receiveAttack(randomRow +1, randomCol +1) == "hit"){
                    this.playerBoard.grid[randomRow+1][randomCol+1] ="hit";
                    if (--computer_hits_to_win == 0) {
                        this.handleGameOver(false);
                    }
                }
                if(this.playerBoard.receiveAttack(randomRow +1, randomCol -1) == "hit"){
                    this.playerBoard.grid[randomRow+1][randomCol-1] ="hit";
                    if (--computer_hits_to_win == 0) {
                        this.handleGameOver(false);
                    }
                }
                this.isPlayerTurn = true;

            } else if(this.ComputerDoubleShot == true && Math.random() < 0.2){
                this.ComputerDoubleShot = false;
                this.handleComputerTurn();
            }else{
                this.isPlayerTurn = true;
            }
            this.renderPlayerBoard();
            this.renderComputerBoard();
        } else if (result === "hit") {
            this.playerBoard.grid[randomRow][randomCol] ="hit"
            this.renderPlayerBoard();
            this.renderComputerBoard();
            if (--computer_hits_to_win == 0) {
                this.handleGameOver(false);
            } else {
                await delay(500);
                this.handleComputerTurn();
            }
        } else {
            this.handleComputerTurn();
        }
        
        await delay(500);
    }
    
    handleGameOver(playerWins) {
        if (playerWins) {
            alert("Congratulations! You win!");
            
        } else {
            alert("Game over! You lose!");
        }
        const game = new Game();
        game.random_positions = true;
        document.getElementById("double_shot_btn").addEventListener("click", function() {
            game.playerDoubleShot = !game.playerDoubleShot;
            if(game.playerDoubleShot){
                document.getElementById("double_shot_btn").style.background = "red"
            }else{
                document.getElementById("double_shot_btn").style.background = "none"
            }
        });
        document.getElementById("nuc_shot").addEventListener("click", function() {
            game.playerNucShot = !game.playerNucShot;
            if(game.playerNucShot){
                document.getElementById("nuc_shot").style.background = "red"
            }else{
                document.getElementById("nuc_shot").style.background = "none"
            }
        });
        game.start();
    }


}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.getElementById("ship-placement-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const game = new Game();
    game.random_positions = false;
    if(game.start()){
        document.getElementById("double_shot_btn").addEventListener("click", function() {
            game.playerDoubleShot = !game.playerDoubleShot;
            if(game.playerDoubleShot){
                document.getElementById("double_shot_btn").style.background = "red"
            }else{
                document.getElementById("double_shot_btn").style.background = "none"
            }
        });
        document.getElementById("nuc_shot").addEventListener("click", function() {
            game.playerNucShot = !game.playerNucShot;
            if(game.playerNucShot){
                document.getElementById("nuc_shot").style.background = "red"
            }else{
                document.getElementById("nuc_shot").style.background = "none"
            }
        });
        document.getElementById("ship-placement-form").style.display = "none";
        document.getElementById("restart_game").style.display = "block";
        document.getElementById("computer-board").style.display = "flex";
        document.getElementById("power_btns").style.display = "block";
    }
    document.getElementById("player-board").style.display = "flex";
});

document.getElementById("restart_game").addEventListener("click", function() {
    
    document.getElementById("player-board").style.display = "none";
    document.getElementById("computer-board").style.display = "none";
    document.getElementById("power_btns").style.display = "none";

    
    document.getElementById("ship-placement-form").style.display = "block";
    document.getElementById("restart_game").style.display = "none";

});


document.getElementById("random_player_ships").addEventListener("click", function() {
    
    const game = new Game();
    game.random_positions = true;
    document.getElementById("double_shot_btn").addEventListener("click", function() {
        game.playerDoubleShot = !game.playerDoubleShot;
        if(game.playerDoubleShot){
            document.getElementById("double_shot_btn").style.background = "red"
        }else{
            document.getElementById("double_shot_btn").style.background = "none"
        }
    });
    document.getElementById("nuc_shot").addEventListener("click", function() {
        game.playerNucShot = !game.playerNucShot;
        if(game.playerNucShot){
            document.getElementById("nuc_shot").style.background = "red"
        }else{
            document.getElementById("nuc_shot").style.background = "none"
        }
    });
    game.start()
    document.getElementById("ship-placement-form").style.display = "none";
    document.getElementById("restart_game").style.display = "block";
    document.getElementById("computer-board").style.display = "flex";
    document.getElementById("power_btns").style.display = "block";
    document.getElementById("player-board").style.display = "flex";

});