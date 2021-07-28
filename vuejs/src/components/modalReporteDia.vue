<template>
    <div>
        <v-dialog transition="dialog-bottom-transition" max-width="600" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn rounded block color="primary" v-bind="attrs" v-on="on">Ver reporte</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>Listado de ventas por dia</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-date-picker
                                        v-model="fecha"
                                        show-adjacent-months
                                        full-width
                                        locale="es-es"
                                        :max="fecha_maxima"
                                    ></v-date-picker>
                                    <p class="red--text" v-show="!esValido">
                                        ¡Debes seleccionar una fecha!
                                    </p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn outlined @click="dialog.value = false">Cerrar</v-btn>
                        <v-btn color="primary" @click="ejecutarReporte">Ver ventas</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            fecha: null,
            esValido: true,
            fecha_maxima: null,
        };
    },
    methods: {
        validar() {
            if (this.fecha != null && this.fecha != "") {
                console.log("Valido!", this.fecha);
                this.esValido = true;
                return true;
            }

            this.esValido = false;
            return false;
        },
        ejecutarReporte() {
            if (this.validar()) {
                this.$router.push({ name: "ReporteDia", params: { fecha: this.fecha } });
            }
        },
    },
    mounted() {
        //Hasta hoy como fecha maxima
        this.fecha_maxima = new Date().toISOString().split("T")[0];
    },
});
</script>
<style></style>
