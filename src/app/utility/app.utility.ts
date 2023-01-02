export class AppUtility {

    public static isEmptyString(str): boolean {
        return (!str || 0 === str.length);
    }

    public static isEmptyObject(object): boolean {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    public static convertMillisecondToTime(millisecond: any) {
        let dayValue: any = '';
        if (millisecond > 86400000) {
            const tmpValue: any = millisecond / 86400000;
            dayValue = Number(parseFloat(tmpValue).toFixed(0)) + ' days ';
            millisecond = (millisecond % 86400000);
        }
        let seconds: any = parseInt((millisecond / 1000) % 60 + '', 10);
        let minutes: any = parseInt(((millisecond / (1000 * 60)) % 60) + '', 10);
        let hours: any = parseInt((millisecond / (1000 * 60 * 60)) % 24 + '', 10);
        let timeValue = '';

        // if (withHour) {
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        timeValue = hours + ':' + minutes + ':' + seconds;
        // }

        return dayValue + timeValue;
    }

    static getDateFromMilllis(millisecond: any) {

        if(!millisecond) return '';

        const date = new Date(millisecond)
        var d = AppUtility.getFormated(date.getMonth() + 1)
        +'/'+ AppUtility.getFormated(date.getDate())
        +'/'+AppUtility.getFormated(date.getFullYear())
        +' '+AppUtility.getFormated(date.getHours()) + 
        ':' + AppUtility.getFormated(date.getMinutes()) + 
        ':' + AppUtility.getFormated(date.getSeconds());
        return d;
      }

      static getDateOnlyFromMilllis(millisecond: any) {

        if(!millisecond) return '';

        const date = new Date(millisecond)
        var d = AppUtility.getFormated(date.getMonth() + 1)
        +'/'+ AppUtility.getFormated(date.getDate())
        +'/'+AppUtility.getFormated(date.getFullYear());

        return d;
      }

    private static getFormated(num){
        return num < 10 ? '0' + num : num;
    }
}
