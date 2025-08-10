import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ride } from 'src/models/ride.model';
import { RideService } from 'src/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  filteredRides: Ride[] = [];
  filterForm!: FormGroup;

  constructor(private rideService: RideService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      employeeId: [''],
      vehicleType: [''],
    });

    this.rideService.getRides().subscribe((allRides) => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Filter by time buffer
      this.rides = allRides.filter((ride) => {
        const [hours, minutes] = ride.time.split(':').map(Number);
        const rideTime = hours * 60 + minutes;
        return Math.abs(currentTime - rideTime) <= 60;
      });

      this.applyFilters();
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const { vehicleType } = this.filterForm.value;

    this.filteredRides = this.rides.filter((ride) => {
      return !vehicleType || ride.vehicleType === vehicleType;
    });
  }

  bookRide(rideId: string) {
    const employeeId = this.filterForm.value.employeeId.trim();

    if (!employeeId) {
      alert('Enter your Employee ID to book.');
      return;
    }

    const success = this.rideService.bookRide(rideId, employeeId);
    if (success) {
      alert('Ride booked successfully');
    } else {
      alert('Booking failed. You may have already booked or are the driver.');
    }
  }
}
