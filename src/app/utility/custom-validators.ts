import { AbstractControl, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';
import { Observable } from "rxjs";

export class CustomValidator {

    static customDateValidatorforInptField(expectedDateFormate : string) : ValidatorFn{

        return (control : AbstractControl) => {
            const date = control.value;
            if(date == null || date == '') return null;
            const isValidDate = moment(date,expectedDateFormate).isValid();
            return isValidDate ? null : {'invalidDate': 'invalid date'} ;
        }
    } 
}