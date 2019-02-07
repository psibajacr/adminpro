import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
       return resp.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + `/hospital/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + `/hospital/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url).pipe(
      map(resp => swal('Hospital borrado', 'Eliminado correctamente', 'success'))
    );
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + `/hospital?token=${this._usuarioService.token}`;

    return this.http.post(url, { nombre }).pipe(
      map( (resp: any) => {
        swal('Hospital creado', nombre, 'success');
        return resp.hospital;
      })
    );
  }

  buscarHospital (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.hospitales)
      );
  }

  actualizarHospital (hospital: Hospital) {
    let url = URL_SERVICIOS + `/hospital/${hospital._id}?token=${this._usuarioService.token}`;

    return this.http.put(url, hospital).pipe(
      map( (resp: any) => {
        swal('Hospital actualizado correctamente', hospital.nombre, 'success');
        return resp.hospital;
      })
    );
  }
}
