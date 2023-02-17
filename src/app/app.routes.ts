import { RedirectionComponent } from './redirection/redirection.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeadersComponent } from 'src/app/headers/headers.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './role.guard';
import { MultipleRoleGuardService } from './multiple-role.guard';
import { StaffAdminRoleGuardGuard } from './staff-admin-role-guard.guard';
const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path : 'redirection',
    component: RedirectionComponent
  },{
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
      // {
      //   path: '',
      //   loadChildren: './usageHistory/usageHistory.module#UsageHistoryModule',
      // },
      {
        path: 'electricity',
        loadChildren: './electricity/electricity.module#ElectricityModule'
      },
      {
        path: 'gas',
        loadChildren: './gas/gas.module#GasModule'
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
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/program-group/program-group.module#ProgramGroupModule'
      },
      {
        path: 'customer-group',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/customer-group/customer-group.module#CustomerGroupModule'
      },
      {
        path: 'customer-alert',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/customer-alert-types/customer-alert-types.module#CustomerAlertTypesModule'
      },
      {
        path: 'credential-type',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/credential-type/credential-type.module#CredentialTypeModule'
      },
      {
        path: 'role',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/role/role.module#RoleModule'
      },
      {
        path: 'place',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/place/place.module#PlaceModule'
      },
      {
        path: 'customerEvent',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/customer-event/customer-event.module#CustomerEventModule'
      },
      {
        path: 'customerComparisonGroup',
        canActivate : [MultipleRoleGuardService],
        loadChildren:
          './admin/customer-comparison-groups/customer-comparison-groups.module#CustomerComparisonGroupsModule'
      },
      {
        path: 'factor',
        canActivate : [MultipleRoleGuardService],
        loadChildren:
          './admin/factor/factor.module#FactorModule'
      },
      {
        path: 'lookup',
        canActivate : [MultipleRoleGuardService],
        loadChildren:
          './admin/lookups/lookup.module#LookupModule'
      },
      {
        path: 'systemParameter',
        canActivate : [MultipleRoleGuardService],
        loadChildren:
          './admin/system-parameter/system-parameter.module#SystemParameterModule'
      },
      {
        path: 'weatherStation',
        canActivate : [MultipleRoleGuardService],
        loadChildren:
          './admin/weather-station/weather-station.module#WeatherStationModule'
      },
      {
        path: 'logs',
        canActivate : [MultipleRoleGuardService],
        loadChildren:
          './admin/logs/logs.module#LogsModule'
      },
      {
        path: 'debug',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/debug/debug.module#DebugModule'
      },
      {
        path: 'degreeDays',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/degree-days/degree-days.module#DegreeDaysModule'
      },
      {
        path: 'cimisStation',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/cimis-station/cimis-station.module#CimisStationModule'
      },
      {
        path: 'cimisMeasurements',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/cimis-measurements/cimis-measurements.module#CimisMeasurementsModule'
      },
      {
        path: 'batchScript',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/batch-script/batch-script.module#BatchScriptModule'
      },
      {
        path: 'systemJobs',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/system-jobs/system-jobs.module#SystemJobsModule'
      },
      {
        path: 'ec2Instances',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/ec2-instances/ec2-instances.module#Ec2InstancesModule'
      },
      {
        path: 'alertMessages',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/alert-messages/alert-messages.module#AlertMessagesModule'
      },
      {
        path: 'topicDescription',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/topic-description/topic-description.module#TopicDescriptionModule'
      },
      {
        path: 'staff',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/staff/staff.module#StaffModule'
      },
      {
        path: 'topic',
        loadChildren: './admin/topic-list/topic-list.module#TopicListModule'
      },
      {
        path: 'administrativeReport',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/administrative-reports/administrative-reports.module#AdministrativeReportsModule'
      },
      {
        path: 'prospects',
        loadChildren: './admin/prospects/prospects.module#ProspectsModule'
      },
      {
        path: 'eventHistory',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/event-history/event-history.module#EventHistoryModule'
      },
      {
        path: 'mailDescription',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/mail-description/mail-description.module#MailDescriptionModule'
      },
      {
        path: 'customerGroupMailParts',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/customer-group-mail-parts/customer-group-mail-parts.module#CustomerGroupMailPartsModule'
      },
      {
        path: 'userReportDefinitions',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/user-report-definitions/user-report-definitions.module#UserReportDefinitionsModule'
      },
      {
        path: 'jsPages',
        canActivate : [StaffAdminRoleGuardGuard],
        loadChildren: './admin/js-pages/js-pages.module#JsPagesModule'
      },
      {
        path: 'viewConfiguration',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/view-configuration/view-configuration.module#ViewConfigurationModule'
      },
      {
        path: 'keyIndicator',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/key-indicator/key-indicator.module#KeyIndicatorModule'
      },
      {
        path: 'trendingChartDefinition',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/trending-chart-definition/trending-chart-definition.module#TrendingChartDefinitionModule'
      },
      {
        path: 'summaryChartDefinition',
        canActivate : [MultipleRoleGuardService],
        loadChildren: './admin/summary-chart-definition/summary-chart-definition.module#SummaryChartDefinitionModule'
      },
      {
        path: 'shareMyData',
        loadChildren: './admin/share-my-data/share-my-data.module#ShareMyDataModule'
      },
      {
        path: 'waterUsageHistory',
        loadChildren: './admin/water-usage-history/water-usage-history.module#WaterUsageHistoryModule'
      },
      {
        path: 'electricity',
        loadChildren: './electricity/electricity.module#ElectricityModule'
      },
      {
        path: 'gas',
        loadChildren: './gas/gas.module#GasModule'
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
