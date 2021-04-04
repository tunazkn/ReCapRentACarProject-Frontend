import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import {Filters} from '../../models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  colors : Color[];
  brands : Brand[];
  constructor(private router: Router, private brandService:BrandService, private colorService:ColorService) {
  }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  setRoute() {
    if (Filters['brandId'] && Filters['colorId']) {
      this.router.navigate([
        `cars/brand/${Filters.brandId}/color/${Filters.colorId}`,
      ]);
    } else if (Filters['brandId']) {
      this.router.navigate([`cars/brand/${Filters.brandId}`]);
    } else if (Filters['colorId']) {
      this.router.navigate([`cars/color/${Filters.colorId}`]);
    } else {
      this.router.navigate([`cars/`]);
    }
  }

  clearRoute() {
    this.router.navigate([`cars/`]);
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}