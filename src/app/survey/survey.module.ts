import { NgModule } from '@angular/core';
import { SurveyComponent } from 'src/app/survey/survey.component';
import { TopicHistoryComponent } from 'src/app/survey/topichistory.component';
import { surveyRecommendationListComponent } from 'src/app/survey/surveyRecommendationList.component';
import { RecommendationInstructionComponent } from 'src/app/survey/recommendationInstruction.component';
import { SharedModule } from '../general/share.module';
import { SurveyRoutingModule } from './survey.routes';
import { CommonHEAModule } from '../common/common.module';
import { PipeModule } from '../pipes/pipe/pipe.module';
import { SliderModule} from 'primeng/slider';
import { MatSliderModule } from '@angular/material/slider';
import { SurveyDialogboxComponent } from './survey-dialogbox/survey-dialogbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SurveyComponent,
        TopicHistoryComponent,
        surveyRecommendationListComponent,
        RecommendationInstructionComponent,
        SurveyDialogboxComponent,
    ],
    imports: [
        SharedModule,
        SurveyRoutingModule,
        CommonHEAModule,
        PipeModule,
        SliderModule,
        MatSliderModule,
        FormsModule
    ],
    providers: [],
    entryComponents: [SurveyDialogboxComponent]
})
export class SurveyModule { }
