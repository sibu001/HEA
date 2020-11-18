import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewConfigurationAttributesEditComponent } from './view-configuration-attributes-edit/view-configuration-attributes-edit.component';
import { ViewConfigurationAttributesComponent } from './view-configuration-attributes/view-configuration-attributes.component';
import { ViewConfigurationEditComponent } from './view-configuration-edit/view-configuration-edit.component';
import { ViewConfigurationListComponent } from './view-configuration-list/view-configuration-list.component';

const routes: Routes = [
  { path: 'viewConfigurationList', component: ViewConfigurationListComponent },
  { path: 'viewConfigurationEdit', component: ViewConfigurationEditComponent },
  { path: 'viewConfigurationAttributeList', component: ViewConfigurationAttributesComponent },
  { path: 'viewConfigurationAttributeEdit', component: ViewConfigurationAttributesEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewConfigurationRoutingModule { }
