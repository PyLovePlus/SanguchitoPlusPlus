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
                <v-col cols=12>
                    <formulario-pedido></formulario-pedido>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import formularioPedido from "../components/formularioPedido.vue";

export default Vue.extend({
    components: {formularioPedido},
    data() {
        return {};
    },
});
</script>
