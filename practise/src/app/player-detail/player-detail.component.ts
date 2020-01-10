import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

import { PlayerService }  from '../player.service';
import { Player } from '../players/player';
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
@Input() player: Player;
res: Response;
url: any;
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.getPlay();
}

getPlay(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.playerService.getPlay(id)
    .subscribe(player => this.player = player);
}
  goBack(): void {
    this.location.back();
  }
  
  editP(player: Player): void {
    this.playerService.editP(this.player).subscribe(res => {
    console.log(this.res);
    //this.res = "HI...";
    console.log(this.res);
    //if(this.res==='Success')
      this.router.navigate(['/players']);
    });
    
  }
  
  delP(id: any): void {
    this.playerService.delP(id).subscribe(id => id = id);
    this.router.navigate(['/players']);
  }

  
onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
}
}
