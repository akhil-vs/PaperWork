import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'app/_components';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classList: any[] = [];
  examList: any[] = [];
  createClassForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createClassForm = this.formBuilder.group({
      class: ['', Validators.required],
      description: ['']
    });
  }
  get f() { return this.createClassForm.controls; }

  openModal() {
    const dialogRef = this.dialog.open(AlertComponent , {
      width: '350px',
      data: {type: "createClass"}
    });
  }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createClassForm.invalid) {
            return;
        }

        // display form values on success
    }
    onReset() {
      this.submitted = false;
      this.createClassForm.reset();
    }

}
