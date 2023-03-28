import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationDetailComponent } from './documentation-detail.component';

describe('DocumentationDetailComponent', () => {
  let component: DocumentationDetailComponent;
  let fixture: ComponentFixture<DocumentationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
