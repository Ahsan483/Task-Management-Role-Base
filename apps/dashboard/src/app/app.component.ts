import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'My Angular App'; 
   setSelection(option: string) {
    console.log('Selected option:', option);
  }
}

