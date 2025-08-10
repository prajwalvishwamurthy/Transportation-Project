import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ride } from '../models/ride.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private rides: Ride[] = [];
  private ridesSubject = new BehaviorSubject<Ride[]>([]);

  getRides(): Observable<Ride[]> {
    return this.ridesSubject.asObservable();
  }

  addRide(ride: Omit<Ride, 'id' | 'createdAt' | 'bookedBy'>): void {
    const newRide: Ride = {
      ...ride,
      id: uuid(),
      createdAt: new Date().toISOString(),
      bookedBy: [], 
    };

    this.rides.push(newRide);
    this.ridesSubject.next([...this.rides]);
  }

  bookRide(rideId: string, employeeId: string): boolean {
    const ride = this.rides.find((r) => r.id === rideId);
    if (
      ride &&
      ride.employeeId !== employeeId &&
      !ride.bookedBy.includes(employeeId) &&
      ride.vacantSeats > 0
    ) {
      ride.vacantSeats--;
      ride.bookedBy.push(employeeId);
      this.ridesSubject.next([...this.rides]);
      return true;
    }
    return false;
  }
}
