import { Routes } from '@angular/router';
import { RegistrationComponent } from "src/app/registration/registration.component";
import { CustomerRegistrationComponent } from "src/app/registration/customerRegistration.component";
import { SurveyComponent } from "src/app/survey/survey.component";
import {TopicHistoryComponent} from "src/app/survey/topichistory.component";
import {surveyRecommendationListComponent} from "src/app/survey/surveyRecommendationList.component";
import {RecommendationInstructionComponent} from "src/app/survey/recommendationInstruction.component";

export const SurveyRoutes: Routes = [
    { path: 'surveyView', component: SurveyComponent },
    { path: 'topicshistory', component: TopicHistoryComponent },
    { path: 'surveyRecommendationList', component: surveyRecommendationListComponent },
    { path: 'recommendationInstruction', component: RecommendationInstructionComponent}
];
