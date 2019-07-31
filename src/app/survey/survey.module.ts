import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { SidebarModule, CalendarModule } from 'primeng/primeng';
import { SurveyComponent } from "src/app/survey/survey.component";
import { TopicHistoryComponent } from "src/app/survey/topichistory.component";
import { surveyRecommendationListComponent } from "src/app/survey/surveyRecommendationList.component";
import { RecommendationInstructionComponent } from "src/app/survey/recommendationInstruction.component";
import { SortGridPipe } from "src/app/pipes/sorting";
import { SafeHtmlPipe } from "src/app/pipes/safeHtml";
import { SafePipe } from "src/app/pipes/safeStyle";
import { SearchFilterPipe } from "src/app/pipes/searchPipe";

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
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        PanelModule,
        ButtonModule,
        SidebarModule,
        CalendarModule,
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