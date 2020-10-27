import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeadersComponent } from 'src/app/headers/headers.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './role.guard';
const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './login/login.module#LoginModule'
      }
      ,
      {
        path: '',
        loadChildren: './registration/registration.module#RegistrationModule',
      }
    ]
  },
  {
    path: '',
    component: HeadersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: '',
        loadChildren: './survey/survey.module#SurveyModule',
      },
      {
        path: '',
        loadChildren: './leakListview/leakListview.module#leakListViewModule',
      },
      {
        path: '',
        loadChildren: './usageHistory/usageHistory.module#UsageHistoryModule',
      }
    ]
  },
  {
    path: 'admin',
    component: HeadersComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: 'customer',
        loadChildren: './admin/customer/customer.module#CustomerModule',
      },
      {
        path: 'program',
        loadChildren: './admin/program-group/program-group.module#ProgramGroupModule'
      },
      {
        path: 'customer-group',
        loadChildren: './admin/customer-group/customer-group.module#CustomerGroupModule'
      },
      {
        path: 'customer-alert',
        loadChildren: './admin/customer-alert-types/customer-alert-types.module#CustomerAlertTypesModule'
      },
      {
        path: 'credential-type',
        loadChildren: './admin/credential-type/credential-type.module#CredentialTypeModule'
      },
      {
        path: 'role',
        loadChildren: './admin/role/role.module#RoleModule'
      },
      {
        path: 'place',
        loadChildren: './admin/place/place.module#PlaceModule'
      }

    ]
  },
  // {
  //   path: '**',
  //   redirectTo: '/guest/404'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
