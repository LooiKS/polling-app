import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzRadioModule} from "ng-zorro-antd/radio";


const exportsModule = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NzFormModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzGridModule,
  NzCardModule,
  NzSkeletonModule,
  NzMessageModule,
  NzDropDownModule,
  NzButtonModule,
  NzCheckboxModule,
  NzIconModule,
  NzSelectModule,
  NzDatePickerModule,
  NzRadioModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ...exportsModule
  ]
})
export class SharedModule {
}
