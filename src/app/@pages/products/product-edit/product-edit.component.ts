import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  categories;
  selectedOption: number;
  constructor(private fb:FormBuilder, private route: Router, private activeroute: ActivatedRoute, private webservice: WebServiceService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      _id:[''],
      productName: ['', Validators.required],
      category: ['', Validators.required],
    });
    const id: any = this.activeroute.snapshot.params;
    this.editProduct(id);
    this.GetAllCategories();
  }
  editProduct(id: any) {
    this.webservice.getProduct(id).subscribe(res => {
      console.log(res[0]);
      this.selectedOption = res[0].category;
      this.productForm.setValue(res[0]);
    })
  }
  GetAllCategories() {
    this.webservice.GetAllCategories().subscribe( res => {
      this.categories = res;
    }
    );
  }
  updateProduct() {
    this.webservice.updateProduct(this.productForm.value).subscribe(res => {
      this.route.navigate(['']);
    });
  }

}
