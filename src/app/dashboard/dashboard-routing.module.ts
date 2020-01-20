import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EditorComponent } from './editor/editor.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:docId', component: EditorComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
