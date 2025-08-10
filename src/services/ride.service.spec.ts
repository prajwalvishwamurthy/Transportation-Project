import { TestBed } from '@angular/core/testing';
import { RideService } from './ride.service';
import { Ride } from '../models/ride.model';
import { take } from 'rxjs/operators';

describe('RideService', () => {
  let service: RideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new ride and emit it', (done) => {
    const rideInput: Omit<Ride, 'id' | 'createdAt' | 'bookedBy'> = {
      employeeId: 'E001',
      vehicleType: 'Car',
      vehicleNo: 'KA01AA1234',
      vacantSeats: 2,
      time: '10:30',
      pickUpPoint: 'Location A',
      destination: 'Location B'
    };

    service.getRides().pipe(take(1)).subscribe(rides => {
      expect(rides.length).toBe(0);
    });

    service.addRide(rideInput);

    service.getRides().pipe(take(1)).subscribe(rides => {
      expect(rides.length).toBe(1);
      expect(rides[0].employeeId).toBe('E001');
      expect(rides[0].bookedBy.length).toBe(0);
      done();
    });
  });

  it('should allow booking a ride if criteria are met', () => {
    const rideInput: Omit<Ride, 'id' | 'createdAt' | 'bookedBy'> = {
      employeeId: 'E001',
      vehicleType: 'Car',
      vehicleNo: 'KA01AA5678',
      vacantSeats: 1,
      time: '11:00',
      pickUpPoint: 'Point X',
      destination: 'Point Y'
    };

    service.addRide(rideInput);

    let rideId: string = '';
    service.getRides().pipe(take(1)).subscribe(rides => {
      rideId = rides[0].id;
    });

    const success = service.bookRide(rideId, 'E002');
    expect(success).toBeTrue();

    service.getRides().pipe(take(1)).subscribe(rides => {
      expect(rides[0].vacantSeats).toBe(0);
      expect(rides[0].bookedBy.includes('E002')).toBeTrue();
    });
  });

  it('should NOT allow booking if employee is the driver', () => {
    const rideInput: Omit<Ride, 'id' | 'createdAt' | 'bookedBy'> = {
      employeeId: 'E003',
      vehicleType: 'Bike',
      vehicleNo: 'MH12BB1234',
      vacantSeats: 1,
      time: '12:00',
      pickUpPoint: 'A',
      destination: 'B'
    };

    service.addRide(rideInput);
    let rideId: string = '';
    service.getRides().pipe(take(1)).subscribe(rides => rideId = rides[0].id);

    const success = service.bookRide(rideId, 'E003');
    expect(success).toBeFalse();
  });

  it('should NOT allow booking twice by same employee', () => {
    const rideInput: Omit<Ride, 'id' | 'createdAt' | 'bookedBy'> = {
      employeeId: 'E004',
      vehicleType: 'Car',
      vehicleNo: 'UP14CC9876',
      vacantSeats: 2,
      time: '13:00',
      pickUpPoint: 'P',
      destination: 'Q'
    };

    service.addRide(rideInput);

    let rideId: string = '';
    service.getRides().pipe(take(1)).subscribe(rides => rideId = rides[0].id);

    const firstTry = service.bookRide(rideId, 'E005');
    const secondTry = service.bookRide(rideId, 'E005');

    expect(firstTry).toBeTrue();
    expect(secondTry).toBeFalse();

    service.getRides().pipe(take(1)).subscribe(rides => {
      expect(rides[0].bookedBy.length).toBe(1);
    });
  });
});
