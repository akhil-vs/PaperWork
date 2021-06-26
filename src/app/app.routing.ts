import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login';
import { Role } from './_models/role';

const routes: Routes =[
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(
          m => m.AdminLayoutModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import("./profile/profile.module").then(
          m => m.ProfileModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import("./admin/admin.module").then(
          m => m.AdminModule
        ),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(
      m => m.AccountModule
    ),
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

// Name	Rolando Cartwright
// Username	rolando24@ethereal.email (also works as a real inbound email address)
// Password	4wvEezNTGwv4rHCCp8