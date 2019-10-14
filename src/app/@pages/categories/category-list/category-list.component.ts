import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog} from '@angular/material';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/@shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  MyDataSource: any;
  displayedColumns = ['id', 'Catergory', 'Edit', 'Delete'];

  constructor(public dialog: MatDialog, private webservice: WebServiceService, private route: Router) { }

  ngOnInit() {
    this.RenderDataTable();
  }
  openDialog(did: any): any {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data:{ msg: 'Do you confirm the deletion of this data?', id: did},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(did);
      }
    });
  }
  RenderDataTable() {
    this.webservice.GetAllCategories()
      .subscribe(
      res => {
        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res;
      },
      error => {
        console.log('There was an error while retrieving Posts !!!' + error);
      });
  }

  editCategory(id: number) {
      this.route.navigate(['edit-category', id]);
  }

  deleteCategory(id: number) {
    this.webservice.deleteCategory(id).subscribe(res => {
      this.RenderDataTable();
    }
    );
  }
}
