import { NgModule } from "@angular/core";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { PopupModule } from "@progress/kendo-angular-popup";
import { GridModule, ExcelModule, BodyModule, FilterMenuModule, RowFilterModule, HeaderModule } from "@progress/kendo-angular-grid";
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { PanelBarModule, LayoutModule } from "@progress/kendo-angular-layout";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { MenusModule } from "@progress/kendo-angular-menu";
import { UploadModule } from "@progress/kendo-angular-upload";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { ContextMenuModule } from "@progress/kendo-angular-menu";
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import {
  TreeListModule,
  ExcelModule as TreeExcelModule,
  BodyModule as TreeBodyModule,
  FilterMenuModule as TreeFilterMenuModule,
  RowFilterModule as TreeRowFilterModule,
  HeaderModule as TreeHeaderModule
} from '@progress/kendo-angular-treelist';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { SchedulerModule } from "@progress/kendo-angular-scheduler";

@NgModule({
  imports: [
    DropDownsModule,
    InputsModule,
    DateInputsModule,
    ButtonsModule,
    GridModule,
    ExcelModule,
    PopupModule,
    BodyModule,
    FilterMenuModule,
    RowFilterModule,
    HeaderModule,
    TreeViewModule,
    PanelBarModule,
    NotificationModule,
    MenusModule,
    UploadModule,
    LayoutModule,
    DialogsModule,
    ContextMenuModule,
    TooltipModule,
    TreeListModule,
    BrowserAnimationsModule,
    TreeExcelModule,
    TreeBodyModule,
    TreeFilterMenuModule,
    TreeRowFilterModule,
    TreeHeaderModule
  ],
  exports: [
    DropDownsModule,
    InputsModule,
    DateInputsModule,
    ButtonsModule,
    GridModule,
    ExcelModule,
    PopupModule,
    BodyModule,
    FilterMenuModule,
    RowFilterModule,
    HeaderModule,
    TreeViewModule,
    PanelBarModule,
    NotificationModule,
    MenusModule,
    UploadModule,
    LayoutModule,
    DialogsModule,
    ContextMenuModule,
    TooltipModule,
    TreeListModule,
    BrowserAnimationsModule,
    TreeExcelModule,
    TreeBodyModule,
    TreeFilterMenuModule,
    TreeRowFilterModule,
    TreeHeaderModule,
  ],
  providers: []
})

export class KendoUiModule { }
