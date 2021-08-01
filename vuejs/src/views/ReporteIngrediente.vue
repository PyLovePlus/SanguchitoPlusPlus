<template>
    <div>
        <!--CONTENIDO-->
        <v-container>
            <v-row class="mt-4 mb-4">
                <h2>Reporte de ventas por ingredientes de 🥪</h2>
            </v-row>

            <v-row>
                <v-data-table
                    :headers="generalEncabezado"
                    :items="datos"
                    :expanded.sync="expanded"
                    item-key="nombre_ingrediente"
                    show-expand
                    class="elevation-1"
                    :loading="estaCargando"
                    loading-text="Consultando ventas..."
                    style="width: 100%"
                    sort-by="precio_total"
                    sort-desc="false"
                >
                    <!--CONTENIDO EXPANDIDO-->
                    <template v-slot:expanded-item="{ item }">
                        <ul>
                            <li v-for="venta in item.ventas" :key="venta.ref_venta" class="mt-2">
                                Venta <b>#{{ venta.ref_venta }}</b> - {{ venta.fecha }} - (total:
                                {{ venta.cantidad }})
                            </li>
                        </ul>
                    </template>
                </v-data-table>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VentasIngredienteDTO } from "../controller/dto/ventaIngrediente.dto";
import { ControladorReportes } from "../controller/reportes.controller";

export default Vue.extend({
    data() {
        return {
            expanded: [],
            estaCargando: true,
            datos: [] as VentasIngredienteDTO[],
            generalEncabezado: [
                { text: "Ingrediente", value: "nombre_ingrediente" },
                { text: "Total consumido (USD)", value: "precio_total" },
                {
                    text: "Cantidad total de ingrediente vendido en todas las ventas",
                    value: "cantidad_total",
                },
                { text: "", value: "data-table-expand" },
            ],
        };
    },

    mounted() {
        //Obtenemos datos
        ControladorReportes.obtenerVentasPorIngredientes().then((respuesta) => {
            console.log("[RECIBIMOS] ", respuesta);
            this.datos = respuesta;
            this.estaCargando = false;
        });
    },
});
</script>

<style></style>
