import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/@shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public array: any;
  ProductDataSource: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  displayedColumns = ['id', 'Product', 'Catergory', 'Edit', 'Delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private webservice: WebServiceService, private route: Router) { }

  ngOnInit() {
    // this.currentPage = 0;
    this.pageSize = 5;
    this.RenderDataTable();
  }
  openDialog(did: any) {
    console.log(did);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { msg: 'Do you confirm the deletion of this data?', id: did},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(did);
      }
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  RenderDataTable() {
    this.webservice.GetAllProducts(this.currentPage, this.pageSize)
      .subscribe(
      res => {
        this.ProductDataSource = new MatTableDataSource<Element>(res);
        this.ProductDataSource.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        // this.iterator();
      },
      error => {
        console.log('There was an error while retrieving Data !!!' + error);
      });
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    // this.ProductDataSource = part;
    this.RenderDataTable();
  }

  editProduct(id: number) {
    this.route.navigate(['edit-product', id]);
  }

  deleteProduct(id: number) {
    this.webservice.deleteProduct(id).subscribe(res => {
      this.pageSize = 5;
      this.RenderDataTable();
    }
    );
  }


}
