import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaP } from './carta-p';

describe('CartaP', () => {
  let component: CartaP;
  let fixture: ComponentFixture<CartaP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaP],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
