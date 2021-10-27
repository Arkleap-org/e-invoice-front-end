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
@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})
export class ReceiverListComponent implements OnInit {

    // #region declare variables

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'name', 'type', 'reg_num', 'governate', 'regionCity', 'street', 'buildingNumber','country', 'actions'];
  
    // #endregion

   // #region constructor

  constructor(private receiverService: ReceiverService) {

    this.dataSource = new MatTableDataSource();

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

      this.dataSource = res.data;

    });
  }

  // #endregion

 // #region ngAfterViewInit

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

// #endregion

// #region main action

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

// #endregion

}

