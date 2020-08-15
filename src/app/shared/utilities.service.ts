import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  // tslint:disable-next-line: typedef
  getAllFoodCategories(arr: any[]) {
    return arr.map((ele) => ele.category);
  }
  // tslint:disable-next-line: typedef
  getSelectedItemList(arr){
    return arr.fooditems;
  }

}
