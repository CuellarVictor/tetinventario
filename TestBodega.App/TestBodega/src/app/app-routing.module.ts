import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionBodegaComponent } from './Components/gestion-bodega/gestion-bodega.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  { path:'productos', component: ProductosComponent },
  { path:'gestionbodega', component: GestionBodegaComponent },
  { path:'login', component: LoginComponent },
  { path:'user', component: UserComponent },
  { path:'**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
