import { NgModule } from '@angular/core';
import { SurveyComponent } from "src/app/survey/survey.component";
import { TopicHistoryComponent } from "src/app/survey/topichistory.component";
import { surveyRecommendationListComponent } from "src/app/survey/surveyRecommendationList.component";
import { RecommendationInstructionComponent } from "src/app/survey/recommendationInstruction.component";
import { SortGridPipe } from "src/app/pipes/sorting";
import { SafeHtmlPipe } from "src/app/pipes/safeHtml";
import { SafePipe } from "src/app/pipes/safeStyle";
import { SearchFilterPipe } from "src/app/pipes/searchPipe";
import { SharedModule } from '../general/share.module';
import { SurveyRoutingModule } from './survey.routes';
import { CommonHEAModule } from '../common/common.module';

@NgModule({
    declarations: [
        SurveyComponent,
        TopicHistoryComponent,
        surveyRecommendationListComponent,
        RecommendationInstructionComponent,
        SortGridPipe,
        SafeHtmlPipe,
        SafePipe,
        SearchFilterPipe
    ],
    imports: [
       SharedModule,
       SurveyRoutingModule,
       CommonHEAModule
    ],
    providers: [],
    exports: [
        SortGridPipe,
        SafeHtmlPipe,
        SafePipe,
        SearchFilterPipe
    ]

})
export class SurveyModule {

}