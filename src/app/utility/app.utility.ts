export class AppUtility {

    public static isEmptyString(str): boolean {
        return (!str || 0 === str.length);
    }

    public static isEmptyObject(object): boolean {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}