import { NgModule } from '@angular/core';

import { FuseIfOnDomDirective } from '@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseInnerScrollDirective } from '@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';
import { CenterMatmenuDirective } from './mat-menu-center/mat-menu-center.directive';

@NgModule({
    declarations: [
        FuseIfOnDomDirective,
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective,
        CenterMatmenuDirective,
    ],
    imports     : [],
    exports     : [
        FuseIfOnDomDirective,
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective,
        CenterMatmenuDirective
    ]
})
export class FuseDirectivesModule
{
}
