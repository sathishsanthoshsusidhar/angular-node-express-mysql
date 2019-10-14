import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(private fb: FormBuilder, private webservice: WebServiceService, private route: Router ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }
  
  addCategory(){
    if(this.categoryForm.valid){
      this.webservice.addCategory(this.categoryForm.value).subscribe(res => {
        this.route.navigate(['category-list']);
      });
    }
  }

}
