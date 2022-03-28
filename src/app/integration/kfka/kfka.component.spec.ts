import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KfkaComponent } from './kfka.component';

describe('KfkaComponent', () => {
  let component: KfkaComponent;
  let fixture: ComponentFixture<KfkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KfkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KfkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
