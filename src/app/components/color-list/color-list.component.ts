import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors: Color[] = [];
  dataLoaded = false; 
  currentColor: Color;//tsconfig.json'da "strictPropertyInitialization": false yaptık hata vermiyor artık
    
  constructor(private colorService: ColorService ) { }

  ngOnInit(): void {
    this.getColors();
  }

  
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  
  setCurrentBrand(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }
  CleanCurrentColor(){
    this.getColors();
  }
}
