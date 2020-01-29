import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeadersComponent } from "src/app/headers/headers.component";
import { NgModule } from '@angular/core';

// export const ROUTES: Routes = [
    
//      {
//         path:'',
//         component:HeadersComponent,
//         canActivate:[AuthGuard],
//         children:[
//             ...DashboardRoutes,
//             ...SurveyRoutes,
//             ...leakListViewRoutes,
//             ...UsageHistoryRoutes
//         ]
//     }, {
//         path:'',
//         canActivate:[AuthGuard],
//         children:[
//             ...HeaderRoutes
//         ]
//     },
//     {
//         path:'', 
//         children:[
//             ...LoginRoutes,
//             ...RegistrationRoutes
//         ]
//     }
// ]

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
      canActivate:[AuthGuard],
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
        },
      ]
    },
    {
      path: '',
      canActivate:[AuthGuard],
      children: [
        {
          path: '',
          loadChildren: './headers/header.module#HeaderModule'
        }
      ]
    }
    // {
    //   path: '**',
    //   redirectTo: '/guest/404'
    // }
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(ROUTES, { useHash: true}),],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  