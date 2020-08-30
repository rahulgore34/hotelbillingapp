import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetDataService } from '../../common/get-data.service';
import { UtilitiesService } from '../shared/utilities.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  foodMenu = [];
  selectedFoodMenu: any;
  selectedMenuCat = 'Choose your favourites...';
  selectedFoods = [];
  restauranttables = [
    { id: '1', name: 'east-star', occupied: false },
    { id: '2', name: 'west-star', occupied: false },
    { id: '3', name: 'north-star', occupied: false },
    { id: '4', name: 'south-star', occupied: false },
  ];
  selectedTableName = '';
  modalRef: BsModalRef;
  date = new Date();
  menubtnClick = false;
  tableSelected = false;

  constructor(
    private service: GetDataService,
    private utilService: UtilitiesService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.service.getData().subscribe((data) => {
      if (data) {
        this.foodMenu = data;
      }
    });
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // tslint:disable-next-line: typedef
  onMenuSelect(selectedMenu: any) {
    console.log(selectedMenu);
    this.selectedFoodMenu = selectedMenu.fooditems;
    this.menubtnClick = true;
  }
  addToCart(selectedFood) {
    let foodObj = {
      name: selectedFood.name,
      price: selectedFood.price,
      quantity: 0,
      totalPrice: 0,
    };
    this.selectedFoods.push(foodObj);
  }
  removeFromCart(index: number) {
    console.log();
    this.selectedFoods.splice(index, 1);
    this.updateTotalBillAmount();
  }
  updateQty(food: any, action: string) {
    food.quantity = action === 'plus' ? ++food.quantity : --food.quantity;
    food.totalPrice = food.quantity * food.price;
    this.updateTotalBillAmount();
  }

  selectTable(selectedTable) {
    selectedTable.occupied = true;
    this.selectedTableName = selectedTable.name;
    this.tableSelected = true;
  }
  totalBillAmount = 0;

  updateTotalBillAmount() {
    let sum = this.selectedFoods
      .map((o) => o.totalPrice)
      .reduce((a, c) => {
        return a + c;
      });
    this.totalBillAmount = sum;
    console.log(this.selectedFoods);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  printAndReset(selectedTableName) {
    this.modalRef.hide();
    this.tableSelected = false;
    this.selectedFoods = [];
    this.selectedFoodMenu = [];
    for (let i = 0; i < this.restauranttables.length; i++) {
      if (selectedTableName === this.restauranttables[i].name) {
        this.restauranttables[i].occupied = false;
      }
    }
  }
}
