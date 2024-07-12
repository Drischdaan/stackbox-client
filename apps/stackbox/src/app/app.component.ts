import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideActivity } from '@ng-icons/lucide';
import { ButtonComponent } from '@stackbox/component-button';
import { DropdownComponent } from '@stackbox/component-dropdown';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ lucideActivity })],
})
export class AppComponent {
  items: { id: string; name: string; logo: string }[] = [
    {
      id: '1',
      name: 'Item 1',
      logo: 'https://api.dicebear.com/9.x/initials/svg?seed=Maggie',
    },
    {
      id: '2',
      name: 'Item 2',
      logo: 'https://api.dicebear.com/9.x/initials/svg?seed=Lola',
    },
    {
      id: '3',
      name: 'Item 3',
      logo: 'https://api.dicebear.com/9.x/initials/svg?seed=Abby',
    },
  ];

  loading = signal(false);

  onSelectItem(item: { id: string; name: string } | null) {
    console.log('Selected Item:', item);
  }
}
