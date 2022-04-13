import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationMessageService } from 'src/app/shared/services/notification.message.service';
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
    private dialog: MatDialog,
  ) {

    // init variables
    this.traceLogDataSource = new MatTableDataSource();
    this.displayedColumns = ['entity', 'trace_msg', 'date_time', 'user_email', 'data'];
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
    this.userService.listTraceLog(this.currentPage + 1, this.pageSize).subscribe((response: ResponseDto) => {
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

  displayDataPopup(message: string) {
    const dialogRef = this.dialog.open(LogDataComponent, {
      width: '70vw',
      minHeight: '20vh',
      maxHeight: '60vh',
      data: { message }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.traceLogDataSource.filter = filterValue.trim().toLowerCase();
    if (this.traceLogDataSource.paginator) {
      this.traceLogDataSource.paginator.firstPage();
    }
  }

  // #endregion

}

@Component({
  template: `
  <h2 class="pt-3 text-start" style="word-break: break-word;">
    {{data.message}}
  </h2>
 <div class="row justify-content-end">
   <div class="col-1 text-end">
      <button class="btn btn-primary" (click)="dialogRef.close()">ok</button>
   </div>
 </div>
  `
})
export class LogDataComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) { }
}
