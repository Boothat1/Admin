import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { Enums, pageSize } from "@fuse/utils/systemEnums";



export abstract class TableBaseComponent{

    searchText: string;
    datefilter: any;
    dataSource: any;
    enum = Enums


    config: any = { 
        currentPage:1, 
        totalItems:null,
        itemsPerPage:pageSize
      };



    constructor( public _fuseProgressbarService:FuseProgressBarService,){
        
    }
    // Abstracted Function
    abstract fetchDataInTable(pageNumber?, keyword?,date?)
    abstract  requestFocusOnSearchClear()



    pageChanged(event){ 
        this.fetchDataInTable(event, this.searchText, this.datefilter)
    };

    searchFilter(val){
        console.log('fn is being called');
         
        this.fetchDataInTable(1,this.searchText,this.datefilter)
      }

      timeFilter(event){
        this.datefilter = event.value;
        this.fetchDataInTable(1,this.searchText,event.value)
      }

      clearSearch() {
        this.searchText = '';
        this.requestFocusOnSearchClear();
      }

     
    }