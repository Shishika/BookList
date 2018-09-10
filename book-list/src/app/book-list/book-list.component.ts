import { ProductService } from './../shared/services/ProductService.service';
import { IBookList } from './../shared/bookList.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  pageTitle: string = 'Book List';
  showImage: boolean = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IBookList[];
  products: IBookList[] = [];

  constructor(private productService: ProductService) {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IBookList[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IBookList) =>
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    this.listFilter = 'cart';
  }
}
