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
                                <div class="text-overline mb-4">Crear Pedido</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    Crear Pedido
                                </v-list-item-title>
                                <v-list-item-subtitle>Crear Pedido de Clientes</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn rounded block color="primary" :to="{ name: 'CrearPedido' }">
                                Crear Pedido
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
//import modalReporteDia from "../components/modalReporteDia.vue";

export default Vue.extend({
    //components: { modalReporteDia },
    data() {
        return {};
    },
});
</script>
