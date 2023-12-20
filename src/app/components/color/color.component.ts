import { Component } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent {
  colors:Color[]=[];
  currentColor:Color;

  constructor(private colorService:ColorService){}
  ngOnInit():void{
    this.getColors();
  }
  
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      console.log();
      this.colors=response.data
    })
  }

  setCurrentColor(color:Color){
    console.log();
    this.currentColor=color;
   }

getCurrentColorClass(color:Color){
  if(color==this.currentColor)
  {
    return "list-group-item active"
  }
  else
  {
    return "list-group-item"
  }
 }

 getAllColorClass(){
  if(!this.currentColor){
    return "list-group-item active"
  }
  else{
    return "list-group-item"
  }
 }
}

