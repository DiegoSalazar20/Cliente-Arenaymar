import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComollegarComponent } from './comollegar/comollegar.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { FacilidadesComponent } from './facilidades/facilidades.component';
import { ReservaenlineaComponent } from './reservaenlinea/reservaenlinea.component';
import { SobrenosotrosComponent } from './sobrenosotros/sobrenosotros.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'comollegar', component: ComollegarComponent },
    { path: 'contactenos', component: ContactenosComponent },
    { path: 'facilidades', component: FacilidadesComponent },
    { path: 'reservaenlinea', component: ReservaenlineaComponent },
    { path: 'sobrenosotros', component: SobrenosotrosComponent },
    { path: 'tarifas', component: TarifasComponent },
  ];
