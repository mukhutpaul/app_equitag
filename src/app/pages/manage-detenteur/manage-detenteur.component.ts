import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonComponent } from 'src/app/dialog/bataillon/bataillon.component';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { DetailDetenteurComponent } from 'src/app/dialog/detail-detenteur/detail-detenteur.component';
import { DetenteursComponent } from 'src/app/dialog/detenteurs/detenteurs.component';
import { UniteComponent } from 'src/app/dialog/unite/unite.component';
import { BataillonService } from 'src/app/services/bataillon.service';
import { DetenteurService } from 'src/app/services/detenteur.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UniteService } from 'src/app/services/unite.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { DetailInfodetenteurComponent } from '../../dialog/detail-infodetenteur/detail-infodetenteur.component';


@Component({
  selector: 'app-manage-detenteur',
  templateUrl: './manage-detenteur.component.html',
  styleUrls: ['./manage-detenteur.component.scss']
})
export class ManageDetenteurComponent  implements OnInit{

  displayedColumns:string[]=['name','firstname','lastname','grade','unite','categorie','edit'];
  dataSource:any;
  responseMessage:any;
  total:any;
  unites:any=[];

  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{};

  constructor(

    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private bataillonService:BataillonService,
    private detService: DetenteurService,
    private ngxService : NgxUiLoaderService
    ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();

  }


 async tableData(){
    return await this.detService.getDetenteurs().subscribe((response:any)=>{
      console.log(response)
      this.ngxService.stop();
      this.dataSource =  new MatTableDataSource(response?.data);
      this.total = response?.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },(error)=>{
   
      if(error.error?.message){
        this.ngxService.stop()
        this.responseMessage = error.error?.Message;
      }
      else{
        this.ngxService.stop()
        this.responseMessage = GlobalConstants.genericError;
      }
      this.ngxService.stop()
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })


  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  handleViewAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      data:values
    }
    dialogConfig.width="850px";
    const dialogRef = this.dialog.open(DetailDetenteurComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
  }
  
  handleViewActions(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      data:values
    }
    dialogConfig.width="850px";
    const dialogRef = this.dialog.open(DetailInfodetenteurComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
  }

  
  // signupAction(){
  //   const dialogConfig = new MatDialogConfig();
  //   //dialogConfig.width ="450px";
  //   this.dialog.open(SignupComponent,dialogConfig);
  // }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:"Ajout"
    }
    dialogConfig.width="850px";
    const dialogRef = this.dialog.open(DetenteursComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
      
    });

    const sub = dialogRef.componentInstance.onAddDet.subscribe((response)=>{
          this.tableData();
    })

  }



  handleEditAction(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:"Modification",
      data:values
    }
    //dialogConfig.width="850px";
    const dialogRef = this.dialog.open(DetenteursComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditDet.subscribe((response)=>{
         this.tableData();
    })

  }

  handleDeleteAction(value:any){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data ={
      message:'delete '+value.name
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      this.delete(value.id);
      dialogRef.close();
    })

  }
  
  
  
  delete(id:any){
    this.detService.delete(id).subscribe((response:any)=>{
      this.responseMessage = "Détenteur supprimé!";
      this.tableData();
      this.snackbarService.openSnackBar(this.responseMessage,"success");
   },(error:any)=>{ 
    console.log(error);
     if(error.error?.detail){
       this.responseMessage = error.error?.detail;
     }else{
      this.responseMessage = GlobalConstants.genericError;
     }
     this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
   })
  }

 

  }

