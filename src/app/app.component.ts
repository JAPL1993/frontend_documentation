import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Documentation';
  classes = ['example-container', 'rounded-xl'];
  isOpen: boolean = true;
  constructor(private resposive: BreakpointObserver) {}
  statusSide() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
  ngOnInit(): void {
    this.resposive.observe(Breakpoints.Small).subscribe((result) => {
      if (result.matches) {
        this.isOpen = true;
      }
    });
  }
}
