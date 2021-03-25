import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
})
export class ModalProfileComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {}

}
