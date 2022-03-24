import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoImagemDestaqueComponent } from './produto-imagem-destaque.component';

describe('ProdutoImagemDestaqueComponent', () => {
  let component: ProdutoImagemDestaqueComponent;
  let fixture: ComponentFixture<ProdutoImagemDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoImagemDestaqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoImagemDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
