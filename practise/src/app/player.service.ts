import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './players/player';
import { PLAYERS } from './players/mock-players';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  team = 'Indian';

 player: Player = {
    id: 1,
    name: 'Sharma',
    image: ' '
 };
 private pUrl: string; //'getP';  // URL to web api
 private pIdUrl: string; //'getPId';  // URL to web api
 players = PLAYERS;
 selectedPlayer: Player;
 groupIds :any = [2];
 groups: any = this.players.filter(({id}) => this.groupIds.includes(id));
 play: Player[];

 constructor(
  private http: HttpClient,
  private messageService: MessageService
   ) { 
  this.pUrl = environment.APP_PLAY+'getP',
  this.pIdUrl = environment.APP_PLAY+'getPId',
    console.log(this.players)
    console.log(this.groupIds)
    console.log(this.groups)
    console.log(this.groups[0].id)
    console.log(this.selectedPlayer)
    if(this.groups[0].id == 2){
        console.log('Done')
    } else {
        console.log('Not Done')
    }
  }  

  //onSelect(p:Player):void{
    //this.selectedPlayer = p;
    //console.log('onSelect');
  //}
  
  getPlays(): Observable<Player[]>{
    //this.messageService.add('PlayerService: Fetched Players');
    //this.log('Fetched Players')
    //return of(PLAYERS);
    return this.http.get<Player[]>(this.pUrl)
    .pipe(
      tap(_ => console.log('Fetched Players')),
      catchError(this.handleError<Player[]>('getP', []))
    );
  }
  
   getPlay(id: number): Observable<Player>{
    //this.messageService.add(`PlayerService: Fetched Players id = ${id}`);
    //this.log(`Fetched Players id = ${id}`);
    //return of(PLAYERS.find(play => play.id === id));
    
    //const url = `${this.pIdUrl}?id=${id}`;
    const url = this.pIdUrl + '?id=' + id;
    return this.http.get<Player>(url).pipe(
    tap(_ => console.log(`Fetched Player id=${id}`)),
    catchError(this.handleError<Player>(`getP id=${id}`))
  );
  }
  
editP(player: Player): Observable<any> {
   const pUrl = environment.APP_PLAY+'editP'; //'editP';  // URL to web api
   const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
   // const body = JSON.stringify(player);// when json need to converted to string

   console.log(player);
   return this.http.post(pUrl, player ).pipe(
   tap(_=> console.log(`Updated Player id=${player.id}`)),
    catchError(this.handleError<Player>(`editP id=${player.id}`))
    );
    
  }
  
  saveP(player: Player): Observable<any> {
   const pUrl = environment.APP_PLAY+'saveP'; //'saveP';  // URL to web api
   const headers = new Headers({ 'Content-Type': 'application/json' });
   console.log(player);
   return this.http.post(pUrl, player ).pipe(
   tap(_=> console.log(`Saved Player id=${player.id}`)),
    catchError(this.handleError<Player>(`saveP id=${player.id}`))
    );
    
  }
  
  delP(id: number): Observable<any> {
    const pUrl = environment.APP_PLAY+'delP?id='+id; //'delP';  // URL to web api
    console.log(id);
    return this.http.get<Player>(pUrl).pipe(
    tap(_ => console.log(`Fetched Player id=${id}`)),
    catchError(this.handleError<Player>(`getP id=${id}`))
  );
  }
  
  /** Log a PlayerService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`PlayerService: ${message}`);
}


/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

 saveOS(form: FormData){
    const pUrl = environment.APP_PLAY+'editP'; 
    const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    console.log('Name:  '+form.get.name);
    return this.http.post(pUrl, form ).pipe(
    tap(_ => console.log(`Fetched Player id=${form}`)),
    catchError(this.handleError<Player>(`getP id=${form}`))
  );

}

}


