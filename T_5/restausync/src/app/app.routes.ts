import { Routes } from '@angular/router';


// Importa tus páginas
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FeaturesComponent } from './pages/features/features.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages//login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },        // página principal
  { path: 'about', component: AboutComponent },  // acerca de
  { path: 'features', component: FeaturesComponent }, // destacados
  { path: 'menu', component: MenuComponent },    // menú
  { path: 'contact', component: ContactComponent }, // contacto
  { path: '**', redirectTo: '' }, // rutas desconocidas -> Home
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];