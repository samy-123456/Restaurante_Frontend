import { CurrencyPipe } from '@angular/common';
import { Component,inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {MenuApi} from '../services/menu-api';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-carta-p',
  styleUrl: './carta-p.css',
  templateUrl: './carta-p.html',
})
export class CartaP {
  private api = inject(MenuApi);
  platos = toSignal(this.api.platos(),
    { initialValue: [] });
}
