import { NgModule } from '@angular/core';
import { ShowAuthedDirective } from './show-authed.directive';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';
import { ToastService } from './toast-service';
import { HeaderComponent } from './layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlusSquare, faEdit, faHome } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [
    HeaderComponent,
    ShowAuthedDirective,
    ToastsContainer,
  ],
  exports: [
    ShowAuthedDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastsContainer,
    HeaderComponent,
    AppRoutingModule,
  ],
  providers: [
    ToastService,
  ],
})
export class SharedModule {
  constructor(
    private library: FaIconLibrary,
  ) {
    library.addIcons(faGithub, faTwitter, faEdit, faHome, faPlusSquare, faEdit);
  }
}
