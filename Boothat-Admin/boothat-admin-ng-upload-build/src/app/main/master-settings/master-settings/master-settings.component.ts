import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDailogComponent } from '@fuse/Dialog/delete-dailog/delete-dailog.component';
import { CommonService } from '@fuse/services/common.service';
import { MasterSettingsService } from './master-settings.service';
import { MatTabChangeEvent } from '@angular/material';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CropperComponent } from '@fuse/Dialog/cropper/cropper.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableSortingService } from '@fuse/services/table-sorting.service';
@Component({
  selector: 'app-master-settings',
  templateUrl: './master-settings.component.html',
  styleUrls: ['./master-settings.component.scss', '../../../../../node_modules/quill/dist/quill.core.css', '../../../../../node_modules/quill/dist/quill.bubble.css', '../../../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation: ViewEncapsulation.None
})
export class MasterSettingsComponent implements OnInit {
  orderBy: number = 1;

  addSubCateForm = this.fb.group({
    categoryId: ['', Validators.required],
    name: ['', Validators.required]
  })
  addCateForm = this.fb.group({
    categoryName: [''],
    icon: ['']
  })
  totalCategories: any;
  croppedImageBase64: any = '';
  selectedIndex: number;
  config: any = {}
  cateConfig: any = {};
  subCateConfig: any = {}
  @ViewChild('searchCate', { static: true })
  searchCate: ElementRef;
  @ViewChild('searchSubCate', { static: true })
  searchSubCate: ElementRef;
  cateSearchText: any;
  subCateSearchText: any;
  displayedColumns: string[] = ['type', 'date', 'action'];
  displayedColumnsCategory: string[] = ['icon', 'type', 'action'];

  dataSource = this.masterSettingService.SubCategories;
  dataCategory = this.masterSettingService.categories;
  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link']
      ]
    }
  }
  tabPageData: any = "hello there";
  activeTabNumber: number;
  updatedCategories: any;
  paramsId: any;
  paramsType: any = '';
  quillContentChanged(event) {
    console.log(event);
  }
  constructor(public dialog: MatDialog,
    public masterSettingService: MasterSettingsService,
    public fb: FormBuilder,
    public _commonService: CommonService,
    public _snackBar: MatSnackBar,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tableSortingService: TableSortingService) {
    // this.subCateConfig.itemsPerPage = 10;
    // this.subCateConfig.currentPage = 1;
    // this.subCateConfig.totalItems = this.masterSettingService.subCateTotalItems;
    // this.cateConfig.id = 'first'
    // this.subCateConfig.id = 'second'
    // this.cateConfig.itemsPerPage = 10;
    // this.cateConfig.currentPage = 1;
    // this.cateConfig.totalItems = this.masterSettingService.cateTotalItems;
    // console.log("total category page", this.masterSettingService.cateTotalItems);

    // console.log(this.tabPageData.name,"tabpageData");
    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params.id);
    //   if (params) {
    //     this.paramsId = params.id
    //     this.paramsType = params.type
    //   }
    // })
  }

  ngOnInit() {
  }
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    console.log(files)
    // this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          // this.addCateForm.get('icon').setValue(file);
          this.openCropper(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  openCropper(file) {
    this.dialog.open(CropperComponent, {
      // height: '80vh',
      width: '50vw',
      data: { imageFile: file, ratio: 1 / 1 }
    }).afterClosed().subscribe((dialogData: any) => {
      if (dialogData) {
        this.croppedImageBase64 = dialogData.croppedImageBase64;
      }
    });
  }
  onRemoveImage() {
    this.croppedImageBase64 = ''
  }
  // deleteSubCategory(id) {
  //   let dialogRef = this.dialog.open(DeleteDailogComponent, {
  //     height: '120px',
  //     width: '420px',
  //   }).afterClosed().subscribe(response => {
  //     console.log(response.delete);
  //     if (response.delete) {
  //       this._commonService.deleteSubCate(id).then((result: any) => {
  //         console.log(result);
  //         if (result.status == 200) {
  //           this.getSubCategory()
  //           this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //         } else
  //           this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //       })
  //     }
  //   })
  // }
  pageChanged(dataType, pageNumber) {
    console.log(this.activeTabNumber);

    if (dataType == 'category') {
      // this.getCategory(pageNumber)
    }
    if (dataType == 'subCategory') {
      // this.getSubCategory(pageNumber)
    }
  }
  // createSubCategory() {
  //   console.log('add subcategory', this.addSubCateForm.value);
  //   if (this.paramsType == 'subCategory') {
  //     const payload = this.addSubCateForm.value
  //     payload.id = this.paramsId
  //     this._commonService.updateSubCategory(payload).then((result: any) => {
  //       if (result.status == 200) {
  //         // this.getSubCategory()
  //         this._snackBar.open(result.message, 'okay', { duration: 1000 })

  //         this.router.navigate(['master-settings']);
  //       } else
  //         this._snackBar.open(result.message, 'okay', { duration: 1000 })

  //       this.addSubCateForm.reset();
  //     })
  //   } else {
  //     this._commonService.addSubCategory(this.addSubCateForm.value).then((result: any) => {
  //       if (result.status == 200) {
  //         // this.getSubCategory()
  //         this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //       } else
  //         this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //     })
  //     this.addSubCateForm.reset();
  //   }
  // }

  // createCategory() {
  //   const formData = new FormData();
  //   formData.append('name', this.addCateForm.get('categoryName').value)

  //   formData.append('image', this.addCateForm.get('icon').value)
  //   if (this.paramsType == 'category') {
  //     formData.append('id', this.paramsId)
  //     this._commonService.updateCategory(formData).then((result: any) => {
  //       if (result.status == 200) {
  //         // this.getCategory(this.cateConfig.currentPage)
  //         this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //         this.addCateForm.reset()
  //         this.router.navigate(['master-settings']);
  //         this.croppedImageBase64 = ''
  //       }
  //     })
  //   } else {
  //     this._commonService.addCategory(formData).then((result: any) => {
  //       if (result.status == 200) {
  //         // this.getCategory(this.cateConfig.currentPage)
  //         this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //         this.addCateForm.reset()
  //         this.croppedImageBase64 = ''
  //       }
  //     })
  //   }
  // }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // console.log('index => ', tabChangeEvent.index);
    // if (tabChangeEvent.index >= 0 && tabChangeEvent.index <= 2) {
    //   this._commonService.getPages(tabChangeEvent.index + 1).then((result: any) => {
    //     console.log("data according to tab", result.data.page[0]);
    //     this.tabPageData = result.data.page[0]
    //     console.log(this.tabPageData.name);
    //   })
    // }
    // this.activeTabNumber = tabChangeEvent.index
    // if (this.activeTabNumber === 4) {
    //   this._commonService.getAllCategory().then((result: any) => {
    //     console.log("updated category", result.data.categories.data);
    //     this.updatedCategories = result.data.categories;
    //   })
    // }
  }
  updatePage(index, pageName, Desc) {
    // if (index && pageName != "" && Desc != null) {
    //   this._commonService.updatePage(index, pageName, Desc).then((result: any) => {
    //     if (result.status == 200)
    //       this._snackBar.open(result.message, 'okay', { duration: 1000 })
    //   })
    // } else {
    //   this._snackBar.open('please fill out all the input', 'okay', { duration: 1000 })
    // }
  }

  // delete(name, id) {
  //   let dialogRef = this.dialog.open(DeleteDailogComponent, {
  //     height: '120px',
  //     width: '420px',
  //   }).afterClosed().subscribe(response => {
  //     console.log('delete dailog response', response.delete);
  //     if (response.delete) {
  //       if (name == 'category') {
  //         this._commonService.deleteCate(id).then((result: any) => {
  //           console.log("status changed ", result);
  //           if (result.status == 200) {
  //             // this.getCategory(1)
  //             this._snackBar.open(result.message, "okay", { duration: 2000 });

  //           }
  //           else
  //             this._snackBar.open(result.message, "okay", { duration: 2000 });
  //         })
  //       } else {
  //         this._commonService.deleteSubCate(id).then((result: any) => {
  //           console.log(result);
  //           if (result.status == 200) {
  //             // this.getSubCategory()
  //             this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //           } else
  //             this._snackBar.open(result.message, 'okay', { duration: 1000 })
  //         })
  //       }

  //     }
  //   })
  // }
  // edit(name, id) {
  //   this._fuseProgressBarService.show()
  //   if (name == 'category') {
  //     this._commonService.editCate(id).then((result: any) => {
  //       if (result.status == 200) {
  //         console.log(result.data[0]);

  //         this.addCateForm.get('categoryName').setValue(result.data[0].name)
  //         // this.addCateForm.get('icon').setValue(result.data[0].name)
  //         this.croppedImageBase64 = result.data[0].image
  //         this._fuseProgressBarService.hide()
  //       }
  //     })
  //   } else {
  //     this._commonService.editSubCate(id).then((result: any) => {
  //       if (result.status == 200) {
  //         this.addSubCateForm.get('categoryId').setValue(result.data[0].category)
  //         this.addSubCateForm.get('name').setValue(result.data[0].name)
  //         this._fuseProgressBarService.hide()
  //       }
  //     })
  //   }
  //   this._fuseProgressBarService.hide()
  // }
  filterData(input, tableName) {
    if (tableName == 'category') {
      // this.getCategory(1, input.value, '', 1)
    } else {
      // this.getSubCategory(1, input.value, '', 1)
    }
  }
  // clearSearch(tableName) {
  //   if (tableName == 'category') {
  //     this.searchCate.nativeElement.value = "";
  //     this.searchCate.nativeElement.focus()
  //   } else {
  //     this.searchSubCate.nativeElement.value = "";
  //     this.searchSubCate.nativeElement.focus()
  //   }
  //   this.filterData('', tableName)
  // }


  // getSubCategory(pageNumber?, searchText?, colName?, orderBy?) {
  //   this._fuseProgressBarService.show()
  //   this._commonService.getSubcategory(pageNumber, searchText, colName, orderBy).then((result: any) => {
  //     if(result.status == 200){
  //       this._fuseProgressBarService.hide()
  //       console.log("totalSube", result.data.pageIndex);
  //       this.dataSource = result.data.data;
  //       this.subCateConfig.totalItems = result.data.totalRecords;
  //       this.subCateConfig.currentPage = result.data.pageIndex
  //     }
  //     this._fuseProgressBarService.hide()
  //   })
  // }

  // getCategory(pageNumber?, searchText?, colName?, orderBy?) {
  //   this._fuseProgressBarService.show()
  //   this._commonService.getCategory(pageNumber, searchText, colName, orderBy).then((result: any) => {
  //     if(result.status ==200){
  //       this._fuseProgressBarService.hide()
  //       console.log(result.data);
  //       this.dataCategory = result.data.categories.data;
  //       this.cateConfig.totalItems = result.data.categories.totalRecords;
  //       this.cateConfig.currentPage = result.data.categories.pageIndex;
  //     }
  //     this._fuseProgressBarService.hide()
  //   })
  // }


  sortTable(col, tableName) {
    let ot = this.orderBy ? 0 : 1
    this.orderBy = ot
    // this.router.navigate(['.'],
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams: { column: col, currentPage: this.config.currentPage, Tname: tableName,orderBy:this.orderBy }
    //   });
    // this.tableSortingService.sortTable().then((result: any) => {
    if (tableName == 'category') { }
    // this.getCategory(this.config.currentPage,this.cateSearchText,col,this.orderBy)
    else if (tableName == 'subCategory'){}
        // this.getSubCategory(this.subCateConfig.currentPage,this.subCateSearchText,col,this.orderBy)
    // });
}
}
