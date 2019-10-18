import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import {  FormGroup, FormControl } from '@angular/forms';

import { PlayerService }  from '../player.service';
import { Player } from '../players/player';
@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });
@Input() player: Player;
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  saveP(): void {
    this.playerService.saveP(this.playerForm.value).subscribe(player => this.playerForm = player);
    this.router.navigate(['/players']);
  }

}
