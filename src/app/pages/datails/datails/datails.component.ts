import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Datails } from '../../../shared/interfaces/datails/datails';

@Component({
  selector: 'app-datails',
  imports: [],
  templateUrl: './datails.component.html',
  styleUrl: './datails.component.css'
})
export class DatailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  prodId:any;
  prodData: Datails | null = null;
  callDatails() {
    this.productsService.getDatails(this.prodId).subscribe({
      next:(res) => {
        this.prodData = res
        console.log(this.prodData)
      },error:(err) => {
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res) => {
        this.prodId = res.get('id');
        this.callDatails()
      },error:(err) => {
        console.log(err)
      }
    })
  }
}
