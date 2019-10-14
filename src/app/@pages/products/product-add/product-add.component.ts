import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  categories: any;
  // categories = [{ id:'1', categoryName:'aaaa'}];
  constructor(private fb: FormBuilder, private webservice: WebServiceService, private route: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.GetAllCategories();
  }

  addProduct() {
    if (this.productForm.valid) {
      this.webservice.addProduct(this.productForm.value).subscribe( res => {
        this.route.navigate(['']);
      });

    }
  }
  GetAllCategories() {
    this.webservice.GetAllCategories().subscribe( res => {
      this.categories = res;
    }
    );

  }

}
