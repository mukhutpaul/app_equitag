import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetenteurService } from 'src/app/services/detenteur.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-detail-detenteur',
  templateUrl: './detail-detenteur.component.html',
  styleUrls: ['./detail-detenteur.component.scss']
})
export class DetailDetenteurComponent implements OnInit {
  displayedColumns:string[]=['name','numero_serie','type'];
  dataSource:any;
  responseMessage:any;
  data:any;
  datas:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private dialogRef:MatDialogRef<DetailDetenteurComponent>,
  private detService: DetenteurService,
  private snackbarService:SnackbarService
  ) { }

  ngOnInit() {
    this.datas= this.dialogData.data
    console.log(this.datas)

    this.tableData()
  }

  async tableData(){
    this.data = this.dialogData.data.id;
    return await this.detService.detailsdet(this.data).subscribe((response:any)=>{
      console.log(response)
      this.dataSource =  new MatTableDataSource(response?.data);
     
    },(error)=>{
   
      if(error.error?.message){
       
        this.responseMessage = error.error?.Message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })


  }
}
