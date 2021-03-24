import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RentalDetailDto } from '../../models/rentalDetailDto';
import { FakeCreditCard } from '../../models/fakeCreditCard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  
  totalPrice: number = 0;
  returnDate: Date;
  carId: number;
  year: number;
  month: number;
  day: number;
  rental: RentalDetailDto = new RentalDetailDto();
  fakeCreditCard: FakeCreditCard = new FakeCreditCard();
  rentalForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
  }

  createForm() {
    this.rentalForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  addRental(rental: RentalDetailDto, fakeCreditCard: FakeCreditCard) {
    this.rentalService.addRental(rental, fakeCreditCard).subscribe(response => {
      this.toastrService.success('Araç kiralandı');
    });
  }
}
