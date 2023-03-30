import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationDetailComponent } from './views/documentation-detail/documentation-detail.component';

const routes: Routes = [
  {
    path: 'documentation-detsil/:id',
    title: 'Document Section',
    component: DocumentationDetailComponent,
  },
  {
    path: 'documentation-edit',
    loadChildren: () =>
      import('./documentation/documentation.module').then(
        (m) => m.DocumentationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
