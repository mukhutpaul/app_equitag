
import { Component, EventEmitter,OnInit,Inject,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonService } from 'src/app/services/bataillon.service';
import { EquipementService } from 'src/app/services/equipement.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TypeService } from 'src/app/services/type.service';
import { UniteService } from 'src/app/services/unite.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.scss']
})
export class EquipementsComponent implements OnInit{
  eqForm: any = FormGroup;
  onAddeq = new EventEmitter();
  onEditeq = new EventEmitter();
  dialogAction:any ="Ajout";
  action:any ="Ajout"; 
  responseMessage:any;
  types:  Array<any>=[];
  private _types: Array<any>=[];
  @ViewChild('multiTypeSearch') multiTypeSearchInput!: ElementRef;
   

    constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,
      private router:Router, private eqServ:EquipementService,private typeService:TypeService,
      private snackbarService:SnackbarService,
      private dialogRef:MatDialogRef<EquipementsComponent>,
      private ngxService:NgxUiLoaderService) { }
  
    ngOnInit(): void {
      
      this.eqForm = this.formBuilder.group({
        name:[null,[Validators.required]],
        numero_serie:[null,[Validators.required]],
        date_fabrication:[null,[Validators.required,Validators.pattern(GlobalConstants.dateRegex)]],
        type:[null,[Validators.required]],
      });
      if(this.dialogData.action === "Modification"){
        this.dialogAction = "Modification";
        this.action = "Update";
        this.eqForm.patchValue(
          {
            created_on: this.dialogData.data.created_on,
            date_fabrication:this.dialogData.data.date_fabrication, 
            id: this.dialogData.data.id,
            is_active : this.dialogData.data.is_active,
            name: this.dialogData.data.name,
            numero_serie : this.dialogData.data.numero_serie,
            type : this.dialogData.data.type.id,
            updated_on : this.dialogData.data.updated_on

          });
          console.log({
            created_on: this.dialogData.data.created_on,
            date_fabrication:this.dialogData.data.date_fabrication, 
            id: this.dialogData.data.id,
            is_active : this.dialogData.data.is_active,
            name: this.dialogData.data.name,
            numero_serie : this.dialogData.data.numero_serie,
            type : this.dialogData.data.type.name,
            updated_on : this.dialogData.data.updated_on

          })
      }

      this.getTypes();
     
    }


    onInputChangeType() {
      console.log(this.multiTypeSearchInput.nativeElement.value);
      const searchInput = this.multiTypeSearchInput.nativeElement.value ?
      this.multiTypeSearchInput.nativeElement.value.toLowerCase() : '';
      this.types = this._types.filter(p =>{
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
      var formData = this.eqForm.value;
      var data ={
        name: formData.name,
        numero_serie: formData.numero_serie,
        date_fabrication: formData.date_fabrication,
        type: formData.type
    
      }
      console.log(data);
      this.eqServ.addEq(data).subscribe((response:any)=>{
         this.dialogRef.close();
         this.onAddeq.emit();
         this.responseMessage = "Equipement enregistrée!";
         this.snackbarService.openSnackBar(this.responseMessage,"success");
      },(error:any)=>{
        this.dialogRef.close();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
  
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      })
    }
  
    edit(){
      var formData = this.eqForm.value;
      var data ={
        name: formData.name,
        numero_serie: formData.name,
        date_fabrication: formData.name,
        type: formData.type
      }
     
      this.eqForm.update(this.dialogData.data.id,data).subscribe((response:any)=>{
        console.log(response);
         this.dialogRef.close();
         this.onEditeq.emit();
         this.responseMessage = "Equiepement mis à jour";
         this.snackbarService.openSnackBar(this.responseMessage,"success");
      },(error:any)=>{
        this.dialogRef.close();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
  
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      })
    }

    getTypes(){
      this.typeService.getTypes().subscribe((response:any)=>{
        this.types = response?.data;
        this._types = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.message){
         this.responseMessage = error.error?.message;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }
  
  
  }
  


