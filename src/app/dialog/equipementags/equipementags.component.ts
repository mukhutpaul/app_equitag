import { Component, EventEmitter,OnInit,Inject,ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonService } from 'src/app/services/bataillon.service';
import { EquipementService } from 'src/app/services/equipement.service';
import { EquipementagsService } from 'src/app/services/equipementags.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TagService } from 'src/app/services/tag.service';
import { UniteService } from 'src/app/services/unite.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-equipementags',
  templateUrl: './equipementags.component.html',
  styleUrls: ['./equipementags.component.scss']
})
export class  EquipementagsComponent implements OnInit{
  eqtagForm: any = FormGroup;
  onAddEqtag = new EventEmitter();
  onEditEqtag = new EventEmitter();
  dialogAction:any ="Ajout";
  action:any ="Ajout"; 
  responseMessage:any;
  tags:Array<any>=[];
  equipements:Array<any>=[];
  private _tags: Array<any>=[];
  private _equipements: Array<any>=[];
  @ViewChild('multiTagSearch') multiTagSearchInput!: ElementRef;
  @ViewChild('multiEqSearch') multiEqSearchInput!: ElementRef;
   

    constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,
      private router:Router, private  eqtagService:EquipementagsService,private tagService:TagService,private eqService:EquipementService,
      private snackbarService:SnackbarService,
      private dialogRef:MatDialogRef<EquipementagsComponent>,
      private ngxService:NgxUiLoaderService) { }
  
    ngOnInit(): void {
      
      this.eqtagForm = this.formBuilder.group({
        tag:[null,[Validators.required]],
        equipment:[null,[Validators.required]],
      });
      if(this.dialogData.action === "Modification"){
        this.dialogAction = "Modification";
        this.action = "Update";
        this.eqtagForm.patchValue({
          created_on: this.dialogData.data.created_on,
          equipment:  this.dialogData.data.equipment.id,
          is_active:  this.dialogData.data.is_active,
          tag:  this.dialogData.data.tag.id,
          updated_on:  this.dialogData.data.updated_on
        });
      }
      this.getEquipements();
      this.getTags();
     
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

    onInputChangeEq() {
      console.log(this.multiEqSearchInput.nativeElement.value);
      const searchInput = this.multiEqSearchInput.nativeElement.value ?
      this.multiEqSearchInput.nativeElement.value.toLowerCase() : '';
      this.equipements = this._equipements.filter(p =>{
        const name: string = p.name.toLocaleLowerCase();
        return name.indexOf(searchInput) > -1;
      });
     
     }

     onInputChangeTag() {
      console.log(this.multiTagSearchInput.nativeElement.value);
      const searchInput = this.multiTagSearchInput.nativeElement.value ?
      this.multiTagSearchInput.nativeElement.value.toLowerCase() : '';
      this.tags = this._tags.filter(p =>{
        const name: string = p.name.toLocaleLowerCase();
        return name.indexOf(searchInput) > -1;
      });
     
     }
  
   add(){
      var formData = this.eqtagForm.value;
      var data ={
        tag: formData.tag,
        equipment: formData.equipment
    
      }
      console.log(data);
      this.eqtagService.addEqTag(data).subscribe((response:any)=>{
         this.dialogRef.close();
         this.onAddEqtag.emit();
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
      var formData = this.eqtagForm.value;
      var data ={
        tag: formData.tag,
        equipment: formData.equipment
      }
      console.log(this.dialogData.data.id);
      this.eqtagForm.update(this.dialogData.data.id,data).subscribe((response:any)=>{
        console.log(response);
         this.dialogRef.close();
         this.onEditEqtag.emit();
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

    getTags(){
      this.tagService.getTags().subscribe((response:any)=>{
        this.tags = response?.data;
        this._tags = response?.data;
        
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
  


