import { Component, OnInit } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { CarData } from './interfaces/car-data';
import { CarService } from './services/car.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  carInfo!: FormGroup;
  constructor(private carService: CarService){}
  ngOnInit(){
    this.carInfo = new FormGroup({
      rank: new FormControl('', [Validators.required, Validators.min(1)]),
      model: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      changeQuantityPercent: new FormControl('', Validators.required)
    });
  }
  title = 'FossileCarProject';
  cars$: Observable<Array<CarData>> = this.carService.emitCars();
  
  Submit() {
    const car: CarData = {
      rank: this.carInfo.value.rank,
      model: this.carInfo.value.model,
      quantity: this.carInfo.value.quantity,
      changeQuantityPercent: this.carInfo.value.changeQuantityPercent
    };
      if (!this.carService.carExistsByRank(car.rank) || !this.carService.carExistsByModel(car.model)) {
        this.carService.addCar(car);
      } else {
        this.carService.updateCar(car);
      }
      this.cars$ = this.cars$.pipe(map((cars) => {
        cars.sort((a, b) => {
          return a.rank<b.rank ? -1 : 1
        })
        return cars;
      }))
    }
}
