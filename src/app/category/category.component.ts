import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  color:Array<any>= ['#ffd31d','#42240c','#6a097d','#9a1f40','#007892','#63b7af','#abf0e9','#c81912','#f64b3c','#fdba9a','#45046a','#5c2a9d','#b5076b','#f1ebbb','#5fdde5']

  categories: Array<object>;
  categoryName:string='';
  dataStatus:string='Add';
  catId:string;

//inject category service inside constructor
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.categoryService.loadCategories().subscribe(val =>{
      this.categories=val
      console.log(val)
    })
  }

  onSubmit(f:NgForm){
    if(this.dataStatus=='Add'){
      //create a random number generator function
    let randomNumber =Math.floor(Math.random() * this.color.length) ;
    let  todoCategory = {
      category: f.value.categoryName,
      colorCode: this.color[randomNumber],
      todoCount: 0 
    }
    
    this.categoryService.saveCategory(todoCategory);
    f.resetForm();
    }else if(this.dataStatus=='Edit'){
   this.categoryService.updateCategory(this.catId,f.value.categoryName)
f.resetForm();
this.dataStatus='Add';
    }

  
  }

  onEdit(category: string, id:string){
   this.categoryName= category;
   this.dataStatus = 'Edit';
   this.catId=id;
  }

  onDelete(id:string){
    this.categoryService.deleteCategory(id);

  }
}
