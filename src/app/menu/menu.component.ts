import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, HttpClientModule],

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  publicidades: any[] = [];
  apiPublicidad = 'https://arenaymar-frdyg5caarhsd2g5.eastus-01.azurewebsites.net/api/Publicidad/Visibles'
  imagenAnterior: any = null;
  listaPublicidades: any[] = [];
  publicidadAnterior: any = null;
  indiceActual: number = 0;
  animacionPendiente: boolean = false;
  public menuOpen: boolean = false;

  @ViewChild('imagen') imagen!: ElementRef<HTMLImageElement>;


  ngOnInit(): void {
    this.http.get<any[]>(this.apiPublicidad).subscribe((datos) => {
      this.listaPublicidades = datos;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  mostrarSiguientePublicidad(): void {
    if (this.listaPublicidades.length > 0) {
      this.publicidadAnterior = this.listaPublicidades[this.indiceActual];
      this.indiceActual = (this.indiceActual + 1) % this.listaPublicidades.length;
      this.animacionPendiente = true;
      setTimeout(() => {
        this.publicidadAnterior = null;
      }, 400);
    }
  }


  ngAfterViewChecked(): void {
    if (this.animacionPendiente) {
      const img = this.imagen?.nativeElement;
      if (img) {
        img.classList.remove('entrar-derecha');
        void img.offsetWidth;
        img.classList.add('entrar-derecha');
        this.animacionPendiente = false;
      }
    }
  }


  redirigir(ruta: string) {
    this.router.navigate([ruta]);
  }
}
