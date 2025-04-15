import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarifas',
  imports: [CommonModule, MenuComponent, HttpClientModule, FormsModule],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent implements OnInit {

  tiposHabitacion: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.ObtenerTarifas();
  }

  ObtenerTarifas(){
    let apiUrl = 'http://arenaymar.somee.com/api/TipoHabitacion/ObtenerOfertas';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.tiposHabitacion = [];
        } else {
          this.tiposHabitacion = response;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}