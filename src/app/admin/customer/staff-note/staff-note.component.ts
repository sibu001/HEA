import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-staff-note',
  templateUrl: './staff-note.component.html',
  styleUrls: ['./staff-note.component.css']
})
export class StaffNoteComponent implements OnInit {

  staffNoteForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StaffNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.setForm(this.data);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setForm(event: any) {
    this.staffNoteForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      noteDate: [event !== undefined ? event.noteDate : ''],
      note: [event !== undefined ? event.note : ''],
    });
  }

}
