import { Component, OnInit } from '@angular/core';
import { DocumentationService } from './documentation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documentation-detail',
  templateUrl: './documentation-detail.component.html',
  styleUrls: ['./documentation-detail.component.scss'],
})
export class DocumentationDetailComponent implements OnInit {
  content: any[] = [];
  private sub: any;
  constructor(
    private documentation: DocumentationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.documentation
        .getContent(+params['id'])
        .subscribe((data) => (this.content = data));
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toJson(data: any) {
    return JSON.parse(data);
  }
}