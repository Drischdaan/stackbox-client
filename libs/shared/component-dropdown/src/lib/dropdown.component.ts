import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideChevronUp } from '@ng-icons/lucide';

@Component({
  selector: 'stackbox-dropdown',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ lucideChevronDown, lucideChevronUp })],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class DropdownComponent<
  TData extends { id: string; [key: string]: string }
> {
  items = input.required<TData[]>();
  namePath = input<string>('name');
  logoPath = input<string>();

  disabled = input<boolean>();

  onSelect = output<TData | null>();
  onSelectId = output<string | null>();

  selectedId = model<string | null>(null);
  open = signal<boolean>(false);

  filteredItems = computed(() => {
    return this.items().filter((item) => item.id !== this.selectedId());
  });

  constructor(private readonly elementRef: ElementRef) {}

  getItem(id: string | null): TData | null {
    if (!id) return null;
    return this.items().find((item) => item.id === id) || null;
  }

  getItemName(item: TData): string | null {
    return item[this.namePath()];
  }

  getItemLogo(item: TData): string | null {
    const logoPath: string | undefined = this.logoPath();
    if (!logoPath) return null;
    return item[logoPath];
  }

  selectItem(item: TData) {
    this.selectedId.set(item.id);
    this.onSelect.emit(item);
    this.onSelectId.emit(item.id);
    this.open.set(false);
  }

  toggleDropdown() {
    this.open.set(!this.open());
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.open()) {
      this.open.set(false);
    }
  }
}
