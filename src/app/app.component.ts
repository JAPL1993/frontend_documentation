import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Documentation';
  classes = ['example-container', 'rounded-xl'];
  isOpen: boolean = true;

  statusSide() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
