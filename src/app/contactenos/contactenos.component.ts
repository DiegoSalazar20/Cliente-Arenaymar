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
  errorCargando: boolean = false;
  textoContactenosTelefono: string = '';
  textoContactenosCorreo: string = '';
  textoContactenosApartado: string = '';

  private apiUrlContactenos = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Contactenos';

  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    this.cargarTextoContactenos();
  }

  cargarTextoContactenos() {
    this.http.get<any>(this.apiUrlContactenos).subscribe({
      next: (data) => {
        this.textoContactenosTelefono = data.telefono;
        this.textoContactenosCorreo= data.correo;
        this.textoContactenosApartado= data.apdoPostal;
      },
      error: (err) => {
        console.error('Error al cargar el texto sobre nuestros contactos:', err);
        this.errorCargando = true;
      }
    });
  }
}
