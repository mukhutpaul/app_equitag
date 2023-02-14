import { Component } from '@angular/core';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.scss']
})
export class EquipementComponent {
  displayedColumns:string[]=['numero','name','datefab','type','edit'];
  dataSource:any;

}
