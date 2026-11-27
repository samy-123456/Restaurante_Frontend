import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatosAdmin } from './platos-admin';

describe('PlatosAdmin', () => {
  let component: PlatosAdmin;
  let fixture: ComponentFixture<PlatosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
