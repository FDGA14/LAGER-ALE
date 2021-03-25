import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-publ',
  templateUrl: './modal-publ.component.html',
  styleUrls: ['./modal-publ.component.scss'],
})
export class ModalPublComponent implements OnInit {

  constructor(public Dialog: MatDialogRef<ModalPublComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {}

}
