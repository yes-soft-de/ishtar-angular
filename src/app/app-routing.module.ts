import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListItemsComponent} from './components/list-items/list-items.component';
import {ItemComponent} from './components/item/item.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: ListItemsComponent},
  {path: 'item/:id', component: ItemComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
