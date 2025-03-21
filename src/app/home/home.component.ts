import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  contenido: any[] = [];
  imagenPrincipal: string = '';
  contenidoPrincipal: string = '';
  errorCargandoContenido: boolean = false;

  private apiUrl = 'http://arenaymar.somee.com/api/Home';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    this.obtenerContenido();
  }

  obtenerContenido() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.imagenPrincipal = data.imagen;
        this.contenidoPrincipal = data.contenido;
      },
      error: (err) => {
        console.error('Error obteniendo contenido:', err);
        this.errorCargandoContenido = true;
      }
    });
  }
}