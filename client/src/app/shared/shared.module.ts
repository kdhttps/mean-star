import { NgModule } from '@angular/core';
import { ShowAuthedDirective } from './show-authed.directive';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';
import { ToastService } from './toast-service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    ShowAuthedDirective,
    ToastsContainer,
  ],
  exports: [
    ShowAuthedDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastsContainer,
  ],
  providers: [
    ToastService,
  ],
})
export class SharedModule {

}
