import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-equipement-info',
  templateUrl: './equipement-info.component.html',
  styleUrls: ['./equipement-info.component.scss']
})
export class EquipementInfoComponent implements OnInit{
  datas:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private dialogRef:MatDialogRef<EquipementInfoComponent>,

  ) { }

  ngOnInit() {
    this.datas= this.dialogData.data
    console.log(this.datas)

  }


}
