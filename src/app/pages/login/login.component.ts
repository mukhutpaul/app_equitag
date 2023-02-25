import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 email:any;
 password:any;
 responseMessage:any;

    constructor( private router:Router,
      private userService:UserService,
      private snackbarService:SnackbarService,
      private ngxService :NgxUiLoaderService) { }

 ngOnInit(): void {
  this.ngxService.start();
  }

login(){
  this.ngxService.start();
  var data ={
      email:this.email,
      password:this.password
    }
    console.log(data)
    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      localStorage.setItem('token',response.token);
      this.router.navigate(['/darshboard']);
    },(error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
