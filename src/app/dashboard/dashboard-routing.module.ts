import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { AuthGuard } from '../service/auth/auth.guard';
import { AnnuaireComponent } from './annuaire/annuaire.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'editor', canActivate: [AuthGuard], component: EditorComponent },
    { path: 'editor/:docId', canActivate: [AuthGuard], component: EditorComponent },
    { path: 'public',canActivate: [AuthGuard], component: AnnuaireComponent},
    { path: 'view/:docId', canActivate: [AuthGuard], component: ViewComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
