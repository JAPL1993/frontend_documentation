import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing-module';
import { AddSectionModal, SectionComponent } from './section/section.component';
import { DocsService } from './docs.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  AddArticleModal,
  ArticlesComponent,
} from './section/actions/articles/articles.component';

@NgModule({
  declarations: [
    SectionComponent,
    AddSectionModal,
    ArticlesComponent,
    AddArticleModal,
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  providers: [DocsService],
})
export class DocumentationModule {}
