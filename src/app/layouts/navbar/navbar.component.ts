import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, Output,EventEmitter, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../core/services/search/search.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private flowbiteService: FlowbiteService) {}
  private readonly searchService = inject(SearchService)
  searchTerm: string = '';
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  onSearchInputChange() {
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
