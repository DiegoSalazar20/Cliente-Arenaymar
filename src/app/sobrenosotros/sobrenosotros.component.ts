import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-facilidades',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './sobrenosotros.component.html',
  styleUrl: './sobrenosotros.component.scss'
})
export class SobrenosotrosComponent implements OnInit {
  facilidades: any[] = [];
  seleccionada: any = null;
  errorCargando: boolean = false;

  private apiUrl = 'http://arenaymar.somee.com/api/Facilidades/Visibles';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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

  seleccionar(facilidad: any) {
    this.seleccionada = facilidad;
  }
}
