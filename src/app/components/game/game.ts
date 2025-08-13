import { Component } from '@angular/core';
import { GameService } from '../../services/game-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  playerId: number | null = null;
  currentLocationId: number = 1;
  currentLocation: string = '';
  inventory: any[] = [];
  locationItems: any[] = [];
  gameStarted: boolean = false;

  constructor(private gameService: GameService) {}

  startGame(playerName: string) {
    this.gameService.startGame(playerName).subscribe(player => {
      this.playerId = player.id;
      this.gameStarted = true;
      this.currentLocation = 'You have entered the forest';
      this.loadInventory();
      this.loadLocationItems(1); 
    });
  }

  movePlayer(direction: string) {
    if (this.playerId) {
      this.gameService.movePlayer(this.playerId, direction).subscribe(response => {
        this.currentLocation = response;
        this.checkGameStatus(response);
        this.loadCurrentLocationItems();
        this.loadInventory();
      });
    }
  }

  loadInventory() {
    if (this.playerId) {
      this.gameService.getInventory(this.playerId).subscribe(items => {
        this.inventory = items;
      });
    }
  }

  loadLocationItems(locationId: number) {
    this.gameService.getLocationItems(locationId).subscribe(items => {
      this.locationItems = items;
    });
  }

  loadCurrentLocationItems() {
    if (this.playerId) {
      this.gameService.getCurrentLocation(this.playerId).subscribe(locationInfo => {
        this.currentLocationId = locationInfo.locationId;
        this.loadLocationItems(locationInfo.locationId);
      });
    }
  }

  pickupItem(itemId: number) {
    if (this.playerId) {
      this.gameService.pickupItem(this.playerId, itemId).subscribe(response => {
        console.log(response); 
        this.loadInventory(); 
        this.loadCurrentLocationItems();
      });
    }
  }

  dropItem(itemId: number) {
    if (this.playerId) {
      this.gameService.dropItem(this.playerId, itemId).subscribe(response => {
        console.log(response); 
        this.loadInventory(); 
        this.loadCurrentLocationItems();
      });
    }
  }

  buyLight() {
    if (this.playerId) {
      this.gameService.buyLight(this.playerId).subscribe(response => {
        console.log(response); 
        alert(response);
        this.loadInventory(); 
      });
    }
  }

  resetGame() {
    if (this.playerId) {
      this.gameService.resetGame(this.playerId).subscribe(response => {
        console.log(response); 
        this.currentLocation = 'You have entered the forest';
        this.loadInventory();
        this.loadCurrentLocationItems(); 
      });
    }
  }


  checkGameStatus(response: string) {
  console.log('Checking response:', response); 
    if (response.includes('died')) {
      alert('Game Over! ' + response);
      this.resetGame();
    } else if (response.includes('treasure')) {
      alert('You Won! ' + response);
      this.resetGame();
    }
  }
  
}
