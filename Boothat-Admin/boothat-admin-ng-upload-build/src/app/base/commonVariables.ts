import { Enums, pageSize } from "@fuse/utils/systemEnums";

export abstract class CommonVariables{
    searchText: string;
    datefilter: any;
    dataSource: any;
    enum = Enums


    config: any = { 
        currentPage:1, 
        totalItems:null,
        itemsPerPage:pageSize
      };


    constructor(){
        
    }
}