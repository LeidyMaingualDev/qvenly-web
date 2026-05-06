import { Component } from '@angular/core';
import { FeaturesSectionComponent } from '../features-section/features-section.component';
import { EventTypesSectionComponent } from '../event-types-section/event-types-section.component';
import { PricingComponent } from '../../pricing/pricing.component';
import { CtaSectionComponent } from '../cta-section/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturesSectionComponent, EventTypesSectionComponent, PricingComponent, CtaSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}