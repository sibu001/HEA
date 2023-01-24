import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';

  // to remove the highlighter of the chart while navigating to other screen.
  constructor( private router : Router){
    this.router.events.subscribe((data) => {
      if(data instanceof ActivationEnd){
        const dataLabelDiv = document.getElementById('overDiv');
        if(dataLabelDiv)
          dataLabelDiv.style.visibility='hidden';
      }
    });
   }
}