import { Component, OnInit } from '@angular/core';
import { Player } from '../players/player';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
    plays: Player[];
    //plays: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlays();
  }
  
  getPlays(): void {
 
    this.playerService.getPlays().subscribe(plays => this.plays = plays.slice(1,3))
     console.log('getPlays slice  ' +this.plays);
  }

}
