// angular core
import { Component, OnInit, ViewChild } from '@angular/core';

// angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { ResponseDto } from 'src/app/shared/models/api-response.model';

// services
import { ReceiverService } from 'src/app/shared/services/receiver.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReceiverComponent } from 'src/app/receiver/add-receiver/add-receiver.component';

@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})
export class ReceiverListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  receiverDataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  // #endregion

  // #region constructor

  constructor(
    private receiverService: ReceiverService,
    public dialog: MatDialog,
  ) {
    // init variables
    this.receiverDataSource = new MatTableDataSource();
    this.displayedColumns = ['id', 'name', 'type', 'reg_num', 'governate', 'regionCity', 'street', 'buildingNumber', 'country', 'actions'];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listReceivers();
  }

  listReceivers() {
    this.receiverService.listReceivers().subscribe((res: ResponseDto) => this.receiverDataSource.data = res.data);
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.receiverDataSource.paginator = this.paginator;
    this.receiverDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.receiverDataSource.filter = filterValue.trim().toLowerCase();
    if (this.receiverDataSource.paginator) {
      this.receiverDataSource.paginator.firstPage();
    }
  }

  openReceiverPopup(id?: number) {
    const dialogRef = this.dialog.open(AddReceiverComponent, {
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listReceivers();
    });
  }

  // #endregion

}

