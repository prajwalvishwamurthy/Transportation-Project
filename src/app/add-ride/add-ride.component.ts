import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RideService } from 'src/services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css'],
})
export class AddRideComponent implements OnInit {
  rideForm!: FormGroup;

  constructor(private fb: FormBuilder, private rideService: RideService) {}

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleType: ['Car', Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: [1, [Validators.required, Validators.min(1)]],
      time: [this.getCurrentTime(), Validators.required],
      pickUpPoint: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  private getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  addRide() {
    if (this.rideForm.invalid) return;

    this.rideService.addRide({
      ...this.rideForm.value,
      vehicleType: this.rideForm.value.vehicleType as 'Car' | 'Bike',
    });
    alert('Ride added successfully');
    this.rideForm.reset({
      vehicleType: 'Car',
      vacantSeats: 1,
      time: this.getCurrentTime(),
    });
  }
}
