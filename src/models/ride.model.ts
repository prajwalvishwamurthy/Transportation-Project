export interface Ride {
  id: string;
  employeeId: string;
  vehicleType: 'Car' | 'Bike';
  vehicleNo: string;
  vacantSeats: number;
  time: string;
  pickUpPoint: string;
  destination: string;
  createdAt: string;
  bookedBy: string[];
}