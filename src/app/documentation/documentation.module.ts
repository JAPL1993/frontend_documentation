import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing-module';
import { SectionComponent } from './section/section.component';
import { DocsService } from './docs.service';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [SectionComponent],
  imports: [CommonModule, DocumentationRoutingModule, MatTableModule],
  providers: [DocsService],
})
export class DocumentationModule {}
