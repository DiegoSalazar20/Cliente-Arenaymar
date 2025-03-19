import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComollegarComponent } from './comollegar.component';

describe('ComollegarComponent', () => {
  let component: ComollegarComponent;
  let fixture: ComponentFixture<ComollegarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComollegarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComollegarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
