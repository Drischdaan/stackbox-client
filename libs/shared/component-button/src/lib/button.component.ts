import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'flex flex-row gap-2 justify-center items-center h-10 disabled:cursor-not-allowed transition-colors duration-300 relative',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:bg-primary-400 disabled:hover:bg-primary-400 disabled:text-neutral-300',
        secondary:
          'bg-surface-300 rounded-md hover:bg-surface-400/60 disabled:bg-surface-200 disabled:hover:bg-surface-200 disabled:text-neutral-400',
        destructive:
          'bg-red-500 rounded-md text-white hover:bg-red-600 disabled:bg-red-400 disabled:hover:bg-red-400 disabled:text-neutral-200',
        outline:
          'border border-surface-300 rounded-md hover:bg-surface-300/60 disabled:border-surface-200 disabled:hover:bg-transparent disabled:text-neutral-400',
        ghost:
          'rounded-md hover:bg-surface-300/60 disabled:hover:bg-transparent disabled:text-neutral-400',
        link: 'hover:underline disabled:hover:no-underline disabled:text-neutral-400',
      },
      size: {
        default: 'py-2 px-5',
        wide: 'py-2 px-10',
        full: 'py-2 px-5 w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants>;
type ButtonVariants = ButtonProps['variant'];
type ButtonSizes = ButtonProps['size'];

@Component({
  selector: 'stackbox-button',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ lucideLoader2 })],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  variant = input<ButtonVariants>('default');
  size = input<ButtonSizes>('default');

  icon = input<string | undefined>();
  iconOnly = input<boolean>(false);
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  loadingText = input<string | undefined>();

  click = output<void>();

  isDisabled = computed(() => this.loading() || this.disabled());

  getClasses(variant: ButtonVariants, size: ButtonSizes) {
    return buttonVariants({ variant, size });
  }

  onClick() {
    if (this.isDisabled()) return;
    this.click.emit();
  }
}
