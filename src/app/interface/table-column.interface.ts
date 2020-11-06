export interface TABLECOLUMN {
    key: string;
    displayName: string;
    sort?: string;
    type?: string;
    imagePath?: string;
    isEdit?: boolean;
    links?: Array<any>;
    event?: string;
    buttonList?: Array<any>;
    option?: Array<any>;
    addRowType?: string;
    isDate?: boolean;
}
