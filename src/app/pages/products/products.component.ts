import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../shared/interfaces/products/products';
import { SearchService } from '../../core/services/search/search.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private readonly searchService = inject(SearchService);
  private readonly productsService = inject(ProductsService);
  categories: { name: string, image: string }[] = [];

  products: Products[] = [];
  displayedProducts: Products[] = [];
  private searchSubscription!: Subscription;
  searchTerm: string = '';
  selectedCategory: string = 'All';

  ngOnInit(): void {
    this.getProducts();
  this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
  this.searchTerm = term;
  this.applyFilters();
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
    this.selectedCategory = categoryName;
    this.applyFilters();
  }
  applyFilters(): void {
  this.displayedProducts = this.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
    return matchesSearch && matchesCategory;
  });
}

}
