import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FilterPipe } from '../shared/filter.pipe';
import { ShortenPipe } from '../shared/shorten.pipe';
import { SystComponent } from './syst.component';

const routes: Route[] = [
  { path: '', component: SystComponent }, //locathost:4200/syst
];

@NgModule({
  declarations: [SystComponent, ShortenPipe, FilterPipe],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SystModule {}
