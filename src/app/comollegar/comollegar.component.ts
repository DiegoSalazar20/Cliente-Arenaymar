import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-comollegar',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './comollegar.component.html',
  styleUrl: './comollegar.component.scss'
})
export class ComollegarComponent implements OnInit {
  descripcion: string = '';
  mapaUrl: SafeResourceUrl = '';

  private apiUrl = 'http://arenaymar.somee.com/api/ComoLlegar';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.obtenerUbicacion();
  }

  obtenerUbicacion(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.descripcion = data.descripcion;
        this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://maps.google.com/maps?q=${data.latitud},${data.longitud}&z=14&output=embed`
        );
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }
}
