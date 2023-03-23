
export interface PaginateModel {
	dataList: Array<any>;
	dataSource: Array<any>;
	pageSize: number;
	pageIndex: number;
	currentIndex: number;
	disableNextButton: boolean;
	newFilterSearch: boolean;
}