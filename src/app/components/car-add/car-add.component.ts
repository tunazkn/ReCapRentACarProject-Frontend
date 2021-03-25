import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  
  carAddForm: FormGroup;
  brands:Brand[];
  colors:Color[];

  constructor(private brandService:BrandService, private toastrService: ToastrService, 
    private colorService:ColorService,private formBuilder: FormBuilder, private carService: CarService, ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.brandList();
    this.colorList();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      CarName: ['', Validators.required],
    });
  }

  brandList(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  colorList(){
    this.colorService.getColors().subscribe(response=> {
      this.colors = response.data;
    })
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı!")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i=0;i<responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat!")
    }
  }
}
