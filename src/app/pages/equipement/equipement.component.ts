import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddEquipementComponent } from '../add-equipement/add-equipement.component';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.scss']
})
export class EquipementComponent  implements OnInit {
  displayedColumns:string[]=['numero','name','datefab','type','edit'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{};

  constructor(

    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }


  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }


  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:"Add"
    }
    dialogConfig.width="850px";
    const dialogRef = this.dialog.open(AddEquipementComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    // const sub = dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
    //       this.tableData();
    // })

  }

}
