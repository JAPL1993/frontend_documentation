import { Component, OnInit } from '@angular/core';
import { IMenu, MenuService } from 'src/app/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: IMenu[] = [];
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((menu) => (this.menuItems = menu));
  }
}
