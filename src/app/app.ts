import { Component } from '@angular/core';
import { Game } from './components/game/game';

@Component({
  selector: 'app-root',
  imports: [Game],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'adventure-game';
}
