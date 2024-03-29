import { Component, EventEmitter,OnInit,Inject, ElementRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BataillonService } from 'src/app/services/bataillon.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { DetenteurService } from 'src/app/services/detenteur.service';
import { GradeService } from 'src/app/services/grade.service';
import { ProvinceService } from 'src/app/services/province.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UniteService } from 'src/app/services/unite.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-detenteurs',
  templateUrl: './detenteurs.component.html',
  styleUrls: ['./detenteurs.component.scss']
})
export class DetenteursComponent implements OnInit{


  detForm: any = FormGroup;
  onAddDet = new EventEmitter();
  onEditDet = new EventEmitter();
  dialogAction:any ="Ajout";
  action:any ="Ajout"; 
  responseMessage:any;
  unites:Array<any>=[];
  categories:Array<any>=[];
  grades:Array<any>=[];
  bataillons:Array<any>=[];
  provinces: Array<any>=[];
  private _provinces: Array<any>=[];
  private _grades: Array<any>=[];
  private _categories: Array<any>=[];
  private _unites: Array<any>=[];
  private _bataillons: Array<any>=[];

  @ViewChild('multiProvSearch') multiProvSearchInput!: ElementRef;
  @ViewChild('multiUniteSearch') multiUniteSearchInput!: ElementRef;
  @ViewChild('multiCatSearch') multiCatSearchInput!: ElementRef;
  @ViewChild('multiGradeSearch') multiGradSearchInput!: ElementRef;
  @ViewChild('multiBatSearch') multiBatSearchInput!: ElementRef;

   

    constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,
      private router:Router, private bataillonService:BataillonService,
      private uniteService:UniteService,
      private prserv:ProvinceService,
      private catserv:CategorieService,
      private detserv:DetenteurService,
      private grserv:GradeService,
      private snackbarService:SnackbarService,
      private dialogRef:MatDialogRef<DetenteursComponent>,
      private ngxService:NgxUiLoaderService) { }
      
  
  
    ngOnInit(): void {
      
      this.detForm = this.formBuilder.group({
        name:[null,[Validators.required]],
        address:[null,[Validators.required]],
        birthday:[null,[Validators.required,Validators.pattern(GlobalConstants.dateRegex)]],
        birthplace:[null,[Validators.required]],
        sex:[null,[Validators.required]],
        firstname:[null,[Validators.required]],
        lastname:[null,[Validators.required]],
        city:[null,[Validators.required]],
        bloodtype:[null,[Validators.required]],
        maritalstatus:[null,[Validators.required]],
        unite:[null,[Validators.required]],
        bataillon:[null,[Validators.required]],
        categorie:[null,[Validators.required]],
        grade:[null,[Validators.required]],
        province:[null,[Validators.required]],
      });

 
      
    
      if(this.dialogData.action === "Modification"){
        this.dialogAction = "Modification";
        this.action = "Update";
        this.detForm.patchValue(
          {
            name:this.dialogData.data.name,
            address: this.dialogData.data.address,
            birthday: this.dialogData.data.birthday,
            birthplace: this.dialogData.data.birthplace,
            bloodtype:  this.dialogData.data.bloodtype,
            sex: this.dialogData.data.sex,
            firstname: this.dialogData.data.firstname,
            lastname: this.dialogData.data.lastname,
            city: this.dialogData.data.city,
            maritalstatus: this.dialogData.data.maritalstatus,
            unite: this.dialogData.data.unite.id,
            bataillon: this.dialogData.data.bataillon.id,
            categorie: this.dialogData.data.categorie.id,
            grade: this.dialogData.data.grade.id,
            province: this.dialogData.data.province.id
        });
        console.log( 
        
            this.dialogData.data
      
      )
      }
      this.getUnites();
      this.getBataillons();
      this.getProvinces();
      this.getGrade();
      this.getCategories();
     console.log(this.categories)
     console.log(this.provinces)
     console.log(this.grades)
    }

    onInputChange() {
     console.log(this.multiProvSearchInput.nativeElement.value);
     const searchInput = this.multiProvSearchInput.nativeElement.value ?
     this.multiProvSearchInput.nativeElement.value.toLowerCase() : '';
     this.provinces = this._provinces.filter(p =>{
       const name: string = p.name.toLocaleLowerCase();
       return name.indexOf(searchInput) > -1;
     });
    
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

     onInputCategorie() {
      console.log(this.multiCatSearchInput.nativeElement.value);
      const searchInput = this.multiCatSearchInput.nativeElement.value ?
      this.multiCatSearchInput.nativeElement.value.toLowerCase() : '';
      this.categories = this._categories.filter(p =>{
        const name: string = p.name.toLocaleLowerCase();
        return name.indexOf(searchInput) > -1;
      });
     
     }

     onInputBat() {
      console.log(this.multiBatSearchInput.nativeElement.value);
      const searchInput = this.multiBatSearchInput.nativeElement.value ?
      this.multiBatSearchInput.nativeElement.value.toLowerCase() : '';
      this.bataillons = this._bataillons.filter(p =>{
        const name: string = p.name.toLocaleLowerCase();
        return name.indexOf(searchInput) > -1;
      });
     
     }

    onInputChangeGrade() {
      console.log(this.multiGradSearchInput.nativeElement.value);
      const searchInput = this.multiGradSearchInput.nativeElement.value ?
      this.multiGradSearchInput.nativeElement.value.toLowerCase() : '';
    
     this.grades = this._grades.filter(u =>{
       const name: string = u.name.toLocaleLowerCase();
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
      var formData = this.detForm.value;
      var data ={
        name:formData.name,
        address:formData.address,
        birthday:formData.birthday ,
        birthplace: formData.birthplace,
        sex: formData.sex,
        firstname: formData.firstname,
        lastname:formData.lastname ,
        city: formData.city,
        bloodtype: formData.bloodtype,
        maritalstatus: formData.maritalstatus,
        unite:formData.unite,
        bataillon: formData.bataillon,
        categorie:formData.categorie ,
        grade:formData.grade ,
        province:formData.province
    
      }
      console.log(data);
      this.detserv.add(data).subscribe((response:any)=>{
         this.dialogRef.close();
         this.onAddDet.emit();
         this.responseMessage = "Détenteur enregistrée!";
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
      var formData = this.detForm.value;
      var data ={
        name:formData.name,
        address:formData.address,
        birthday:formData.birthday ,
        birthplace: formData.birthplace,
        sex: formData.sex,
        firstname: formData.first_name,
        lastname:formData.last_name ,
        city: formData.city,
        bloodtype: formData.bloodtype,
        maritalstatus: formData.maritalstatus,
        unite:formData.unite,
        bataillon: formData.bataillon,
        categorie:formData.categorie ,
        grade:formData.grade ,
        province:formData.province
      }
      console.log(this.dialogData.data.id);
      this.detForm.update(this.dialogData.data.id,data).subscribe((response:any)=>{
        console.log(response);
         this.dialogRef.close();
         this.onEditDet.emit();
         this.responseMessage = "Détenteur mis à jour";
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
        this._unites  = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }

    getCategories(){
      this.catserv.getCategories().subscribe((response:any)=>{
        this.categories = response?.data;
        this._categories  = response?.data;
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }
    getGrade(){
      this.grserv.getGrades().subscribe((response:any)=>{
        this.grades = response?.data;
        this._grades  = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }

    getProvinces(){
      this.prserv.getProvinces().subscribe((response:any)=>{
        this.provinces = response?.data;
        this._provinces =  response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }

    getBataillons(){
      this.bataillonService.getBataillons().subscribe((response:any)=>{
        this.bataillons = response?.data;
        this._bataillons = response?.data;
        
     },(error:any)=>{
       this.dialogRef.close();
       if(error.error?.detail){
         this.responseMessage = error.error?.detail;
  
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  
    }
  
  
  }
  


function viewChild(arg0: string): (target: DetenteursComponent, propertyKey: "multiProvSearchInput") => void {
  throw new Error('Function not implemented.');
}

