import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WomenRoutingModule } from "./women-routing.module";
import { WomenComponent } from "./women/women.component";

@NgModule({
    declarations: [
      WomenComponent
    ],
    imports: [
      CommonModule,
      WomenRoutingModule
    ]
  })
  export class WomenModule { }