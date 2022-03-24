import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoUsuarioComponent } from './carrinho-usuario.component';

describe('CarrinhoUsuarioComponent', () => {
  let component: CarrinhoUsuarioComponent;
  let fixture: ComponentFixture<CarrinhoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
