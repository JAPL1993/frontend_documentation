import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { DocumentationDetailComponent } from './views/documentation-detail/documentation-detail.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MenuService } from './menu.service';
import { AlertService } from './alert.service';
import { DocumentationService } from './views/documentation-detail/documentation.service';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [AppComponent, SidebarComponent, DocumentationDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    StoreModule.forRoot({}, {}),
    NgxJsonViewerModule,
    MatTableModule,
  ],
  providers: [MenuService, AlertService, DocumentationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
