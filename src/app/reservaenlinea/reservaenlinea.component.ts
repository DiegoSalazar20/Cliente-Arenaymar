import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BloqueoRespuesta {
  success: boolean;
  idHabitacion: number;
  token: string;
  expiracion: string;
  message: string;
}

@Component({
  selector: 'app-reservaenlinea',
  imports: [CommonModule, MenuComponent, HttpClientModule, FormsModule],
  templateUrl: './reservaenlinea.component.html',
  styleUrl: './reservaenlinea.component.scss'
})

export class ReservaenlineaComponent {
  fechaLlegada!: Date;
  fechaSalida!: Date;
  tipoHabitacion: string = '';

  tiposDisponibles: any[] = [];
  mensajeError: string = '';
  mensajeInfo: string = '';

  mostrarModal: boolean = false;
  mostrarModalConfirmacion: boolean = false;
  mostrarModalError: boolean = false;
  tipoSeleccionado: any; 

  nombreReserva: string = '';
  apellidoReserva: string = '';
  emailReserva: string = '';
  tarjetaCompleta: string = '';
  mensajeErrorModal: string = '';
  numeroReserva: string ='';

  cerrandoModal: boolean = false;
  cerrandoConfirmacion: boolean = false;
  cerrandoError: boolean = false;

  cargandoConsulta: boolean = false;

  mostrarSpinnerCentral: boolean = false;

  bloqueoToken!: string;
  idHabitacionBloqueada!: number;

  hoy: string = new Date().toISOString().split('T')[0];
  

  constructor(private http: HttpClient, ){}

  

  ConsultarDisponibilidad() {
    this.tiposDisponibles=[];
    this.mensajeError='';
    this.mensajeInfo='';
    

    if (!this.fechaLlegada || !this.fechaSalida) {
      this.mensajeError = 'Debe ingresar ambas fechas.';
      return;
    }

    const fechaLlegada = new Date(this.fechaLlegada);
    const fechaSalida = new Date(this.fechaSalida);

    if (fechaLlegada.getTime() === fechaSalida.getTime()) {
      this.mensajeError = 'La fecha de llegada y la de salida no pueden ser iguales.';
      return;
    }
    if (fechaLlegada > fechaSalida) {
      this.mensajeError = 'La fecha de llegada no puede ser posterior a la fecha de salida.';
      return;
    }

    this.cargandoConsulta=true;
    let params = new HttpParams()
      .set('fechainicio', fechaLlegada.toISOString())
      .set('fechafin', fechaSalida.toISOString());

    if (this.tipoHabitacion) {
      if (this.tipoHabitacion !== "") {
        params = params.set('idTipoHabitacion', this.tipoHabitacion.toString());
      }
    }
    let apiUrl = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Habitacion/Disponibilidad';
    this.http.get<any[]>(apiUrl, { params: params }).subscribe({
      next: (response) => {
        if (response.length === 0) {
          if (this.tipoHabitacion && this.tipoHabitacion.trim() !== "") {
            this.mensajeInfo = "No hay habitaciones del tipo seleccionado, pero se mostrarán otros disponibles.";
            this.CargarDisponibles();
          } else {
            this.mensajeInfo = "No hay habitaciones disponibles para esas fechas.";
            this.tiposDisponibles = [];
            this.cargandoConsulta=false;
          }
        } else {
          this.tiposDisponibles = response;
          this.cargandoConsulta=false;
        }
      },
      error: (error) => {
        console.error(error);
        this.mensajeError = 'Ocurrió un error al consultar la disponibilidad.';
        this.cargandoConsulta=false;
      }
    });
  }

  CargarDisponibles() {
    this.tiposDisponibles=[];
    if (!this.fechaLlegada || !this.fechaSalida) {
      this.mensajeError = 'Debe ingresar ambas fechas.';
      return;
    }

    const fechaLlegada = new Date(this.fechaLlegada);
    const fechaSalida = new Date(this.fechaSalida);

    if (fechaLlegada.getTime() === fechaSalida.getTime()) {
      this.mensajeError = 'La fecha de llegada y la de salida no pueden ser iguales.';
      return;
    }
    if (fechaLlegada > fechaSalida) {
      this.mensajeError = 'La fecha de llegada no puede ser posterior a la fecha de salida.';
      return;
    }
    let params = new HttpParams()
      .set('fechainicio', fechaLlegada.toISOString())
      .set('fechafin', fechaSalida.toISOString());

    let apiUrl = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Habitacion/Disponibilidad';
    this.http.get<any[]>(apiUrl, { params: params }).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.mensajeInfo = "No hay habitaciones disponibles para esas fechas.";
          this.tiposDisponibles = [];
          this.cargandoConsulta=false;
        } else {
          this.tiposDisponibles = response;
          this.cargandoConsulta=false;
        }
      },
      error: (error) => {
        console.error(error);
        this.mensajeError = 'Ocurrió un error al consultar la disponibilidad.';
        this.cargandoConsulta=false;
      }
    });
  }

  abrirModalReserva(tipo: any) {

    this.mostrarSpinnerCentral=true;

    const url = 
      `https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net` +
      `/api/Habitacion/BloquearHabitacion` +
      `?idTipoHabitacion=${tipo.IdTipoHabitacion}` +
      `&fechaLlegada=${encodeURIComponent(this.fechaLlegada+'')}` +
      `&fechaSalida=${encodeURIComponent(this.fechaSalida+'')}`;

    this.http.post<BloqueoRespuesta>(url, null).subscribe({
      next: hold => {
        if (!hold.success) {
          this.mensajeError = hold.message;
          return;
        }
        this.idHabitacionBloqueada = hold.idHabitacion;
        this.bloqueoToken       = hold.token;

        this.tipoSeleccionado   = tipo;
        this.nombreReserva      = '';
        this.apellidoReserva    = '';
        this.emailReserva       = '';
        this.tarjetaCompleta    = '';
        this.mensajeErrorModal  = '';
        this.mostrarSpinnerCentral=false;
        this.mostrarModal       = true;
      },
      error: err => {
        console.error('Error al bloquear habitación', err);
        this.mostrarSpinnerCentral=false;
        this.mensajeError = 'No se pudo bloquear la habitación. Intente de nuevo.';
      }
    });
  }

  abrirModalConfirmacion() {
    this.mostrarModalConfirmacion = true;
  }

  abrirModalError() {
    this.mostrarModalError = true;
  }

  cerrarModal() {
    this.cerrandoModal = true;
  }

  cerrarModalConfirmacion() {
    this.cerrandoConfirmacion = true;
  }

  cerrarModalError() {
    this.cerrandoError = true;
  }

  onAnimationEnd(tipo: 'modal' | 'confirmacion' | 'error') {
    if (tipo === 'modal' && this.cerrandoModal) {
      this.mostrarModal = false;
      this.cerrandoModal = false;
    }
    if (tipo === 'confirmacion' && this.cerrandoConfirmacion) {
      this.mostrarModalConfirmacion = false;
      this.cerrandoConfirmacion = false;
    }
    if (tipo === 'error' && this.cerrandoError) {
      this.mostrarModalError = false;
      this.cerrandoError = false;
    }
  }

  confirmarReserva() {
    this.mensajeError='';
    this.mensajeInfo='';
    if (!this.nombreReserva || !this.apellidoReserva || !this.emailReserva || !this.tarjetaCompleta) {
      this.mensajeErrorModal = 'Complete todos los campos.';
      return;
    }

    if (!this.validarTarjetaLuhn(this.tarjetaCompleta)) {
      this.mensajeErrorModal = 'La tarjeta no es válida.';
      return;
    }

    if(!this.validarEmail(this.emailReserva)){
      this.mensajeErrorModal = 'Ingrese un correo electrónico válido.';
      return;
    }

    this.mostrarSpinnerCentral = true;

    const fechaLlegada = new Date(this.fechaLlegada);
    const fechaSalida = new Date(this.fechaSalida);

    let ultimos4 = this.tarjetaCompleta.slice(-4);
    ultimos4+='';

    let body: any = {
      idHabitacion: this.idHabitacionBloqueada,
      bloqueoToken: this.bloqueoToken,
      nombre: this.nombreReserva,
      apellidos: this.apellidoReserva,
      correo: this.emailReserva,
      tarjeta: ultimos4,
      fechaLlegada: fechaLlegada.toISOString(),
      fechaSalida: fechaSalida.toISOString()
    };

    this.http.post('https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Reserva', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (resp: any) => {
        console.log('Reserva exitosa', resp);
        this.bloqueoToken='';
        this.idHabitacionBloqueada=0
        this.enviarCorreoReserva(resp.codigoReserva);
        this.cerrarModal();
        this.tiposDisponibles=[];
      },
      error: (err) => {
        console.error(err);
        if (err.status === 400 && err.error && err.error.success === false) {
          this.mostrarSpinnerCentral = false;
          this.cerrarModal();
          this.mensajeInfo = "No hay habitaciones del tipo seleccionado, pero se mostrarán otros disponibles.";
          this.CargarDisponibles();
          this.abrirModalError();
        } else {
          this.mostrarSpinnerCentral = false;
          this.mensajeErrorModal = 'Ocurrió un error al registrar la reserva.';
        }
      }
    });
  }

  private validarTarjetaLuhn(numTarjeta: string): boolean {
    const cleanNumber = numTarjeta.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
  }

  private enviarCorreoReserva(codigoReserva: string): void {
    const fechaLlegadaObj = new Date(this.fechaLlegada);
    const fechaSalidaObj = new Date(this.fechaSalida);
    let codigo = codigoReserva.slice(-14);
    this.numeroReserva=codigo;
    const correoBody = {
      codigoReserva: codigo,
      nombre: this.nombreReserva,
      apellidos: this.apellidoReserva,
      correo: this.emailReserva,
      fechaLlegada: fechaLlegadaObj.toISOString(),
      fechaSalida: fechaSalidaObj.toISOString(),
      tipoHabitacion: this.tipoSeleccionado?.Nombre
    };
  
    this.http.post('https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Correo', JSON.stringify(correoBody), {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).subscribe({
      next: (resp: string) => {
        this.mostrarSpinnerCentral = false;
        this.abrirModalConfirmacion();
      },
      error: (err) => {
        this.mostrarSpinnerCentral = false;
        console.error('Error al enviar el correo:', err);
      }
    });
  }

  private validarEmail(email: string): boolean {
    const patron = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return patron.test(email);
  }
}