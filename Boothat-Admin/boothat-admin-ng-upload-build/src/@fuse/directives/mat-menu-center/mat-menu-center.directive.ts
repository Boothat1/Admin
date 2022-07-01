import { Directive, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { OverlayRef, OverlayConfig, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material';

@Directive({
  selector: '[center-mat-menu]'
})
export class CenterMatmenuDirective {
  overlayRef: OverlayRef;
  overlayConf: OverlayConfig;
  dropDown: HTMLElement;
  overlayPositionBox: HTMLElement;
  menu: MatMenuPanel;
  button: HTMLElement;
  buttonWidth: number;
  buttonLeft: number;
  buttonBottom: number;

  @Input('center-mat-menu') private menuTrigger: MatMenuTrigger;

  constructor(private _menuButton: ElementRef, private _renderer: Renderer2) {
    setTimeout(()=>{
      console.log('menu-trigger*************',this.menuTrigger)
    },10000) 
  }

  @HostListener('click', ['$event'])
  onclick(e) {
    this._setVariables();
    //menu not opened by keyboard down arrow, have to set this so MatMenuTrigger knows the menu was opened with a mouse click
    this.menuTrigger['_openedBy'] = e.button === 0 ? 'mouse' : null;

    this._overrideMatMenu();

    this.dropDown = this.overlayRef.overlayElement.children[0].children[0] as HTMLElement;
    this.overlayPositionBox = this.overlayRef.hostElement;

    setTimeout(() => {
      this._styleDropDown(this.dropDown);
      this._setOverlayPosition(this.dropDown, this.overlayPositionBox);
      this._openMenu();
    })
  }

  private _setVariables() {
    const config = this.menuTrigger['_getOverlayConfig']();
    this.menuTrigger['_overlayRef'] = this.menuTrigger['_overlay'].create(config);
    this.overlayRef = this.menuTrigger['_overlayRef'];
    this.overlayConf = this.overlayRef.getConfig();
    this.overlayRef.keydownEvents().subscribe();
    this.menu = this.menuTrigger.menu;
    this._setButtonVars();
  }

  private _setButtonVars() {
    this.button = this._menuButton.nativeElement;
    this.buttonWidth = this.button.getBoundingClientRect().width;
    this.buttonLeft = this.button.getBoundingClientRect().left;
    this.buttonBottom = this.button.getBoundingClientRect().bottom;
  }

  private _overrideMatMenu() {
    let strat = this.overlayConf.positionStrategy as FlexibleConnectedPositionStrategy;
    this.menuTrigger['_setPosition'](strat);
    strat.positionChanges.subscribe(() => {
      this._setButtonVars();
      this._setOverlayPosition(this.dropDown, this.overlayPositionBox);
    })
    this.overlayConf.hasBackdrop = this.menu.hasBackdrop == null ?
      !this.menuTrigger.triggersSubmenu() : this.menu.hasBackdrop;
    this.overlayRef.attach(this.menuTrigger['_getPortal']());

    if (this.menu.lazyContent) {
      this.menu.lazyContent.attach()
    }

    this.menuTrigger['_closeSubscription'] = this.menuTrigger['_menuClosingActions']().subscribe(() => {
      this.menuTrigger.closeMenu();
    });
    this.menuTrigger['_initMenu']();
  }

  private _styleDropDown(dropDown: HTMLElement) {
    this._renderer.setStyle(this._renderer.parentNode(dropDown), 'transform-origin', 'center top 0px');
  }

  private _setOverlayPosition(dropDown: HTMLElement, overlayPositionBox: HTMLElement) {
    let dropDownleft = ((this.buttonWidth / 2 + this.buttonLeft) - dropDown.offsetWidth / 2);

    // this._renderer.setStyle(overlayPositionBox, 'top', this.buttonBottom + 5 + 'px');
    this._renderer.setStyle(overlayPositionBox, 'left', dropDownleft + 'px');
    // this._renderer.setStyle(overlayPositionBox, 'height', '100%');
  }

  private _openMenu() {
    this.menuTrigger.menu['_startAnimation']();
  }
}
