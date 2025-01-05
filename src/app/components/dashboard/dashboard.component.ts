import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { response } from '../../models/responseDto';
import { MenuItem } from 'primeng/api';
import { UserStoreService } from '../../services/user-store.service';
import { AllowedRoles } from '../../models/roles';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarVisible = false;
  menuItems: MenuItem[] = [];
  userName: string = ''
  userRole: string = ''
  constructor(private authService: AuthService, private userStore: UserStoreService) {
    this.userStore.getUserNameFromStore().subscribe(val => {
      this.userName = val
    })
    this.userStore.getRoleFromStore().subscribe(val => {
      this.userRole = val
    })
    this.menuItems = [
      {
        visible: this.userRole == AllowedRoles.ADMIN,
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        visible: this.userRole == AllowedRoles.ADMIN,
        label: 'Analytics',
        icon: 'pi pi-chart-bar',
        routerLink: ['/analytics']
      },
      {
        visible: this.userRole == AllowedRoles.USER,
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: ['/settings']
      }
    ];
  }


  showmenu() {
    this.authService.getUsers().subscribe({
      next: (users: response) => {
        console.log('Fetched users:', users);
        this.sidebarVisible = this.sidebarVisible ? false : true;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  ngOnInit() {
    this.menuItems = this.menuItems.filter(x => x.visible == true)
  }

  logout() {
    this.authService.signOut()
  }
}
