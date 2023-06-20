import { Component } from '@angular/core';
import { AdditionalsModel } from 'src/app/Model/additionalsModel';
import { OrderBuilderService } from 'src/app/services/order-builder.service';

@Component({
  selector: 'app-additionals-section',
  templateUrl: './additionals-section.component.html',
  styleUrls: ['./additionals-section.component.scss']
})
export class AdditionalsSectionComponent {

  additionalsArray: AdditionalsModel[] = [];
  selectedAdditionals : string = '';

  constructor(private ob : OrderBuilderService) {

  }

  ngOnInit() : void{
    this.getAdditionals();
  }

  getAdditionals() {
    this.ob.getAllAdditionals().subscribe({
      next: (response: AdditionalsModel[]) => {
        this.additionalsArray = response;
        this.ob.additionalsArray = response;
      },
      error: (error) => {
        console.log('Error getting additionals', error);
      }
    });
  }

    //Read what this method is doing at the end of this file
    updateSelectedAdditionals(extra: AdditionalsModel, isChecked: boolean): void {
      if (isChecked) {
        // Append a comma to selectedAdditionals if there is already an item
        if (this.selectedAdditionals.length > 0) {
          this.selectedAdditionals += ', ';
        }
        //if no item is already there, just add it
        this.selectedAdditionals += extra.name;
      } else {
        // Remove the name of the additional from selectedAdditionals
        const regex = new RegExp(extra.name, 'gi');
        this.selectedAdditionals = this.selectedAdditionals.replace(regex, '');
        // Remove trailing commas and spaces
        this.selectedAdditionals = this.selectedAdditionals.replace(/,\s*,/g, ',');
        this.selectedAdditionals = this.selectedAdditionals.replace(/,\s*$/, '');
        this.selectedAdditionals = this.selectedAdditionals.replace(/^\s*,/, '');
      }
      this.ob.additionals = this.selectedAdditionals;
      this.getGrandTotal()
    }

    getGrandTotal(){
      if (this.ob.additionals) {
        const items = this.ob.additionals.split(',').map(item => item.trim());
        console.log(items);
        
        let totalPrice = 0;
        
        for (const item of items) {
          console.log(item);
          
          const additional = this.ob.additionalsArray.find(a => a.name === item);
          
          if (additional) {
            totalPrice += additional.price;
          }
        }
        if(this.ob.total != undefined){
          this.ob.total = this.ob.total + totalPrice;
        }
      }
    }
  }

/*
const regex = new RegExp(extra.name, 'gi');
this.selectedAdditionals = this.selectedAdditionals.replace(regex, '');

In this part, we create a regular expression using new RegExp() to match the name of the additional (extra.name) 
globally and case-insensitively ('gi' flags). We use this regular expression to replace all occurrences of the 
additional's name in the selectedAdditionals string with an empty string, effectively removing it.
*/