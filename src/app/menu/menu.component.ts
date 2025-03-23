import { Component, OnInit,AfterViewChecked, ViewChild, ElementRef,  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, HttpClientModule ],
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  publicidades: any[] = [];
  indiceActual = 0;
  apiPublicidad='http://arenaymar.somee.com/api/Publicidad/Visibles'
  animacionPendiente = false;
  imagenAnterior: any = null;

  @ViewChild('imagen') imagen!: ElementRef<HTMLImageElement>;


  ngOnInit(): void {
    this.http
      .get<any[]>(this.apiPublicidad)
      .subscribe((data) => {
        this.publicidades = data;
      });
  }

  siguientePublicidad(): void {
    if (this.publicidades.length > 0) {
      this.imagenAnterior = this.publicidades[this.indiceActual];
      this.indiceActual = (this.indiceActual + 1) % this.publicidades.length;
      this.animacionPendiente = true;
      setTimeout(() => {
        this.imagenAnterior = null;
      }, 400);
    }
  }
  

  ngAfterViewChecked(): void {
    if (this.animacionPendiente) {
      const img = this.imagen?.nativeElement;
      if (img) {
        img.classList.remove('slide-in');
        void img.offsetWidth;
        img.classList.add('slide-in');
        this.animacionPendiente = false;
      }
    }
  }
  

  redirigir(ruta: string) {
    this.router.navigate([ruta]);
  }
}
