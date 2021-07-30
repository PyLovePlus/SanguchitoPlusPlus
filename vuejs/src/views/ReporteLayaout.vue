<template>
    <div>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-btn :to="{ name: 'MenuReporte' }" text exact>
                    <v-icon>mdi-arrow-left-bold</v-icon>
                </v-btn>

                <h3>Sanguchito++</h3>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- CONTENIDO -->
        <router-view />
    </div>
</template>
