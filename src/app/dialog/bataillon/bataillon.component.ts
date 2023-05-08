
import { Component, EventEmitter,OnInit,Inject, ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonService } from 'src/app/services/bataillon.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UniteService } from 'src/app/services/unite.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-bataillon',
  templateUrl: './bataillon.component.html',
  styleUrls: ['./bataillon.component.scss']
})
export class BataillonComponent implements OnInit{
  bataillonForm: any = FormGroup;
  onAddBataillon = new EventEmitter();
  onEditBataillon = new EventEmitter();
  dialogAction:any ="Ajout";
  action:any ="Ajout"; 
  responseMessage:any;
  unites:Array<any>=[];
  data:any;
  private _unites: Array<any>=[];
  @ViewChild('multiUniteSearch') multiUniteSearchInput!: ElementRef;

    constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,
      private router:Router, private bataillonService:BataillonService,private uniteService:UniteService,
      private snackbarService:SnackbarService,
      private dialogRef:MatDialogRef<BataillonComponent>,
      private ngxService:NgxUiLoaderService) {
    
       }
   
    ngOnInit(): void {
    
      this.bataillonForm = this.formBuilder.group({
        name:[null,[Validators.required]],
        unite:[null,[Validators.required]],
      });
      if(this.dialogData.action === "Modification"){
        this.dialogAction = "Modification";
        this.action = "Update";
        this.bataillonForm.patchValue({
          created_on:this.dialogData.data.created_on,
          id:this.dialogData.data.id,
          name:this.dialogData.data.name,
          unite:this.dialogData.data.unite.id
        }
          );
        console.log(
          {
            created_on:this.dialogData.data.created_on,
            id:this.dialogData.data.id,
            name:this.dialogData.data.name,
            unite:this.dialogData.data.unite.id
          }
        )
      }
      this.getUnites();
     
    }

    onInputChangeUnite() {
      console.log(this.multiUniteSearchInput.nativeElement.value);
      const searchInput = this.multiUniteSearchInput.nativeElement.value ?
      this.multiUniteSearchInput.nativeElement.value.toLowerCase() : '';
      this.unites = this._unites.filter(p =>{
        const name: string = p.name.toLocaleLowerCase();
        return name.indexOf(searchInput) > -1;
      });
     
     }
  
    // handleSubmit(){
    //   this.ngxService.start();
    //   var formData = this.signupForm.value;
    //   var data = {
    //     name: formData.name,
    //     email: formData.email,
    //     contactNumber: formData.contactNumber,
    //     password: formData.password
    //   }
  
    //   this.userService.signup(data).subscribe((response:any)=>{
    //     this.ngxService.stop();
    //     this.dialogRef.close();
    //     this.responseMessage =response?.message;
    //     this.snackbarService.openSnackBar(this.responseMessage,"");
    //     this.router.navigate(['/utilisateur']);
    //   },
    //   (error)=>{
    //     this.ngxService.stop();
    //     if(error.error?.message){
    //       this.responseMessage = error.error?.message;
    //     }
    //     else{
    //       this.responseMessage = GlobalConstants.genericError;
    //     }
  
    //     this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    //   })
    // }
  
    handleSubmit(){ 
      if(this.dialogAction === "Modification"){
        this.edit();
      }else{
        this.add();
      }
    }
  
   add(){
     
      var formData = this.bataillonForm.value;
      var data ={
        name: formData.name,
        unite: formData.unite
    
      }
      console.log(data);
      this.bataillonService.addBataillon(data).subscribe((response:any)=>{
      
         this.dialogRef.close();
         this.onAddBataillon.emit();
         this.responseMessage = "Bataillon enregistrée!";
         this.snackbarService.openSnackBar(this.responseMessage,"success");
      },(error:any)=>{
        this.dialogRef.close();
        if(error.error?.detail){
          this.responseMessage = error.error?.detail;
  
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      })
    }
  
    edit(){
      var formData = this.bataillonForm.value;
      var data ={
        name: formData.name,
        unite: formData.unite
      }
      console.log(this.dialogData.data.id);
      this.bataillonForm.update(this.dialogData.data.id,data).subscribe((response:any)=>{
        console.log(response);
         this.dialogRef.close();
         this.onEditBataillon.emit();
         this.responseMessage = "Bataillon mis à jour";
         this.snackbarService.openSnackBar(this.responseMessage,"success");
      },(error:any)=>{
        this.dialogRef.close();
        if(error.error?.detail){
          this.responseMessage = error.error?.detail;
  
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      })
    }

    getUnites(){
      this.uniteService.getUnites().subscribe((response:any)=>{
        this.unites = response?.data;
        this._unites = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }
  
  
  }
  


