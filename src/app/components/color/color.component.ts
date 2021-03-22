import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import {Filters} from '../../models/filters';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  
  colors: Color[] = [];
  dataLoaded = false;
  error = '';
  currentColor: Color;
  allColor?: Color;
  Filters = { brandId: '', colorId: '' };

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }


  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    }, error=>{
      this.error = error.name;
    })
  }
  setCurrentColor() {
    this.currentColor !== undefined
      ? (Filters.colorId = this.currentColor.colorId.toString())
      : (Filters.colorId = '');
  }
  allColorsSelected() {
    return this.currentColor == undefined ? true : false;
  }
  getColors2() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded =true;
    })
  }
  
  setCurrentColor2(color: Color) {
    this.currentColor=color;
  }
  getCurrentColorClass2(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }
  CleanCurrentBrand(){
    this.getColors();
  }
}
