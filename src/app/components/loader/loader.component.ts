import { Component } from '@angular/core';
import { LoadingService } from '../../services/loader.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner-overlay" *ngIf="loading$ | async">
      <div class="spinner-container">
        <p-progressSpinner 
          styleClass="custom-spinner"
          strokeWidth="4"
          animationDuration=".7s">
        </p-progressSpinner>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(1px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      animation: fadeIn 0.3s ease-in-out forwards;
    }

    // .spinner-container {
    //   background: white;
    //   padding: 2rem;
    //   border-radius: 1rem;
    //   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    //   animation: scaleIn 0.3s ease-in-out forwards;
    // }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from { 
        transform: scale(0.95);
        opacity: 0;
      }
      to { 
        transform: scale(1);
        opacity: 1;
      }
    }

    :host ::ng-deep .custom-spinner {
      width: 70px !important;
      height: 70px !important;
    }

    :host ::ng-deep .custom-spinner .p-progress-spinner-circle {
      stroke: var(--primary-color, #3B82F6);
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  loading$: any
  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

}