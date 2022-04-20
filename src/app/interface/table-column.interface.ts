export interface TABLECOLUMN {
    key: string;
    displayName: string;
    sort?: string;
    type?: string;
    imagePath?: string;
    isEdit?: boolean;
    isUnderline?: boolean;
    links?: Array<any>;
    event?: string;
    buttonList?: Array<any>;
    option?: Array<any>;
    addRowType?: string;
    isDate?: boolean;
    isInlineEdit?: boolean;
    isId?: boolean;
    isSurvey?: boolean;
}
