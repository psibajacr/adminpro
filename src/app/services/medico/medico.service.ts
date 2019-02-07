import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  buscarMedicos (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medicos)
      );
  }

  borrarMedico (id: string) {
    let url = URL_SERVICIOS + `/medico/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url).pipe(
      map(resp => {
        swal('Médico borrado',  'El médico ha sido eliminado correctamente.', 'success');
        return true;
      })
    );
  }

  guardarMedico( medico: Medico) {
    let url = URL_SERVICIOS;

    if (medico._id) {
      // actualizar
      url += `/medico/${medico._id}?token=${this._usuarioService.token}`;

      return this.http.put(url, medico).pipe(
        map( (resp: any) => {
          swal('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      url += `/medico?token=${this._usuarioService.token}`;
      // crear
      return this.http.post(url, medico).pipe(
        map( (resp: any) => {
          swal('Médico creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }
  }

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + `/medico/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }
}
