import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/principalShares/nav/nav.component';
<<<<<<< Updated upstream
=======
import { FooterComponent } from './shared/principalShares/footer/footer.component';
import { HomeComponent } from './features/landing/home/home.component';
import { FeaturesSectionComponent } from './features/landing/features-section/features-section.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet, NavComponent],
=======
  imports: [RouterOutlet, NavComponent, FooterComponent, HomeComponent, FeaturesSectionComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qvenly-web';
}