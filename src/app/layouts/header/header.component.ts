import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }

  logout(){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data ={
    //   message:'logout'
    // };
    // const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    // const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user)=>{
    //   dialogRef.close();
    //   localStorage.clear();
    //   this.router.navigate(['/']);
    // })
     
swal.fire({
  title: 'Voulez-vous quitter l\'application?',
  showCancelButton: true,
  confirmButtonText: 'Yes',
  confirmButtonColor: '#00c292',
  cancelButtonColor: '#d33',
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    localStorage.clear();
    this.router.navigate(['/']);
  } 
})
  }

  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
   // this.dialog.open(ChangePasswordComponent,dialogConfig);
  }

}
