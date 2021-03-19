import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetailDto[] = [];
  currentRental:RentalDetailDto;
  dataLoaded=false;
  
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded =true;
    })
  }
  setCurruntRentalDetail(rentalDetailDto: RentalDetailDto) {
    this.currentRental=rentalDetailDto;
  }
}
