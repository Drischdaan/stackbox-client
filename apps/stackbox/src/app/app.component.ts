import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideActivity } from '@ng-icons/lucide';
import { ButtonComponent } from '@stackbox/component-button';
import { DropdownComponent } from '@stackbox/component-dropdown';
import { WorkspacesStore } from '@stackbox/data-access-workspaces';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ lucideActivity })],
})
export class AppComponent implements OnInit {
  workspacesStore: WorkspacesStore = inject(WorkspacesStore);

  loading = signal(false);

  ngOnInit(): void {
    this.workspacesStore.loadList({});
  }

  onSelectItem(item: { id: string; name: string } | null) {
    console.log('Selected Item:', item);
  }
}
