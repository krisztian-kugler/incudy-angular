import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../global/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.pug',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {

  constructor(private dataService: DataService) { }

  @Output() destroy = new EventEmitter();

  closeModal(): void {
    this.destroy.emit();
  }

  onSubmit(form: NgForm) {
    this.dataService.addEvent(this.dataService.selectedDay, form.value.title, form.value.description);
    this.destroy.emit();
  }

}
