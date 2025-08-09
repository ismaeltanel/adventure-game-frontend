import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  startGame(playerName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/game/start?playerName=${playerName}`, {});
  }

  movePlayer(playerId: number, direction: string): Observable<string>{
    return this.http.post(`${this.baseUrl}/game/${playerId}/move/${direction}`, {}, { responseType: 'text'});
  }
  
  getInventory(playerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/game/${playerId}/inventory`, {});
  }

  getLocationItems(locationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/game/location/${locationId}/items`);
  } 

  pickupItem(playerId: number, itemId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/game/${playerId}/pickup/${itemId}`, {}, { responseType: 'text' });
  }

  dropItem(playerId: number, itemId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/game/${playerId}/drop/${itemId}`, {}, { responseType: 'text' });
  }

  buyLight(playerId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/game/${playerId}/shop/buy`, {}, { responseType: 'text' });
  }

  resetGame(playerId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/game/${playerId}/reset`, {}, { responseType: 'text' });
  }

  getCurrentLocation(playerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/game/${playerId}/current/location`);
  }

}
