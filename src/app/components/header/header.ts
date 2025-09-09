import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { CreateFaculty } from '../create-faculty/create-faculty';
import { Faculty } from '../../models/faculty.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Output() facultyCreated = new EventEmitter<Faculty>();

  constructor(private dialog: Dialog) {}

  openCreateFacultyDialog() {
    const dialogRef = this.dialog.open<Faculty>(CreateFaculty);
    dialogRef.closed.subscribe((newFaculty) => {
      if (newFaculty) {
        this.facultyCreated.emit(newFaculty);
      }
    });
  }
}
