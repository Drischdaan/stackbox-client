import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentDropdownComponent } from './dropdown.component';

describe('ComponentDropdownComponent', () => {
  let component: ComponentDropdownComponent;
  let fixture: ComponentFixture<ComponentDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
