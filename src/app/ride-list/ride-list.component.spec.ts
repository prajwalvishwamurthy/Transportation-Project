import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RideListComponent } from './ride-list.component';
import { Ride } from 'src/models/ride.model';
import { RideService } from 'src/services/ride.service';


describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;
  let rideServiceSpy: jasmine.SpyObj<RideService>;
  const mockRides: Ride[] = [
    {
      id: '1',
      employeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'CAR123',
      vacantSeats: 3,
      time: new Date().toTimeString().substring(0,5), // current time
      pickUpPoint: 'A',
      destination: 'B',
      createdAt: new Date().toISOString(),
      bookedBy: []
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RideService', ['getRides', 'bookRide']);
    spy.getRides.and.returnValue(of(mockRides));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RideListComponent],
      providers: [{ provide: RideService, useValue: spy }]
    }).compileComponents();

    rideServiceSpy = TestBed.inject(RideService) as jasmine.SpyObj<RideService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and initialize filteredRides', () => {
    expect(component).toBeTruthy();
    expect(component.rides.length).toBe(1);
    expect(component.filteredRides.length).toBe(1);
  });

  it('should filter by vehicle type', () => {
    component.filterForm.controls['vehicleType'].setValue('Bike');
    expect(component.filteredRides.length).toBe(0);

    component.filterForm.controls['vehicleType'].setValue('Car');
    expect(component.filteredRides.length).toBe(1);
  });

  it('should call bookRide with employee ID', () => {
    component.filterForm.controls['employeeId'].setValue('E2');
    component.bookRide('1');
    expect(rideServiceSpy.bookRide).toHaveBeenCalledWith('1', 'E2');
  });
});
