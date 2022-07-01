import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CommonService } from '@fuse/services/common.service';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.scss', '../../../../../node_modules/quill/dist/quill.core.css', '../../../../../node_modules/quill/dist/quill.bubble.css', '../../../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserPagesComponent implements OnInit {
  quillData: any;
  pageTitle: any;
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
  tabIndex: number = 1;
  contentByTabNumber: any;
  selectedLanguage: any = 1;


  constructor(public commonService: CommonService,
    public snackBar: MatSnackBar,
    public _fuseProgressBarService: FuseProgressBarService) {
    this.getContent(1)
  }

  ngOnInit() {
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    console.log('index => ', tabChangeEvent.index + 1);
    this.tabIndex = tabChangeEvent.index + 1
    this.getContent(this.tabIndex)
    this.selectedLanguage = 1;
  }

  selectLanguage(event){
    console.log(event.value);
    this.selectedLanguage = event.value;

    this.getContent(this.tabIndex,this.selectedLanguage)
  }
  quillContentChanged(event) {
    // console.log(this.editor);
    console.log(event);
  }
  submitContent() {
    console.log("title", this.pageTitle);
    console.log("quil editor text", this.quillData);
    console.log("tabeNumber=>", this.tabIndex);
    if (this.pageTitle == '' || this.quillData == '' || this.quillData == null) { 
      this.snackBar.open("Form is invalid", 'okay', { duration: 2000 })
    } else {
      this.commonService.addContent(this.tabIndex, this.pageTitle, this.quillData,this.selectedLanguage).then((result: any) => {
        console.log(result);
        if (result.status == 200) {
          this.snackBar.open(result.message, 'okay', { duration: 2000 })
        }

      })
    }
  }
  getContent(tabIndex,language?) {
    this._fuseProgressBarService.show()
    this.commonService.getContentByTabnumber(tabIndex,language).then((result: any) => {
      console.log(result);
      if (result.status == 200) {
        this.contentByTabNumber = result.data.Content
        this.pageTitle = result.data.Content.contentType;
        this.quillData = result.data.Content.description;
        this._fuseProgressBarService.hide()
      }
      this._fuseProgressBarService.hide()
    })

  }
}
