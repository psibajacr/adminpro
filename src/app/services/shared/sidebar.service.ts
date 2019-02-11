import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     subMenu: [
  //       {
  //         titulo: 'Dashboard',
  //         url: '/dashboard'
  //       },
  //       {
  //         titulo: 'ProgressBar',
  //         url: '/progress'
  //       },
  //       {
  //         titulo: 'Gráficas',
  //         url: '/graficas1'
  //       },
  //       {
  //         titulo: 'Promesas',
  //         url: '/promesas'
  //       },
  //       {
  //         titulo: 'RXJS',
  //         url: '/rxjs'
  //       }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     subMenu: [
  //       {
  //         titulo: 'Usuarios',
  //         url: '/usuarios'
  //       },
  //       {
  //         titulo: 'Hospitales',
  //         url: '/hospitales'
  //       },
  //       {
  //         titulo: 'Médicos',
  //         url: '/medicos'
  //       }
  //     ]
  //   }
  // ];

  constructor(
    public _usuarioService: UsuarioService
  ) {

   }

   cargarMenu() {
    this.menu = this._usuarioService.menu;
   }
}
