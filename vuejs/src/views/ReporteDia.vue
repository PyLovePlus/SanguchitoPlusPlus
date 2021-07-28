<template>
    <div>
        <!--CONTENIDO-->
        <v-container>
            <v-row class="mt-4 mb-4">
                <h2>Reporte de ventas del día ~ {{ this.$route.params.fecha }} 🥪</h2>
            </v-row>

            <v-row>
                <v-data-table
                    :headers="generalEncabezado"
                    :items="datos"
                    :expanded.sync="expanded"
                    item-key="ref_venta"
                    show-expand
                    class="elevation-1"
                    :loading="estaCargando"
                    loading-text="Consultando ventas..."
                    style="width: 100%"
                >
                    <!--CONTENIDO EXPANDIDO-->
                    <template v-slot:expanded-item="{ item }">
                        <div
                            v-for="(producto, index) in item.productos"
                            :key="index + producto.nombre"
                            class="mt-2"
                        >
                            <b>{{ producto.nombre }}</b
                            ><br />
                            <!-- INGREDIENTES -->
                            <div>
                                <span
                                    v-for="(ing, index) in producto.ingredientes"
                                    :key="index + ing"
                                >
                                    {{ ing
                                    }}{{ index == producto.ingredientes.length - 1 ? "" : "," }}
                                </span>
                            </div>
                        </div>
                    </template>
                </v-data-table>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VentasGeneralDTO } from "../controller/dto/ventasGeneral.dto";
import { ControladorReportes } from "../controller/reportes.controller";

export default Vue.extend({
    data() {
        return {
            expanded: [],
            estaCargando: true,
            datos: [] as VentasGeneralDTO[],
            generalEncabezado: [
                { text: "Nro. Venta", value: "ref_venta" },
                { text: "Cliente", value: "nombre_completo" },
                { text: "Fecha", value: "fecha" },
                { text: "Total", value: "total" },
                { text: "Cant. Sandwich", value: "cantidad_sandwich" },
                { text: "", value: "data-table-expand" },
            ],
        };
    },

    mounted() {
        //Obtenemos datos
        ControladorReportes.obtenerVentasSegunDia(this.$route.params.fecha).then((respuesta) => {
            console.log("[RECIBIMOS] ", respuesta);
            this.datos = respuesta;
            this.estaCargando = false;
        });
    },
});
</script>

<style></style>
