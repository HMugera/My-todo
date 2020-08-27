import { TodoComponent } from './todo/todo.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  { path: '', component: CategoryComponent},
  { path: 'todo/:data.category/:id', component: TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
