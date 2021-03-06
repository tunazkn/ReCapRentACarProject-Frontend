import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { Car } from '../../models/car';
import { Router } from '@angular/router';
import { RentalDetailDto } from '../../models/rentalDetailDto';
import { faLiraSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  baseUrl = 'https://localhost:44334/';
  faLira = faLiraSign;
  model = new NgbDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  rentalResponse: Rental[];
  now = new Date();
  date: string;
  totalPrice: number = 0;
  carDetailReturnDate: Date;
  dayDifference:number;
  constructor(
    private cartService: CartService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCart();
    if (this.cartService.list().length == 0) {
      this.toastrService.info('Sepetiniz Boş Yönlendiriliyor...');
      this.router.navigate(['/']);
    } else {
      this.totalPrice = this.cartItems[
        this.cartItems.length - 1
      ].car.dailyPrice;
      this.rentalService
        .getRentalByCarId(this.cartItems[this.cartItems.length - 1].car.carId)
        .subscribe((response) => {
          if (response.data.length != 0) {
            this.rentalResponse = response.data;
            this.carDetailReturnDate = this.rentalResponse[
              this.rentalResponse.length - 1
            ].returnDate;
          }
        });
    }
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  createRental() {
    if (!this.checkCarReturnDate()) {
      this.router.navigate(['/cart']);
    } else if (this.checkCarReturnDate()) {
      let MyRental: RentalDetailDto = {
        returnDate: new Date(
          this.model.year,
          this.model.month - 1,
          this.model.day + 1
        ),
        carId: this.cartItems[0].car.carId,
        customerId: 1
      };
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        'You are being redirected to the payment page...',
        'Payment Transactions'
      );
    }
  }

  checkCarReturnDate(): boolean {
    if (this.carDetailReturnDate != undefined) {
      var fullDate = this.carDetailReturnDate.toString().split('-', 3);
      var day = parseInt(fullDate[2]);
      var month = parseInt(fullDate[1]);
      var year = parseInt(fullDate[0]);
      var date1 = new Date(year, month, day);
      var date2 = new Date(this.model.year, this.model.month, this.model.day);
      console.log(date1);
      console.log(date2);
      if (date1.getFullYear() > date2.getFullYear()) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      } else if (
        date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() > date2.getMonth()
      ) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      } else if (
        date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() >= date2.getDate()
      ) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      }
    } else {
      if (this.now.getFullYear() > this.model.year) {
        this.toastrService.error('Geçmişe Araç Alınamaz');
        return false;
      } else if (
        this.now.getFullYear() == this.model.year &&
        this.now.getMonth() > this.model.month
      ) {
        this.toastrService.error('Geçmişe Araç Alınamaz');
        return false;
      } else if (this.now.getDate() == this.model.day) {
        this.toastrService.error('Bugün Teslim Edilmek Şartıyla Araç Alınamaz');
        return false;
      } else if (
        this.now.getFullYear() == this.model.year &&
        this.now.getDate() > this.model.day
      ) {
        this.toastrService.error('Geçmişe Araç Alınamaz');
        return false;
      }
    }
    return true;
  }

  calculatePrice(): number {
    var date1 = new Date(
      this.now.getFullYear(),
      this.now.getMonth(),
      this.now.getDate()
    );
    var date2 = new Date(this.model.year, this.model.month - 1, this.model.day);
    var timeDifference = Math.abs(date2.getTime() - date1.getTime());
    this.dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    this.totalPrice =
      this.dayDifference * this.cartItems[this.cartItems.length - 1].car.dailyPrice;
    return this.totalPrice;
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    if (this.cartService.list().length == 0) {
      this.toastrService.info("Anasayfa'ya Yönlendiriliyor...");
      this.router.navigate(['/']);
    }
  }
}
