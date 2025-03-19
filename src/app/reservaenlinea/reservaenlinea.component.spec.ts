import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaenlineaComponent } from './reservaenlinea.component';

describe('ReservaenlineaComponent', () => {
  let component: ReservaenlineaComponent;
  let fixture: ComponentFixture<ReservaenlineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaenlineaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaenlineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
