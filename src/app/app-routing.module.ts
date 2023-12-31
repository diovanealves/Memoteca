import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateThoughtComponent } from './components/thoughts/create-thought/create-thought.component';
import { ListThoughtComponent } from './components/thoughts/list-thought/list-thought.component';
import { ExcludeThoughtComponent } from './components/thoughts/exclude-thought/exclude-thought.component';
import { EditThoughtComponent } from './components/thoughts/edit-thought/edit-thought.component';

const routes: Routes = [
  {path: "", component: ListThoughtComponent},
  {path: "criarPensamento", component: CreateThoughtComponent},
  {path: "pensamentos/excluirPensamento/:id", component: ExcludeThoughtComponent},
  {path: "pensamentos/editarPensamento/:id", component: EditThoughtComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
