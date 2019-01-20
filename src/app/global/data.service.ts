import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent } from './calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public transferDate = new Subject<{month: string, day: number}>(); // To send the selected date to the sidebar header
  public transferEvents = new Subject<CalendarEvent[]>(); // To send the event list of a given date to the sidebar
  public eventCounter = new Subject<{day: number, events: number}>(); // To display the number of events for a given day
  public events: CalendarEvent[][] = [];
  public selectedDay: number = null;
  private id: number = 0;

  public addEvent(day: number, title: string, description: string): void {
    const index: number = day - 1;
    const event = new CalendarEvent(this.generateUniqueId(), title, description);
    if (!this.events[index]) {
      this.events[index] = [];
    }
    this.events[index].push(event);
    this.transferEvents.next(this.events[index]);
    this.eventCounter.next({day: day, events: this.events[index].length});
  }

  public removeEvent(day: number, id: number): void {
    const index: number = day - 1;
    this.events[index].forEach((event: CalendarEvent, i: number) => {
      if (event.id === id) {
        this.events[index].splice(i, 1);
      }
    })
    this.transferEvents.next(this.events[index]);
    this.eventCounter.next({day: day, events: this.events[index].length});
  }

  private generateUniqueId(): number {
    return this.id++;
  }
  
}
