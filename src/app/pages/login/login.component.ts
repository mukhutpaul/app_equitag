import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/app/environment/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
 username:any;
 password:any;
 responseMessage:any;
 adr:any;
 val :any='http://127.0.0.1:8000'

 public static  adrServeur:any;

    constructor( private router:Router,
      private userService:UserService,
      private snackbarService:SnackbarService,
      private ngxService :NgxUiLoaderService) {LoginComponent.adrServeur = this.adr; }
 
 ngOnInit(): void {
  this.ngxService.stop()
  localStorage.clear();

  }

 adresse(){
   // LoginComponent.adrServeur = this.adr;
    //this.router.navigate(['/']);
    localStorage.setItem('adresse',this.adr);
    swal.fire({
      title: 'Vous serez conncté au serveur : '+this.adr,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#d33',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       // this.router.navigate(['/']);
      } 
    })
   
  }



login(){
  console.log(localStorage.getItem('adresse'))
  this.ngxService.start()
  var data ={
      username:this.username,
      password:this.password
    }
    console.log(data)
    this.userService.login(data).subscribe((response:any)=>{
      localStorage.setItem('token',response.token);
      
      this.router.navigate(['darshboard']);
      //this.ngxService.stop()
      console.log(response.data)
    },(error)=>{
      if(error.error?.detail){
        this.ngxService.stop()
        this.responseMessage = error.error?.detail;
      }else{
        this.ngxService.stop()

        this.responseMessage = GlobalConstants.genericError;
      }
      this.ngxService.stop()
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    })
  }

  
}

