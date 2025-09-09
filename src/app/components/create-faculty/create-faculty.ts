import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Admin } from '../../services/admin/admin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Faculty } from '../../models/faculty.model';

@Component({
  selector: 'app-create-faculty',
  imports: [ReactiveFormsModule],
  templateUrl: './create-faculty.html',
  styleUrl: './create-faculty.css'
})
export class CreateFaculty {
  dialogRef = inject(DialogRef<Faculty>, { optional: true });
  createFacultyForm: FormGroup;

  constructor(private admin: Admin, private fb: NonNullableFormBuilder, private snackbar: MatSnackBar) {
    this.createFacultyForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createFaculty(event: Event) {
    event.preventDefault();
    if(this.createFacultyForm.invalid) {
      this.createFacultyForm.markAllAsTouched();
      return;
    }
    this.admin.createFaculty(this.createFacultyForm.value).subscribe({
      next: (response) => {
        console.log('Faculty created successfully:', response);
        this.createFacultyForm.reset();
        this.dialogRef?.close(response);
        this.snackbar.open('Faculty created successfully!', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error creating faculty:', error);
      }
    });
  }
}
