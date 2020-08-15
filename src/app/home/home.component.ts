import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetDataService } from '../../common/get-data.service';
import { UtilitiesService } from '../shared/utilities.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  foodMenu = [];
  allFoodCategories = [];
  selectedFoodMenu = [];
  selectedFoodMenu1 = [];
  selectedMenuCat = 'Choose your favourites...';
  constructor(
    private service: GetDataService,
    private utilService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.service.getData().subscribe((data) => {
      if (data) {
        this.foodMenu = data;
        this.allFoodCategories = this.utilService.getAllFoodCategories(
          this.foodMenu
        );
        console.log(this.allFoodCategories);
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
  onMenuSelect(selectedMenu: string) {
    console.log(this.foodMenu);

    this.selectedMenuCat = selectedMenu;
    this.selectedFoodMenu1 = this.foodMenu.find((item) => {
      if (item.category === selectedMenu) {
        return item.fooditems;
      }
    });
    this.selectedFoodMenu = this.utilService.getSelectedItemList(
      this.selectedFoodMenu1
    );
    console.log(this.selectedFoodMenu);
  }
}
