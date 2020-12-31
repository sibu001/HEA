import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CommonRoutingModule } from './common-routing.module';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AgmCoreModule } from '@agm/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { GoogleMapComponent } from './google-map/google-map.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoundPipe } from '../pipes/round.pipe';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { TopicService } from '../store/topic-state-management/service/topic.service';
import { NgxsModule } from '@ngxs/store';
import { TopicManagementState } from '../store/topic-state-management/state/topic.state';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    DragDropModule,
    MatTableExporterModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapAPIKey, libraries: ['places']
    }),
    NgxsModule.forRoot([
      TopicManagementState
    ]),
  ],
  declarations: [TableComponent, GoogleMapComponent, SidebarComponent, RoundPipe, PasswordStrengthComponent],
  entryComponents: [GoogleMapComponent],
  exports: [TableComponent, SidebarComponent, RoundPipe, PasswordStrengthComponent],
  providers: [TopicService]
})
export class CommonHEAModule { }
