import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/service.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean;
  totalRegistros: number = 0;
  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe((resp: any) => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        this.totalRegistros = this._hospitalService.totalHospitales;
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  buscarHospital (termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  mostrarModal (id: string) {
    this._modalUploadService.mostrarModal('hospital', id);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
  }

  borrarHospital ( hospital: Hospital ) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then (borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id)
        .subscribe(resp => {
          this.cargarHospitales();
        });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      content: {
        element: 'input'
      },
      icon: 'info',
      buttons: [true, true],
      dangerMode: true
    })
    .then((valor: string) => {
      if ( !valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
      .subscribe(() => {
        this.cargarHospitales();
      });
    });
  }
}
