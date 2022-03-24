import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarCategoriasComponent } from './atualizar-categorias.component';

describe('AtualizarCategoriasComponent', () => {
  let component: AtualizarCategoriasComponent;
  let fixture: ComponentFixture<AtualizarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
