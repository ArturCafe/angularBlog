import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatecategoryComponent } from './createcategory.component';


const routes: Routes = [
  {path:'admin/create-category',component:CreatecategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatecategoryRoutingModule { }
