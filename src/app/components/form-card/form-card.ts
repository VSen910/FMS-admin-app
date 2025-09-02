import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css'
})
export class FormCard {
  @Input() name!: string;
  @Input() position!: string;
  @Input() email!: string;
  @Input() questionnaires!: number;

  goToDetails() {
    // Logic to navigate to form details page
    console.log('Navigating to form details...');
  }
}
