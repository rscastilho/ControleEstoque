import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirProdutosComponent } from './excluir-produtos.component';

describe('ExcluirProdutosComponent', () => {
  let component: ExcluirProdutosComponent;
  let fixture: ComponentFixture<ExcluirProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
