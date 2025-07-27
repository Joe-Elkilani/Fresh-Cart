import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../shared/interfaces/products/products';
import { SearchService } from '../../core/services/search/search.service';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { environment } from '../../core/environment/environment';
@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly searchService = inject(SearchService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  categories: { name: string, image: string }[] = [];

  products: Products[] = [];
  displayedProducts: Products[] = [];
  private searchSubscription!: Subscription;

  ngOnInit(): void {
    this.getProducts();
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.handleSearch(term);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
  getProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.displayedProducts = res;
        this.extractCategories();
      },
      error: (err) => {
        console.error( err);
      }
    });
  }
  handleSearch(term: string): void {
    this.displayedProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  extractCategories(): void {
  const uniqueMap = new Map<string, string>();

  for (let product of this.products) {
    if (!uniqueMap.has(product.category)) {
      uniqueMap.set(product.category, product.image);
    }
  }

  this.categories = Array.from(uniqueMap, ([name, image]) => ({ name, image }));
  }
  filterByCategory(categoryName: string): void {
    this.displayedProducts = this.products.filter(
      product => product.category === categoryName
    );
  }
  addProductToCart(id:any):void {
    this.cartService.addProductToCart(id).subscribe({
      next:(res) => {
        console.log(res)
      },error:(err) => {
        console.log(err)
      }
    })
  }
}
