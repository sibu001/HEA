import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginRoutes } from "src/app/login/login.routes";
import { LoginComponent } from "src/app/login/login.component";
import { HeadersComponent } from "src/app/headers/headers.component";
import { RegistrationRoutes } from "src/app/registration/registration.routes";
import { SurveyRoutes } from "src/app/survey/survey.routes";
import { DashboardRoutes } from "src/app/dashboard/dashboard.routes";
import { leakListViewRoutes } from "src/app/leakListview/leakListview.routes";
import { HeaderRoutes } from "src/app/headers/headers.routes";
import { UsageHistoryRoutes } from "src/app/usageHistory/usageHistory.routes";

export const ROUTES: Routes = [
    
     {
        path:'',
        component:HeadersComponent,
        canActivate:[AuthGuard],
        children:[
            ...DashboardRoutes,
            ...SurveyRoutes,
            ...leakListViewRoutes,
            ...UsageHistoryRoutes
        ]
    }, {
        path:'',
        canActivate:[AuthGuard],
        children:[
            ...HeaderRoutes
        ]
    },
    {
        path:'', 
        children:[
            ...LoginRoutes,
            ...RegistrationRoutes
        ]
    }
]