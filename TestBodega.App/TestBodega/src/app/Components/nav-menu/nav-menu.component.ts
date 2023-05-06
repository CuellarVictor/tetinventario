import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(
    private services:ProductoService,
    private router: Router
  ) {

    let rol = this.services.getRol();

   }

  getRol()
  {
    let rol = this.services.getRol();
    return rol;
  }  

}
