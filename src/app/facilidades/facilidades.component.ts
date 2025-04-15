import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-facilidades',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './facilidades.component.html',
  styleUrl: './facilidades.component.scss'
})
export class FacilidadesComponent implements OnInit {
  facilidades: any[] = [];
  errorCargando: boolean = false;
  index = 0;

  private apiUrl = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Facilidades/Visibles';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.facilidades = data;
      },
      error: (err) => {
        console.error('Error al cargar facilidades:', err);
        this.errorCargando = true;
      }
    });
  }

}