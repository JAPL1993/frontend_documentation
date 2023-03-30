import { Component, OnInit } from '@angular/core';
import { DocsService } from '../docs.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  sections: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'image', 'slug'];
  constructor(private docs: DocsService) {}

  ngOnInit(): void {
    this.docs.getSection().subscribe((data) => {
      this.sections = data;
      console.log(data);
    });
  }
}
