import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pagination} from "../models/pagination";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() pagination: Pagination = {};
  paginas: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    console.log("this.pagination", this.pagination);
    this.paginas = new Array(this.pagination.totalPages - 1)
      .fill(0)
      .map((_valor, indice) => indice + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['pagination'];
    if (paginadorActualizado.previousValue) {
      console.log("El paginador ha cambiado");
    }
  }


}
