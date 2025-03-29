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
  textoSobreNosotros: any = null;

  private apiUrl = 'http://arenaymar.somee.com/api/Facilidades/Visibles';
  private apiUrlSobreNosotros =  'http://arenaymar.somee.com/api/SobreNosotros';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.facilidades = data;
        this.seleccionada = data[0]; 

        this.http.get<any[]>(this.apiUrlSobreNosotros).subscribe({
          next: (data2) => {
            this.textoSobreNosotros = data2;
          },
          error: (err2) => {
            console.error('Error al cargar el texto descriptivo Sobre Nosotros:', err2);
            this.errorCargando = true;
          }
        });  

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
