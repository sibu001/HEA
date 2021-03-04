import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from 'src/app/survey/survey.component';
import { TopicHistoryComponent } from 'src/app/survey/topichistory.component';
import { surveyRecommendationListComponent } from 'src/app/survey/surveyRecommendationList.component';
import { RecommendationInstructionComponent } from 'src/app/survey/recommendationInstruction.component';
import { NgModule } from '@angular/core';

export const SurveyRoutes: Routes = [
    { path: 'surveyView', component: SurveyComponent },
    { path: 'topicshistory', component: TopicHistoryComponent },
    { path: 'surveyRecommendationList', component: surveyRecommendationListComponent },
    { path: 'recommendationInstruction', component: RecommendationInstructionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(SurveyRoutes)],
    exports: [RouterModule]
})
export class SurveyRoutingModule { }
