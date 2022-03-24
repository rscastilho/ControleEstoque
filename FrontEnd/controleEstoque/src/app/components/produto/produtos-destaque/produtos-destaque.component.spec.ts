import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosDestaqueComponent } from './produtos-destaque.component';

describe('ProdutosDestaqueComponent', () => {
  let component: ProdutosDestaqueComponent;
  let fixture: ComponentFixture<ProdutosDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosDestaqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
