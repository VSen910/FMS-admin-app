import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Faculty } from '../../models/faculty.model';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css'
})
export class FormCard {
  @Input() faculty!: Faculty;
  @Output() deleteFaculty = new EventEmitter<number>();
  
  onDelete() {
    this.deleteFaculty.emit(this.faculty.id);
  }
}
