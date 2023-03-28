import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationDetailComponent } from './views/documentation-detail/documentation-detail.component';

const routes: Routes = [
  {
    path: 'documentation-detsil/:id',
    title: 'Document Section',
    component: DocumentationDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
