import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { DocumentationService } from 'src/app/views/documentation-detail/documentation.service';
import { ArticlesService } from '../articles.service';

interface Content {
  title: string;
  description: string;
  image: string;
  slug: string;
  articles: any[];
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  constructor(
    public modalRef: MatDialogRef<ArticlesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private doc: DocumentationService,
    private modal: MatDialog,
    private article: ArticlesService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.doc.getContent(this.data.id).subscribe((result) => {
      this.articles = result[0].articles;
    });
  }
  addArticle() {
    const modalRef = this.modal.open(AddArticleModal, {
      data: { id: this.data.id },
    });
    modalRef.afterClosed().subscribe((result) => {
      this.article.saveArticle(result).subscribe((result) => {
        this.alert.showToast(
          'Save Successfuly',
          'The new Article has been added'
        );
        this.articles.push(result);
      });
    });
  }
  deleteArticle(id: number) {
    this.alert
      .showConfirmationAlert(
        'Delete confirmation',
        'Do you realy wish to delete this article?'
      )
      .then((result) => {
        if (result) {
          this.article.deleteArticle(id).subscribe((result) => {
            if (result.affected > 0) {
              const index = this.articles.findIndex((x) => x.id === id);
              this.articles.splice(index, 1);
              this.alert.showToast(
                'Delete',
                'The section has been deleted successfuly'
              );
            }
          });
        }
      });
  }
}

interface Objeto {
  title: string;
  description: string;
  endpoint: string;
  sectionId: number;
}
@Component({
  selector: 'add-section-modal',
  templateUrl: './actions/add-rticle-modal.component.html',
})
export class AddArticleModal {
  data: Objeto = {
    title: '',
    description: '',
    endpoint: '',
    sectionId: 0,
  };
  constructor(
    public modalRef: MatDialogRef<AddArticleModal>,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dta: { id: number }
  ) {}
  save() {
    this.data.sectionId = this.dta.id;
    console.log(this.data);
    for (const key of Object.keys(this.data)) {
      const value = this.data[key as keyof Objeto];
      if (this.isEmpty(value)) {
        this.alert.showErrorAlert(`La key ${key} no puede estar vacia`);
        return;
      }
    }
    this.modalRef.close(this.data);
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
