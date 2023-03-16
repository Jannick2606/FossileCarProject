import { Injectable } from '@angular/core';
import { Observable, of, pipe} from 'rxjs';
import { CarData } from '../interfaces/car-data';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Array<CarData> = [];
  constructor() {
   }
   updateCar(car: CarData): void {
    const index = this.cars.findIndex((c) => c.rank === car.rank);
    this.cars[index] = car;
  }
  carExistsByRank(rank: number | null): boolean {
    if (rank === null) {
      return false;
    }
    return this.cars.some((car) => car.rank === rank);
  }
    carExistsByModel(model: string | null): boolean {
      if(model === null){
        return false;
      }
      return this.cars.some((car) => car.model === model);
    }


  emitCars(): Observable<Array<CarData>>{
    return of(this.cars);
  }

  addCar(car: CarData){
    this.cars.push(car);
  }
}
