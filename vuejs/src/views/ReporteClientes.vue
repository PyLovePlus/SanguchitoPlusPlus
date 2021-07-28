<template>
    <div>
        <!--CONTENIDO-->
        <v-container>
            <v-row class="mt-4 mb-4">
                <h2>Reporte de ventas por clientes ~ 🥪</h2>
            </v-row>

            <v-row>
                <v-data-table
                    :headers="generalEncabezado"
                    :items="datos"
                    :expanded.sync="expanded"
                    item-key="nombre_completo"
                    show-expand
                    class="elevation-1"
                    :loading="estaCargando"
                    loading-text="Consultando ventas..."
                    style="width: 100%"
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
import { VentaClienteDTO } from "../controller/dto/ventaCliente.dto";
import { ControladorReportes } from "../controller/reportes.controller";

export default Vue.extend({
    data() {
        return {
            expanded: [],
            estaCargando: true,
            datos: [] as VentaClienteDTO[],
            generalEncabezado: [
                { text: "Cliente", value: "nombre_completo" },
                { text: "Cantidad de compras", value: "cantidad_compras" },
                {
                    text: "Cantidad total de sandwiches",
                    value: "cantidad_total",
                },
                {
                    text: "Total monetario",
                    value: "precio_total",
                },
                { text: "", value: "data-table-expand" },
            ],
        };
    },

    mounted() {
        //Obtenemos datos
        ControladorReportes.obtenerVentasPorClientes().then((respuesta) => {
            console.log("[RECIBIMOS] ", respuesta);
            this.datos = respuesta;
            this.estaCargando = false;
        });
    },
});
</script>

<style></style>
