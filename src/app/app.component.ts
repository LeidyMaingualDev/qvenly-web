import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/principalShares/nav/nav.component';
import { FooterComponent } from './shared/principalShares/footer/footer.component';
import { HomeComponent } from './features/landing/home/home.component';
import { FeaturesSectionComponent } from './features/landing/features-section/features-section.component';
import { EventTypesSectionComponent } from './features/landing/event-types-section/event-types-section.component';
import { CtaSectionComponent } from './features/landing/cta-section/cta-section.component';
import { PricingComponent } from './features/pricing/pricing.component';

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet, NavComponent, FooterComponent, HomeComponent, FeaturesSectionComponent, EventTypesSectionComponent, CtaSectionComponent, PricingComponent],
=======
  imports: [RouterOutlet, NavComponent, FooterComponent, HomeComponent, FeaturesSectionComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qvenly-web';
}