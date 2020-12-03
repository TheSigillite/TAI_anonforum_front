import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.css']
})
export class ModUserComponent{
  usr: string;
  usure = false;
  success: boolean;
  response: string;

  constructor(public dialogRef: MatDialogRef<ModUserComponent>,
              private usrService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onDismiss() {
    this.dialogRef.close();
  }

  onCommit() {
    this.usrService.addModeator({login: this.usr}, this.data.token).subscribe(response =>{
      let res: any = response;
      this.response = res.details;
      this.success = res.succes;
      this.usure = undefined;
    });
  }

  confirm() {
    this.usure = true;
    this.response = 'Are You Sure? This action is irreversible';
  }
}
