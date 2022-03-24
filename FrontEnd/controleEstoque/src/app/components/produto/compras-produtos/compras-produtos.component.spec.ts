import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasProdutosComponent } from './compras-produtos.component';

describe('ComprasProdutosComponent', () => {
  let component: ComprasProdutosComponent;
  let fixture: ComponentFixture<ComprasProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
