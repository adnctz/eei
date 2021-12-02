import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { UsersModule } from './users/users.module';

const routes: Routes = [{
  path: '',
  component: ShellComponent,
  loadChildren: () => UsersModule
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
