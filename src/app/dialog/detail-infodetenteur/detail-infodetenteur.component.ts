import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-detail-infodetenteur',
  templateUrl: './detail-infodetenteur.component.html',
  styleUrls: ['./detail-infodetenteur.component.scss']
})
export class DetailInfodetenteurComponent implements OnInit{
  datas:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private dialogRef:MatDialogRef<DetailInfodetenteurComponent>,

  private snackbarService:SnackbarService
  ) { }

  ngOnInit() {
    this.datas= this.dialogData.data
    console.log(this.datas)
  }
 
}
