import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResetpasswordComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    PasswordModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ToolbarModule,
    SidebarModule,
    ChartModule,
    TableModule,
    AvatarModule,
    MenuModule,
    DialogModule,
    FormsModule,
    ProgressSpinnerModule
  ],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor])), MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
