import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScriptDebugConsoleComponent } from './script-debug-console/script-debug-console.component';

const routes: Routes = [{
  path: 'scriptDebugConsole', component: ScriptDebugConsoleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebugRoutingModule { }
