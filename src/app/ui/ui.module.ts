import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatSortModule, MatTableModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActiveListingsComponent} from "./active-listings/active-listings.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HomePageComponent,
    MainNavComponent,
    LoadingSpinnerComponent,
    ActiveListingsComponent
  ],
  exports: [
    MainNavComponent,
    LoadingSpinnerComponent,
  ]
})
export class UiModule {}
