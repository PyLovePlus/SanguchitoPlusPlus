<template>
    <div>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h3>Sanguchito++</h3>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>

        <v-container>
            <v-row align="center" justify="center">
                <v-col md="4" align="center">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">Reporte 1</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    General
                                </v-list-item-title>
                                <v-list-item-subtitle>Listado de ventas</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn rounded block color="primary" :to="{ name: 'ReporteGeneral' }">
                                Ver reporte
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4" align="center">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">Reporte 2</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    Por día
                                </v-list-item-title>
                                <v-list-item-subtitle>Listado de ventas</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions align="center">
                            <modal-reporte-dia style="width: 100%"></modal-reporte-dia>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4" align="center">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">Reporte 3</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    Tamaño sandwich
                                </v-list-item-title>
                                <v-list-item-subtitle>Listado de ventas</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn rounded block color="primary"> Ver reporte </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="2"></v-col>
                <v-col md="4" align="center">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">Reporte 4</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    Ingredientes
                                </v-list-item-title>
                                <v-list-item-subtitle>Listado de ventas</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn rounded block color="primary"> Ver reporte </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4" align="center">
                    <v-card class="mx-auto" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">Reporte 5</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    Por clientes
                                </v-list-item-title>
                                <v-list-item-subtitle>Listado de ventas</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn rounded block color="primary"> Ver reporte </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="2"></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import modalReporteDia from "../components/modalReporteDia.vue";

export default Vue.extend({
    components: { modalReporteDia },
    data() {
        return {};
    },
});
</script>
