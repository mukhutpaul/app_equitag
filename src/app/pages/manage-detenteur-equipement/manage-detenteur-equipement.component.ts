import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonComponent } from 'src/app/dialog/bataillon/bataillon.component';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { DetenteurEquipementComponent } from 'src/app/dialog/detenteur-equipement/detenteur-equipement.component';
import { EquipementagsComponent } from 'src/app/dialog/equipementags/equipementags.component';
import { UniteComponent } from 'src/app/dialog/unite/unite.component';
import { BataillonService } from 'src/app/services/bataillon.service';
import { DetenteurEquipementService } from 'src/app/services/detenteur-equipement.service';
import { EquipementagsService } from 'src/app/services/equipementags.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UniteService } from 'src/app/services/unite.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-detenteur-equipement',
  templateUrl: './manage-detenteur-equipement.component.html',
  styleUrls: ['./manage-detenteur-equipement.component.scss']
})
export class  ManageDetenteurEquipementComponent implements OnInit{

  displayedColumns:string[]=['holder','equipment','minution','edit'];;
  dataSource:any;
  responseMessage:any;
  total:any;

  
 
  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{};

  constructor(

    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private eqDetService:DetenteurEquipementService,
    private uniteService: UniteService,
    private ngxService : NgxUiLoaderService
    ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();

  }


 async tableData(){
    return await this.eqDetService.get().subscribe((response:any)=>{
      console.log(response)
      this.ngxService.stop();
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
    const dialogRef = this.dialog.open(DetenteurEquipementComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
      
    });

    const sub = dialogRef.componentInstance.onAddEqdet.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(DetenteurEquipementComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditEqdet.subscribe((response)=>{
         this.tableData();
    })

  }

  handleDeleteAction(value:any){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data ={
      message:'delete detenteur '+value.holder.name+' and '+'equipment '+value.equipment.name
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      this.delete(value.id);
      dialogRef.close();
    })

  }
  
  delete(id:any){
    this.eqDetService.delete(id).subscribe((response:any)=>{
      this.responseMessage = "suppression effectuée!";
      this.tableData();
      this.snackbarService.openSnackBar(this.responseMessage,"success");
   },(error:any)=>{ 
    console.log(error);
     if(error.error?.detail){
       this.ngxService.stop()
       this.responseMessage = error.error?.detail;
     }else{
      this.responseMessage = GlobalConstants.genericError;
     }
     this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
   })
  }









}


