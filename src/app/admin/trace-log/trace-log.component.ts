import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-trace-log',
  templateUrl: './trace-log.component.html',
  styleUrls: ['./trace-log.component.scss']
})
export class TraceLogComponent implements OnInit {

 // #region declare variables

 @ViewChild(MatSort) sort!: MatSort;
 @ViewChild(MatPaginator) paginator!: MatPaginator;

 traceLogDataSource: MatTableDataSource<any>;
 displayedColumns: string[];

 pageSize = 5;
 currentPage = 0;
 pageSizeOptions: number[] = [5, 10, 25, 100];

 // #endregion

 // #region constructor

 constructor(
   private userService: UserService,
   private dialogService: DialogService
 ) {

   // init variables
   this.traceLogDataSource = new MatTableDataSource();
   this.displayedColumns = ['entity', 'trace_msg', 'data', 'date_time', 'os_user', 'user', ];
 }

 // #endregion

 // #region ngOnInit

 ngOnInit(): void {
   this.loadControls();
 }

 // #endregion

 // #region load controls

 loadControls() {
   this.listLogTracres();
 }

 listLogTracres() {
   this.userService.listTraceLog(this.currentPage + 1, this.pageSize).subscribe((response: ResponseDto) =>{
     this.traceLogDataSource.data = response.data;
     setTimeout(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = response.count;            
    });
  }
  )
 }

 // #endregion

 // #region ngAfterViewInit

 ngAfterViewInit() {
   this.traceLogDataSource.paginator = this.paginator;
   this.traceLogDataSource.sort = this.sort;
 }

 // #endregion
    pageChanged(event: PageEvent) {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.listLogTracres();
    }
 // #region main action

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.traceLogDataSource.filter = filterValue.trim().toLowerCase();
   if (this.traceLogDataSource.paginator) {
     this.traceLogDataSource.paginator.firstPage();
   }
 }

 // #endregion

}
