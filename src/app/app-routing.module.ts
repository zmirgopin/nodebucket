/**
 * Title: app-routing.module.ts
 * Author: Zahava Gopin
 * Date: 10/29/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { authGuardGuard } from './auth-guard.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Nodebucket: Home', // title for the home page
      },
      { path: '404', component: NotFoundComponent },

      {
        path: 'home',
        component: HomeComponent,
        title: 'Nodebucket: Home',
      },
      // <!-- home,about,contact,signin, tasks -->
      {
        path: 'about',
        component: AboutComponent,
        title: 'Nodebucket: About',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Nodebucket: Contact',
      },
      {
        path: 'signin',
        component: SignInComponent,
        title: 'Nodebucket: Sign-in',
      },
      {
        path: 'tasks',
        canActivate: [authGuardGuard],
        component: TasksComponent,
        title: 'Nodebucket: Tasks',
      },
    ],
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
  },
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
