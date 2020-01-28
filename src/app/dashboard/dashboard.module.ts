import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { NgxMdModule } from 'ngx-md';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsService } from '../service/docs.service';
import { CatService } from '../service/cat.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DashboardComponent, EditorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMdModule.forRoot(),
    DashboardRoutingModule,
  ],
  providers: [
    DocsService,
    CatService
  ]
})
export class DashboardModule { }
