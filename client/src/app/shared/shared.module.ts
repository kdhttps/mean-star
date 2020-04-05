import {NgModule} from '@angular/core';
import {ShowAuthedDirective} from './show-authed.directive';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ShowAuthedDirective],
  exports: [ShowAuthedDirective, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {

}
