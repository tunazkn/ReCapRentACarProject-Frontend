import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { faLiraSign } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails: Car[];
  faLira = faLiraSign;
  baseUrl = 'https://localhost:44334/';
  apiUrl: 'https://localhost:44334/api/';
  rentalDetail: Rental[];
  userFindeksForm: FormGroup;
  findeks: number;
  carFindeks: number

  constructor(private carService: CarService, private userService: UserService, private activatedRoute: ActivatedRoute,
    private cartService: CartService, private rentalService: RentalService,
    private router: Router, private toastrService: ToastrService, private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetail(params["carId"]);
      }
    });
    this.createUserFindeksForm();
  }

  createUserFindeksForm() {
    this.userFindeksForm = this.formBuilder.group({
      tc: ['', Validators.required],
      dateYear: ['', Validators.required],
    });
  }

  getUserFindeks() {
    console.log("basıldı")
    if (this.userFindeksForm.valid) {
      console.log("içerde")
      if (parseInt(this.localStorageService.getItem('findeks')) > 0) {
        this.toastrService.info('Findeks Puanınız: ' + this.localStorageService.getItem('findeks'), "Hesaplama Başarılı")
      } else {
        let userFindeksModel = Object.assign({}, this.userFindeksForm.value);
        this.userService.fakeFindeks(userFindeksModel).subscribe(response => {
          this.findeks = response.data.userFindeks;
          this.localStorageService.setItem('findeks', this.findeks.toString())
          this.toastrService.info('Findeks Hesaplandı. Findeks Puanınız: ' + this.findeks);
        });
      }
    }
    else{
      this.toastrService.error('Findeks puanı hesaplamak için formu doldurunuz.');
    }
  }
  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.carDetails = response.data
      this.toastrService.success("Arabalar Listelendi.", "Başarılı")
    })
  }

  addCart(car: Car) {
    if (this.authService.isAuthenticated()) {
      if (parseInt(this.localStorageService.getItem('findeks')) != undefined || parseInt(this.localStorageService.getItem('findeks')) != null) {
        if (this.carFindeks < parseInt(this.localStorageService.getItem('findeks'))) {
          this.rentalService.getRentalByCarId(car.carId).subscribe(response => {
            this.rentalDetail = response.data;
          });
          if (this.cartService.list().length > 0) {
            this.router.navigate(['/cart'])
          }
          this.cartService.addCart(car);
          this.router.navigate(['/cart'])
        } else {
          this.toastrService.error("Arabayı Kiralayamazsınız. Findeks Puanınız yetmiyor.")
        }
      } else {
        this.toastrService.info("Lütfen Findeks Puanınızı Hesaplayınız")
      }
    } else {
      this.toastrService.info("Lütfen Giriş Yapınız")
    }
  }
}