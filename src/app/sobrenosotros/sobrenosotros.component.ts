import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-sobrenosotros',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './sobrenosotros.component.html',
  styleUrl: './sobrenosotros.component.scss'
})
export class SobrenosotrosComponent implements OnInit {
  facilidades: any[] = [];
  seleccionada: any = null;
  errorCargando: boolean = false;
  textoSobreNosotros: string = '';

  private apiUrl = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Facilidades/Visibles';
  private apiUrlSobreNosotros = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/SobreNosotros';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarFacilidades();
    this.cargarTextoSobreNosotros();
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

  cargarTextoSobreNosotros() {
    this.http.get<any>(this.apiUrlSobreNosotros).subscribe({
      next: (data) => {
        this.textoSobreNosotros = data.texto;
      },
      error: (err) => {
        console.error('Error al cargar el texto descriptivo Sobre Nosotros:', err);
        this.errorCargando = true;
      }
    });
  }

  seleccionar(facilidad: any) {
    this.seleccionada = facilidad;
  }
}
