import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategorieComponent } from 'src/app/dialog/categorie/categorie.component';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { TypeComponent } from 'src/app/dialog/type/type.component';
import { UniteComponent } from 'src/app/dialog/unite/unite.component';
import { CategorieService } from 'src/app/services/categorie.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TypeService } from 'src/app/services/type.service';
import { UniteService } from 'src/app/services/unite.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-type',
  templateUrl: './manage-type.component.html',
  styleUrls: ['./manage-type.component.scss']
})
export class ManageTypeComponent implements OnInit{

  displayedColumns:string[]=['name','edit'];;
  dataSource:any;
  responseMessage:any;
  total:any;
  
 
  @ViewChild(MatPaginator) paginator: MatPaginator  = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort  = <MatSort>{};

  constructor(

    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private typeService:TypeService,
    ) { }


  ngOnInit(): void {
    this.tableData();

  }


 async tableData(){
    return await this.typeService.getTypes().subscribe((response:any)=>{
      console.log(response)
      this.dataSource =  new MatTableDataSource(response?.data);
      this.total = response?.total;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },(error)=>{
   
      if(error.error?.detail){
        this.responseMessage = error.error?.detail;
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
    const dialogRef = this.dialog.open(TypeComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
      
    });

    const sub = dialogRef.componentInstance.onAddType.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(TypeComponent,dialogConfig);

    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditType.subscribe((response)=>{
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
      this.deleteType(value.id);
      dialogRef.close();
    })

  }
  
  deleteType(id:any){
    this.typeService.delete(id).subscribe((response:any)=>{
      this.responseMessage = "Type supprimé!";
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


