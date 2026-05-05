import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/principalShares/nav/nav.component';
import { FooterComponent } from './shared/principalShares/footer/footer.component';
import { FeaturesSectionComponent } from './features/landing/features-section/features-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, FeaturesSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qvenly-web';
}