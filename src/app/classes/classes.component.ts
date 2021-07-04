import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createClassForm = this.formBuilder.group({
      class: ['', Validators.required],
      description: ['']
    });
  }
  get f() { return this.createClassForm.controls; }

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
