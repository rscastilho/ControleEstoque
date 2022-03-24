import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirCategoriasComponent } from './excluir-categorias.component';

describe('ExcluirCategoriasComponent', () => {
  let component: ExcluirCategoriasComponent;
  let fixture: ComponentFixture<ExcluirCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
