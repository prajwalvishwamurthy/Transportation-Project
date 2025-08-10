import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRideComponent } from './add-ride.component';
import { RideService } from 'src/services/ride.service';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: ComponentFixture<AddRideComponent>;
  let rideServiceSpy: jasmine.SpyObj<RideService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RideService', ['addRide']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddRideComponent],
      providers: [{ provide: RideService, useValue: spy }],
    }).compileComponents();

    rideServiceSpy = TestBed.inject(RideService) as jasmine.SpyObj<RideService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and form initialized invalid', () => {
    expect(component).toBeTruthy();
    expect(component.rideForm.invalid).toBeTrue();
  });

  it('should make form valid when filled correctly', () => {
    component.rideForm.setValue({
      employeeId: 'E123',
      vehicleType: 'Car',
      vehicleNo: 'ABC123',
      vacantSeats: 2,
      time: '12:30',
      pickUpPoint: 'Office',
      destination: 'Home',
    });
    expect(component.rideForm.valid).toBeTrue();
  });

  it('should call RideService.addRide on submit when form valid', () => {
    const formValue = {
      employeeId: 'E123',
      vehicleType: 'Bike' as 'Bike',
      vehicleNo: 'XYZ789',
      vacantSeats: 1,
      time: '09:00',
      pickUpPoint: 'Start',
      destination: 'End',
    };

    component.rideForm.setValue(formValue);

    component.addRide();

    expect(rideServiceSpy.addRide).toHaveBeenCalledWith(formValue);
  });
});
