import { Component, EventEmitter,OnInit,Inject,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonService } from 'src/app/services/bataillon.service';
import { DetenteurEquipementService } from 'src/app/services/detenteur-equipement.service';
import { DetenteurService } from 'src/app/services/detenteur.service';
import { EquipementService } from 'src/app/services/equipement.service';
import { EquipementagsService } from 'src/app/services/equipementags.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TagService } from 'src/app/services/tag.service';
import { UniteService } from 'src/app/services/unite.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-detenteur-equipement',
  templateUrl: './detenteur-equipement.component.html',
  styleUrls: ['./detenteur-equipement.component.scss']
})
export class  DetenteurEquipementComponent  implements OnInit{
  eqdetForm: any = FormGroup;
  onAddEqdet = new EventEmitter();
  onEditEqdet = new EventEmitter();
  dialogAction:any ="Ajout";
  action:any ="Ajout"; 
  responseMessage:any;
  equipements:any=[];
  detenteurs:any=[];
  private _detenteurs: Array<any>=[];
  private _equipements: Array<any>=[];
  @ViewChild('multiDetSearch') multiTagSearchInput!: ElementRef;
  @ViewChild('multiEqSearch') multiEqSearchInput!: ElementRef;
   

    constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,
      private router:Router, private eqdetService:DetenteurEquipementService,
      private detService:DetenteurService,
      private eqService:EquipementService,
      private snackbarService:SnackbarService,
      private dialogRef:MatDialogRef<DetenteurEquipementComponent>,
      private ngxService:NgxUiLoaderService) { }
  
    ngOnInit(): void {
      
      this.eqdetForm = this.formBuilder.group({
        holderId:[null,[Validators.required]],
        equipmentId:[null,[Validators.required]],
        minution:[null,[Validators.required,Validators.pattern(GlobalConstants.numericRegex)]]
      });
      if(this.dialogData.action === "Modification"){
        this.dialogAction = "Modification";
        this.action = "Update";
        this.eqdetForm.patchValue(this.dialogData.data);
      }
      this.getEquipements();
      this.getDets();
     
    }

    onInputChangeEq() {
      console.log(this.multiEqSearchInput.nativeElement.value);
      const searchInput = this.multiEqSearchInput.nativeElement.value ?
      this.multiEqSearchInput.nativeElement.value.toLowerCase() : '';
      this.equipements = this._equipements.filter(p =>{
        const name: string = p.name.toLocaleLowerCase();
        return name.indexOf(searchInput) > -1;
      });
     
     }

     onInputChangeDet() {
      console.log(this.multiTagSearchInput.nativeElement.value);
      const searchInput = this.multiTagSearchInput.nativeElement.value ?
      this.multiTagSearchInput.nativeElement.value.toLowerCase() : '';
      this.detenteurs = this._detenteurs.filter(p =>{
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
      var formData = this.eqdetForm.value;
      var data ={
        holder: formData.holderId,
        equipment: formData.equipmentId,
        minution:formData.minution
    
      }
      console.log(data);
      this.eqdetService.add(data).subscribe((response:any)=>{
         this.dialogRef.close();
         this.onAddEqdet.emit();
         this.responseMessage = "Opération réussie!";
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
      var formData = this.eqdetForm.value;
      var data ={
        holder: formData.tag,
        equipment: formData.equipment,
        minution: formData.minution
      }
      console.log(this.dialogData.data.id);
      this.eqdetService.update(this.dialogData.data.id,data).subscribe((response:any)=>{
        console.log(response);
         this.dialogRef.close();
         this.onEditEqdet.emit();
         this.responseMessage = "mise à jour effectuée!";
         this.snackbarService.openSnackBar(this.responseMessage,"success");
      },(error:any)=>{
        this.dialogRef.close();
        if(error.error?.detail){
          this.responseMessage = error.error?.detail;
  
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      })
    }

    getDets(){
      this.detService.getDetenteurs().subscribe((response:any)=>{
        this.detenteurs = response?.data;
        this._detenteurs = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }

    getEquipements(){
      this.eqService.getEquipements().subscribe((response:any)=>{
        this.equipements = response?.data;
        this._equipements = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }
  
  
  }
  



