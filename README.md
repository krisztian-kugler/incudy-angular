# Event Calendar

Live version of this project is available [here](https://krisztian-kugler.github.io/incudy-angular).

## Used technologies

* Angular 7
* RxJS
* Pug
* Sass

## Notes

* Date is set to september 2019 by default, but it's managed dynamically in the code and can be set to any year/month by changing just 2 input parameters.
* Events can be added via a simple modal form (with basic validation). The "name" field is required and the form cannot be submitted without it.
* You can add as many events as wish to a given date. In case of too many events, the list becomes scrollable. The scrollbar itself is hidden by a little CSS-trick but the functionality is there.
* The number of events for a given date is display in the calendar.
* Events can be removed by clicking the "X" in the upper right corner.
* I also paid attention to the UI design. Nothing revolutionary, just a flat, minimalistic interface. :)
