import { CurrencyPipe } from '@angular/common';
import { Component,inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {CategoriaApi} from '../../services/categoria-api';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-pages',
  styleUrl: './categorias.css',
  templateUrl: './categorias.html',
})
export class Categorias {
  private api = inject(CategoriaApi);
  categorias = toSignal(this.api.categorias(),
    { initialValue: [] });
}
