import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'app/_components';
import { ProjectService } from 'app/_services/project.service';

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
    public dialog: MatDialog,
    private proService: ProjectService
  ) { }

  ngOnInit(): void {
    this.createClassForm = this.formBuilder.group({
      class: ['', Validators.required],
      description: ['']
    });
    this.proService.listTeachers().subscribe(
      (res) => {
        console.log(res);
        this.classList = res;
      }, (err) => {
        console.log(err);
      }
    );
  }

  get f() { return this.createClassForm.controls; }

  createClass() {
    const dialogRef = this.dialog.open(AlertComponent , {
      width: '350px',
      data: {type: "createClass"}
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.proService.createClass(result.grade, result.division).subscribe(
            (res) => {
              console.log(res);
              this.proService.listTeachers().subscribe(
                (res) => {
                  console.log(res);
                  this.classList = res;
                }, (err) => {
                  console.log(err);
                }
              );
            }, (err) => {
              console.log(err);
            }
        );
        }
      }
    );
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

  editClass(currentclass) {
    const dialogRef = this.dialog.open(AlertComponent , {
      width: '350px',
      data: {type: "editClass", data: currentclass}
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
        this.proService.updateClass(currentclass._id, result).subscribe(
          (res) => {
            console.log(res);
            currentclass.name = result;
          }, (err) => {
            console.log(err);
          }
        );
        }
      }
    );
  }

  deleteClass(currentclass) {
    const dialogRef = this.dialog.open(AlertComponent , {
      width: '350px',
      data: {type: "deleteClass", data: currentclass.name}
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result == 'yes') {
        this.proService.deleteClass(currentclass._id).subscribe(
          () => {
            console.log("Success in Deletion");
            this.classList = this.classList.filter(classitem => classitem._id != currentclass._id );
          }, (err) => {
            console.log(err);
          }
        );
        }
      }
    );
  }

  createStudent(grade: number, division: string) {
    const dialogRef = this.dialog.open(AlertComponent , {
      width: '350px',
      data: {type: "createStudent", grade: grade, division: division}
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log(result);
        if(result && result.name) {
          this.proService.createStudent(result.name, grade, division, result.email).subscribe(
            (res) => {
              console.log(res);
            }, (err) => {
              console.log(err);
            }
          );
        }
      }
    );
  }

}
