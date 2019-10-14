import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryData: any;
  categoryForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private activeroute: ActivatedRoute,
              private webservice: WebServiceService) { }

  ngOnInit() {
      this.categoryForm = this.fb.group({
      _id: [''],
      categoryName: ['', Validators.required]
    });
      const id: any = this.activeroute.snapshot.params;
      this.editCategory(id);
  }

  editCategory(id: any) {
    this.webservice.getCategory(id).subscribe(res => {
      this.categoryForm.setValue(res[0]);
    })
  }

  updateCategory() {
    this.webservice.updateCategory(this.categoryForm.value).subscribe(res => {
      this.route.navigate(['category-list']);
    });
  }

}
