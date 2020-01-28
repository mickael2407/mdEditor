import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { AuthGuard } from '../service/auth/auth.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'editor', canActivate: [AuthGuard], component: EditorComponent },
    { path: 'editor/:docId', canActivate: [AuthGuard], component: EditorComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
