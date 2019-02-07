import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe((resp: any) => this.cargarMedicos());
  }

  mostrarModal (id: string) {
    this._modalUploadService.mostrarModal('medicos', id);
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
      .subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicoService.buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.cargando = false;
      });
  }

  borrarMedico (medico: Medico) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then (borrar => {
      if (borrar) {
        this._medicoService.borrarMedico( medico._id )
        .subscribe(borrado => {
          this.cargarMedicos();
        });
      }
    });
  }
}
