import { Component } from "@angular/core";  
import { RouterLink } from "@angular/router";
@Component({
    selector:'app-inicio',
    imports:[RouterLink],
    template:
    `
    <h1> Hola Mundo</h1>
    <p>Estudiantes Bienvenidos </p>
    <button type="button" routerLink="/carta">Ver carta</button>
    <button type="button" routerLink="/pedido">Pedido</button>
    <button type="button" routerLink="/categorias">Categorias</button>
    `,

})
export class Inicio{}