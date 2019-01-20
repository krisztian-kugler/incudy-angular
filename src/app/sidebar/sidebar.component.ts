import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../global/calendar-event.model';
import { DataService } from '../global/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.pug',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Output() openModal = new EventEmitter();
  content: "events" | "placeholder" = "placeholder";
  events: CalendarEvent[] = [];
  day: string = null;

  onAdd(): void {
    this.openModal.emit();
  }

  onRemove(id: number): void {
    this.dataService.removeEvent(this.dataService.selectedDay, id);
  }

  ngOnInit() {
    this.dataService.transferEvents.subscribe((events: CalendarEvent[]) => {
      events ? this.events = [...events] : this.events = [];
    })
    this.dataService.transferDate.subscribe((date: {month: string, day: number}) => {
      this.day = `${date.day} ${date.month}`;
      this.content = "events";
    })
  }
  
}
