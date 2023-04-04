import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { DocsService } from '../docs.service';
import { MatAccordion } from '@angular/material/expansion';
import { ArticlesComponent } from './actions/articles/articles.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  sections: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'image', 'slug'];

  cols: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  constructor(
    private docs: DocsService,
    private alert: AlertService,
    private modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'image', header: 'Image' },
      { field: 'slug', header: 'Slug' },
    ];
    this.loading = true;
    this.docs.getSection().subscribe((data) => {
      this.sections = data;
      this.totalRecords = data.length;
      this.loading = false;
      console.log(data);
    });
  }
  loadNodes(event: any) {
    this.loading = true;
    for (let i = 0; i < event.rows; i++) {
      console.log(event);
    }
  }
  getSectionById(id: number) {
    this.docs.getSectionById(id).subscribe((result) => {
      console.log(result);
    });
  }
  deleteSection(id: number) {
    this.alert
      .showConfirmationAlert(
        'Delete confirmation',
        'Do you realy wish to delete this section?'
      )
      .then((result) => {
        if (result) {
          this.docs.deleteSection(id).subscribe((result) => {
            if (result.affected > 0) {
              const index = this.sections.findIndex((x) => x.id === id);
              this.sections.splice(index, 1);
              this.alert.showToast(
                'Delete',
                'The section has been deleted successfuly'
              );
            }
          });
        }
      });
  }
  addSection() {
    const modalRef = this.modal.open(AddSectionModal);
    modalRef.afterClosed().subscribe((result) => {
      this.docs.saveSection(result).subscribe((result) => {
        this.alert.showToast('Add', 'New secction added successfuly');
        this.sections.push(result);
      });
    });
  }
  openArticles(id: number) {
    const modalRef = this.modal.open(ArticlesComponent, {
      data: { id },
    });
    modalRef.afterClosed().subscribe((result) => console.log(result));
  }
  edit(id: number) {
    const modalRef = this.modal.open(EditSectionModalComponent, {
      data: { id },
    });
    modalRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.sections.findIndex((x: any) => x.id === id);
        this.sections[index] = result;
      }
    });
  }
}

interface Objeto {
  title: string;
  description: string;
  image: string;
  slug: string;
}
@Component({
  selector: 'add-section-modal',
  templateUrl: './actions/add-section-modal.component.html',
})
export class AddSectionModal {
  data: Objeto = {
    title: '',
    description: '',
    image: '',
    slug: '',
  };
  constructor(
    public modalRef: MatDialogRef<AddSectionModal>,
    private alert: AlertService,
    private modal: MatDialog
  ) {}
  save() {
    for (const key of Object.keys(this.data)) {
      const value = this.data[key as keyof Objeto];
      if (this.isEmpty(value)) {
        this.alert.showErrorAlert(`La key ${key} no puede estar vacia`);
        return;
      }
    }
    this.modalRef.close(this.data);
  }
  isEmpty(value: string): boolean {
    return value.trim().length === 0;
  }
}

@Component({
  selector: 'edit-section-modal',
  templateUrl: './actions/edit.section.modal.component.html',
})
export class EditSectionModalComponent implements OnInit {
  result: any = {};
  constructor(
    public modalRef: MatDialogRef<EditSectionModalComponent>,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: DocsService
  ) {}
  ngOnInit(): void {
    this.service
      .getSectionById(this.data.id)
      .subscribe((result) => (this.result = result));
  }
  save() {
    this.alert
      .showConfirmationAlert(
        'Update confirmation',
        'Do you realy wish to update this detail?'
      )
      .then((status) => {
        if (status) {
          for (const key of Object.keys(this.result)) {
            const value = this.result[key];
            if (this.isEmpty(value)) {
              this.alert.showErrorAlert(`La key ${key} no puede estar vacia`);
              return;
            }
          }
          this.service
            .editSection(this.data.id, this.result)
            .subscribe((result) => {
              if (result) {
                this.alert.showToast('Updated', 'Successfuly');
                this.modalRef.close(this.result);
              }
            });
        }
      });
  }
  isEmpty(value: string | number): boolean {
    console.log(typeof value);
    if (typeof value == 'string') {
      return value.trim().length === 0;
    } else if (typeof value == 'number') {
      return value > 0 ? false : true;
    } else {
      return true;
    }
  }
}
