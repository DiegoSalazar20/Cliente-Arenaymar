import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-contactenos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.scss'
})
export class ContactenosComponent implements OnInit {
  facilidades: any[] = [];
  seleccionada: any = null;
  errorCargando: boolean = false;
  textoContactenosTelefono: string = '';
  textoContactenosCorreo: string = '';
  textoContactenosApartado: string = '';

  private apiUrl = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Facilidades/Visibles';
  private apiUrlContactenos = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Contactenos';

  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    this.cargarFacilidades();
    this.cargarTextoContactenosTelefono();
    this.cargarTextoContactenosCorreo();
    this.cargarTextoContactenosA();
  }



  cargarFacilidades() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.facilidades = data;
        this.seleccionada = data[0];
      },
      error: (err) => {
        console.error('Error al cargar facilidades:', err);
        this.errorCargando = true;
      }
    });
  }

  cargarTextoContactenosTelefono() {
    this.http.get<any>(this.apiUrlContactenos).subscribe({
      next: (data) => {
        this.textoContactenosTelefono = data.telefono;
      },
      error: (err) => {
        console.error('Error al cargar el texto sobre nuestros contactos:', err);
        this.errorCargando = true;
      }
    });
  }

  cargarTextoContactenosCorreo() {
    this.http.get<any>(this.apiUrlContactenos).subscribe({
      next: (data) => {
        this.textoContactenosCorreo = data.correo;
      },
      error: (err) => {
        console.error('Error al cargar el texto sobre nuestros contactos:', err);
        this.errorCargando = true;
      }
    });
  }

  cargarTextoContactenosA() {
    this.http.get<any>(this.apiUrlContactenos).subscribe({
      next: (data) => {
        this.textoContactenosApartado = data.apdoPostal;
      },
      error: (err) => {
        console.error('Error al cargar el texto sobre nuestros contactos:', err);
        this.errorCargando = true;
      }
    });
  }

  seleccionar(facilidad: any) {
    this.seleccionada = facilidad;
  }

}
