import { AbstractControl, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';

export class CustomValidator {

    static customDateValidatorforInptField(expectedDateFormate : string, args ?: boolean) : ValidatorFn{

        // const invalidDateMessage = () => { return {'invalidDate': 'invalid date'} };

        return (control : AbstractControl) => {
            const date = control.value;
            return null;  
            // if(date == '') args = true;
            // if((!date || date == '') && args ) return null;
            // const isValidDate = moment(date,expectedDateFormate).isValid();
            // return isValidDate ? null : {'invalidDate': 'invalid date'} ;
        }
    } 
}