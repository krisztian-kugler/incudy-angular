import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/global/data.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.pug',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Input() day: number;
  events: number = 0;

  ngOnInit() {
    this.dataService.eventCounter.subscribe((data: {day: number, events: number}) => {
      if (data.day === this.day) {
        this.events = data.events;
      }
    })
  }

}
