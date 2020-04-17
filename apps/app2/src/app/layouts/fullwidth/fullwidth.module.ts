import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FullwidthComponent } from "./fullwidth.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "../../modules/login/login.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [FullwidthComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FullwidthModule {}
