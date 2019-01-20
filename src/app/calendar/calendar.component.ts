import { Component, OnInit } from '@angular/core';
import { DataService } from '../global/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.pug',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  constructor(private dataService: DataService) { }

  month: number[][] = [];
  daysInWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  monthsInYear: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedDay: number;
  title = {
    year: <number>null,
    month: <string>null
  }

  onSelect(day: number): void {
    const index = day - 1;
    this.selectedDay = day;
    this.dataService.selectedDay = day;
    this.dataService.transferDate.next({ month: this.title.month, day: day });
    this.dataService.transferEvents.next(this.dataService.events[index]);
  }

  initCalendar(year: number, month: number): void {
    const daysInMonth: number = this.daysInMonth(year, month);
    const firstDayInMonth: number = this.firstDayInMonth(year, month);
    let currentDay: number = 1;
    let isLastWeek: boolean = false;

    // This loop builds a 2-dimensional array of days in a given month with proper day-of-the-week positioning
    for (let week = 0; !isLastWeek; week++) {
      let currentWeek: number[] = [];
      for (let day = week * 7 + 1; day < week * 7 + 8; day++) {
        if (day < firstDayInMonth || currentDay > daysInMonth) {
          currentWeek.push(null);
        } else {
          currentWeek.push(currentDay);
          currentDay++;
        }
      }
      this.month.push(currentWeek);
      if (currentDay > daysInMonth) {
        isLastWeek = true;
      }
    }

    this.title.year = year;
    this.title.month = this.monthsInYear[month];
  }

  firstDayInMonth(year: number, month: number): number {
    const firstDayInMonth: number = new Date(year, month).getDay();
    if (firstDayInMonth === 0) {
      return 7;
    } else {
      return firstDayInMonth;
    }
  }

  daysInMonth(year: number, month: number): number {
    return 32 - new Date(year, month, 32).getDate();
  }

  ngOnInit() {
    this.initCalendar(2019, 8);
  }

}
