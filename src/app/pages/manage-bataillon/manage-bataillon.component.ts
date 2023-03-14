import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BataillonComponent } from 'src/app/dialog/bataillon/bataillon.component';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { UniteComponent } from 'src/app/dialog/unite/unite.component';
import { BataillonService } from 'src/app/services/bataillon.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UniteService } from 'src/app/services/unite.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-bataillon',
  templateUrl: './manage-bataillon.component.html',
  styleUrls: ['./manage-bataillon.component.scss']
})
export class ManageBataillonComponent implements OnInit{

  displayedColumns:string[]=['name','unite','edit'];;
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
    private uniteService: UniteService
    ) { }


  ngOnInit(): void {
    this.tableData();

  }


 async tableData(){
    return await this.bataillonService.getBataillons().subscribe((response:any)=>{
      console.log(response)
      this.dataSource =  new MatTableDataSource(response?.data);
      this.total = response?.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
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
   // dialogConfig.width="850px";
    const dialogRef = this.dialog.open(BataillonComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
      
    });

    const sub = dialogRef.componentInstance.onAddBataillon.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(BataillonComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditBataillon.subscribe((response)=>{
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
      this.deleteBataillon(value.id);
      dialogRef.close();
    })

  }
  
  deleteBataillon(id:any){
    this.bataillonService.delete(id).subscribe((response:any)=>{
      this.responseMessage = "Bataillon supprimé!";
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

  getUnites(){
    this.uniteService.getUnites().subscribe((response:any)=>{
      this.unites = response?.data;
      
   },(error:any)=>{
 
     if(error.error?.detail){
       this.responseMessage = error.error?.detail;

     }
     this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
   })

  }






}

