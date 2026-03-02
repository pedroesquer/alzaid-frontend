/*Aside menu SuperUsuario*/

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-aside-superUsuario-menu",
    standalone: true,                                 
    imports: [CommonModule, RouterModule],
    templateUrl: "./aside-superUsuario-menu.component.html",
    styleUrls: ["./aside-superUsuario-menu.component.css"]
})

export class AsideSuperUsuarioMenuComponent {

    /*info obtenida desde backend*/
    userName = 'Juan Pérez';
    userRole = 'Super Usuario';

    estanciasOpen = false;

    /* Click — abre/cierra */
    toggleEstancias() {
        this.estanciasOpen = !this.estanciasOpen;
    }

    /* Hover — abre al entrar el mouse */
    openEstancias() {
        this.estanciasOpen = true;
    }

    /* Hover — cierra al salir el mouse */
    closeEstancias() {
        this.estanciasOpen = false;
    }

    logout() {
        console.log('Cerrar sesión');
        // Aquí limpias token y rediriges
    }

}