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
  edit(id: number) {
    const ref = this.modal.open(EditArticleModal, {
      data: { id: id },
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.articles.findIndex((x: any) => x.id === id);
        this.articles[index] = result;
      }
    });
  }
  detailModal(details: any, id: number) {
    const modalRef = this.modal.open(ArticleDetail, {
      data: { details: details, id: id },
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
  selector: 'add-article-modal',
  templateUrl: './actions/add.rticle.modal.component.html',
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
    @Inject(MAT_DIALOG_DATA) public dta: { id: number },
    private modal: MatDialog
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

@Component({
  selector: 'article-detail-modal',
  templateUrl: './actions/article.detail.component.html',
})
export class ArticleDetail implements OnInit {
  constructor(
    public modalRef: MatDialogRef<ArticleDetail>,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public articles: any,
    private modal: MatDialog,
    private doc: DocumentationService,
    private article: ArticlesService
  ) {}

  ngOnInit(): void {
    console.log(this.articles);
  }
  addDetail() {
    const modalRef = this.modal.open(AddDetail, {
      data: { id: this.articles.id },
    });
    modalRef.afterClosed().subscribe((result) => {
      this.article.saveDetail(result).subscribe((result) => {
        this.alert.showToast(
          'Save Successfuly',
          'The new Article has been added'
        );
        if (!this.articles.details) {
          this.articles.details = [];
          this.articles.details.push(result);
        } else {
          this.articles.details.push(result);
        }
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
              const index = this.articles.details.findIndex(
                (x: any) => x.id === id
              );
              this.articles.details.splice(index, 1);
              this.alert.showToast(
                'Delete',
                'The section has been deleted successfuly'
              );
            }
          });
        }
      });
  }
  edit(id: number) {
    const editModal = this.modal.open(EditDetailModal, {
      data: { id: id },
    });
    editModal.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.articles.details.findIndex((x: any) => x.id === id);
        this.articles.details[index] = result;
      }
    });
  }
}

enum typeDetail {
  BODY = 'BODY',
  PARAMS = 'PARAMS',
  RESPONSE = 'RESPONSE',
}

interface Detail {
  type: typeDetail;
  data: string;
  articleId: number;
}
@Component({
  selector: 'add-detail-modal',
  templateUrl: './actions/add.detail.component.html',
})
export class AddDetail {
  data: Detail = {
    type: typeDetail.BODY,
    data: '',
    articleId: 0,
  };
  constructor(
    public modalRef: MatDialogRef<AddDetail>,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public articles: any,
    private modal: MatDialog,
    private doc: DocumentationService
  ) {}

  save() {
    this.data.articleId = this.articles.id;
    for (const key of Object.keys(this.data)) {
      const value = this.data[key as keyof Detail];
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

@Component({
  selector: 'edit-detail-modal',
  templateUrl: './actions/edit.detail.modal.component.html',
})
export class EditDetailModal implements OnInit {
  result: any = {};
  constructor(
    public modalRef: MatDialogRef<EditDetailModal>,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ArticlesService
  ) {}

  ngOnInit(): void {
    this.service.getDetail(this.data.id).subscribe((result) => {
      console.log(result);
      this.result = result;
    });
  }
  save() {
    this.alert
      .showConfirmationAlert(
        'Update confirmation',
        'Do you realy wish to update this detail?'
      )
      .then((status) => {
        if (status) {
          this.result.articleId = 1;
          for (const key of Object.keys(this.result)) {
            const value = this.result[key];
            if (this.isEmpty(value)) {
              this.alert.showErrorAlert(`La key ${key} no puede estar vacia`);
              return;
            }
          }
          this.service
            .editArticleDetail(this.result, this.data.id)
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

@Component({
  selector: 'edit-article-modal',
  templateUrl: './actions/edit.article.modal.component.html',
})
export class EditArticleModal implements OnInit {
  result: any = {};
  constructor(
    public modalRef: MatDialogRef<EditDetailModal>,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ArticlesService
  ) {}
  ngOnInit(): void {
    this.service.getArticleById(this.data.id).subscribe((result) => {
      this.result = result;
    });
  }
  save() {
    this.alert
      .showConfirmationAlert(
        'Update confirmation',
        'Do you realy wish to update this detail?'
      )
      .then((status) => {
        if (status) {
          this.result.sectionId = 1;
          for (const key of Object.keys(this.result)) {
            const value = this.result[key];
            if (this.isEmpty(value)) {
              this.alert.showErrorAlert(`La key ${key} no puede estar vacia`);
              return;
            }
          }
          this.service
            .editArticle(this.result, this.data.id)
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
