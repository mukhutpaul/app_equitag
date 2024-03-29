import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar,private toastr: ToastrService) { }
  openSnackBar(message: string, action: string) {
    if (action == 'error') {
      this.toastr.error(message,'');
      // this.snackbar.open(message, '', {
      //   horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   duration: 2000,
      //   panelClass: ['green-snackbar']
      // });
    }
    else {
      this.toastr.success(message,'');
      // this.snackbar.open(message, '', {
      //   horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   duration: 2000,
      //   panelClass: ['green-snackbar']
      // });
    }

  }
}
