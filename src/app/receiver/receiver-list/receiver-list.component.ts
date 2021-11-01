// angular core
import { Component, OnInit, ViewChild } from '@angular/core';

// angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { ReceiverDto } from 'src/app/shared/models/receiver.model';
import { ResponseDto } from 'src/app/shared/models/api-response.model';

// services
import { ReceiverService } from 'src/app/shared/services/receiver.service';
import { MatDialog } from '@angular/material/dialog';
import { ReceiverComponent } from 'src/app/shared/popups/receiver/receiver.component';
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
    displayedColumns: string[] = ['id', 'name', 'type', 'reg_num', 'governate', 'regionCity', 'street', 'buildingNumber','country'];
  
    // #endregion

   // #region constructor

  constructor(private receiverService: ReceiverService,
    public dialog: MatDialog,
    ) {

    this.receiverDataSource = new MatTableDataSource();

   }
  // #endregion
  
  // #region ngOnInit
  ngOnInit(): void {
    this.listReceivers();
  }
  // #endregion

   // #region load table

   listReceivers() {

    this.receiverService.listReceivers().subscribe((res: ResponseDto) => {

      this.receiverDataSource = res.data;

    });
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

openReceiverPopup() {
  const dialogRef = this.dialog.open(ReceiverComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.listReceivers();
  });
}


// #endregion

}

