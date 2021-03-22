import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Car } from '../models/car';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastrService: ToastrService) {}

  /*addToCart2(car: CarDetailDto) {
    let item = CartItems.find((c) => c.carDetail.carId === car.carId);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }*/
  //
  addToCart(car: Car) {
    if (this.list().length > 0) {
      this.toastrService.error(
        'İstenilen Araç Eklenemedi: ' +
          this.list()[this.list().length - 1].car.brandName +
          ' ' +
          this.list()[this.list().length - 1].car.description,
        'Şu Anda Başka Bir Araç var'
      );
    } else {
      let item = CartItems.find((c) => c.car.carId === car.carId);
      let cartItem = new CartItem();
      if (item) {
        this.toastrService.error('Arac Zaten Sepetinizde Mevcut');
      } else {
        cartItem.car = car;
        cartItem.quantity = 1;
        CartItems.push(cartItem);
        this.toastrService.success(
          car.brandName + ' ' + car.description,
          'Sepete Eklendi'
        );
      }
    }
  }

  removeFromCart(car: Car) {
    let item = CartItems.find((c) => c.car.carId === car.carId);
    if (item != null) {
      CartItems.splice(CartItems.indexOf(item), 1);
      this.toastrService.error(
        car.brandName + ' ' + car.description,
        'Başarıyla Kaldırıldı'
      );
    }
  }

  list(): CartItem[] {
    return CartItems;
  }

  removeFromCart2(car: Car) {
    let item: CartItem = CartItems.find((c) => c.car.carId === car.carId);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      CartItems.splice(CartItems.indexOf(item), 1);
    }
  }
}
