import { Component, OnInit,EventEmitter,Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm: any = FormGroup;
  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  dialogAction:any ="Ajout";
  action:any ="Ajout";
  responseMessage:any;


  constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private router:Router, private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      first_name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      last_name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      password:[null,[Validators.required]],
    });
    if(this.dialogData.action === "Modification"){
      this.dialogAction = "Modification";
      this.action = "Update";
      this.signupForm.patchValue(this.dialogData.data);
    }
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
    var formData = this.signupForm.value;
    var data ={
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      is_active: 1
    }
    console.log(data);
    this.userService.signup(data).subscribe((response:any)=>{
     
       this.dialogRef.close();
       this.onAddUser.emit();
       this.responseMessage = "Utilisateur enregistré!";
       this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.username){
        this.responseMessage = error.error?.username;

      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.signupForm.value;
    var data ={
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      is_active: 1
    }
    console.log(data);
    this.userService.update(this.dialogData.data.id,data).subscribe((response:any)=>{
      console.log(response);
       this.dialogRef.close();
       this.onEditUser.emit();
       this.responseMessage = "Utilisateur mise à jour";
       this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.username){
        this.responseMessage = error.error?.username;

      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }


}
