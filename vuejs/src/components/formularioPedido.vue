<template>
  <div>
    <v-card elevation="2" class="mx-auto mt-2" shaped>
      <v-card-text>
        <p class="text-h4 text--primary">Datos del pedido</p>
        <div class="text--primary">
          <p class="mb-0 primary--text text-subtitle-1">Datos del cliente</p>
          <v-row>
            <v-col cols="9">
              <v-select
                v-model="cedulaCliente"
                :items="clientes"
                item-value="cedula"
                item-text="nombreCompleto"
                label="Cliente"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-btn
                :disabled="cedulaCliente != null"
                color="deep-purple darken-1"
                class="mt-4 white--text"
                @click="dialogCliente = true"
              >
                <v-icon left> mdi-plus </v-icon>
                Agregar Cliente
              </v-btn>
            </v-col>
          </v-row>
          <p class="mb-2 primary--text text-subtitle-1">
            Productos Solicitados
          </p>
          <v-row>
            <v-btn
              class="ml-3 my-3 mr-2 white--text"
              color="deep-purple darken-1"
              @click="mostrarIngredientes"
            >
              <v-icon left> mdi-plus </v-icon>
              Agregar Sandwich
            </v-btn>
            <v-btn
              class="my-3 white--text"
              color="deep-purple darken-1"
              dark
              @click="dialogRefrescos = true"
            >
              <v-icon left> mdi-plus </v-icon>
              Agregar Refresco
            </v-btn>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
              <v-data-table
                v-if="productos.length > 0"
                :headers="headersTabla"
                :items="productos"
                class="elevation-1"
                sort-by="producto"
              >
                <template v-slot:[`item.acciones`]="{ item }">
                  <v-icon
                    v-if="item.producto == 'Sandwich'"
                    small
                    class="mr-2"
                    color="primary"
                    @click="mostrarIngredientesDeSandwich(item)"
                  >
                    mdi-eye
                  </v-icon>
                  <v-icon small color="red" @click="eliminarProducto(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <p class="mt-3 mb-2 primary--text text-subtitle-1">Total a Pagar</p>
          <v-row>
            <v-col cols="4">
              <span class="text-subtitle-1">
                Sandwich(s): {{ totalSandwichs }} $
              </span>
            </v-col>
            <v-col cols="4">
              <span class="text-subtitle-1">
                Refresco(s): {{ totalRefrescos }} $
              </span>
            </v-col>
            <v-col cols="4">
              <span class="text-subtitle-1 green--text font-weight-bold">
                Total: {{ totalSandwichs + totalRefrescos }} $
              </span>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mr-2">
        <v-btn class="mb-2" text color="primary" :to="{ name: 'MenuCaja' }">
          Cancelar
        </v-btn>
        <v-btn
          class="mb-2"
          color="primary"
          @click="enviarPedido"
          :disabled="existenSandwichs"
        >
          Crear Pedido
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- Dialog Cliente-->
    <v-dialog v-model="dialogCliente" width="500">
      <v-card>
        <v-card-title class="text-h5"> Agregar Cliente </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="cliente.cedula"
            class="mb-4"
            type="Cedula"
            hide-details
            label="Cédula"
          >
          </v-text-field>
          <v-text-field
            v-model="cliente.nombre"
            class="mb-4"
            type="Nombre"
            hide-details
            label="Nombre"
          >
          </v-text-field>
          <v-text-field
            v-model="cliente.apellido"
            class="mb-4"
            type="Apellido"
            hide-details
            label="Apellido"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" text @click="limpiarCliente"> Cancelar </v-btn>
          <v-btn
            :disabled="
              cliente.cedula == null ||
              cliente.nombre == null ||
              cliente.apellido == null
            "
            color="primary"
            @click="crearCliente"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Sandwiches-->
    <v-dialog v-model="dialogSandwich" width="600">
      <v-card>
        <v-card-title class="text-h5">
          Agregar Ingredientes al Sandwich
        </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <v-col cols="6">
              <v-select
                v-model="medidaSeleccionada"
                :items="medidasSandwich"
                item-text="nombreYprecio"
                item-value="id"
                :menu-props="{ maxHeight: '400' }"
                label="Tamaño"
                hide-details
              >
              </v-select>
            </v-col>
            <v-col cols="4"> </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="6">
              <v-select
                v-model="ingredienteSeleccionado"
                :items="ingredientesAmostrar"
                item-text="nombre"
                item-value="id"
                :menu-props="{ maxHeight: '400' }"
                label="Ingredientes Adicionales"
                hide-details
              >
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-btn
                :disabled="ingredienteSeleccionado == 0"
                color="deep-purple darken-1"
                class="mt-4 white--text"
                @click="agregarIngrediente"
              >
                Agregar Ingrediente
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <ul class="ml-6">
                <li
                  v-for="ingrediente in ingredientesSeleccionados"
                  :key="ingrediente.id"
                  class="pb-0 primary--text text-subtitle-1 ingrediente"
                >
                  {{ ingrediente.nombre }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn class="mb-2" color="primary" text @click="limpiarSandwich">
            Cancelar
          </v-btn>
          <v-btn
            class="mb-2"
            :disabled="medidaSeleccionada == null"
            color="primary"
            @click="agregarSandwich"
          >
            Agregar Sandwich
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Refrescos-->
    <v-dialog v-model="dialogRefrescos" width="600">
      <v-card>
        <v-card-title class="text-h5"> Agregar Refrescos </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <v-col cols="6">
              <v-select
                v-model="refrescoSeleccionado"
                :items="refrescos"
                item-text="nombreYprecio"
                item-value="id"
                :menu-props="{ maxHeight: '400' }"
                label="Refresco"
                hide-details
              >
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-btn
                :disabled="refrescoSeleccionado == 0"
                color="deep-purple darken-1"
                class="mt-4 white--text"
                @click="agregarRefresco"
              >
                Agregar Refresco
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <ul class="ml-6">
                <li
                  v-for="refresco in refrescosSeleccionados"
                  :key="refresco.id"
                  class="pb-0 primary--text text-subtitle-1 refresco"
                >
                  {{ refresco.nombre }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn class="mb-2" color="primary" text @click="limpiarRefresco">
            Cancelar
          </v-btn>
          <v-btn
            class="mb-2"
            :disabled="refrescosSeleccionados.length == 0"
            color="primary"
            @click="agregarRefrescos"
          >
            Agregar Refresco(s)
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Ingredientes Sandwich-->
    <v-dialog v-model="dialogIngredientes" width="600">
      <v-card>
        <v-card-title class="text-h5">
          Ingredientes del sandwich: {{ sandwichConIngredientes.medida }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="10">
              <ul class="">
                <li
                  v-for="ingrediente in sandwichConIngredientes.ingredientes"
                  :key="ingrediente.id"
                  class="pb-0 primary--text text-subtitle-1 ingrediente"
                >
                  {{ ingrediente.nombre }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            class="mb-2"
            color="primary"
            @click="dialogIngredientes = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" top>
      {{ snackbarMensaje }}

      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="snackbar = false">
          Aceptar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//import { CajaClienteDTO } from "../controller/dto/ventaCliente.dto";
import { ControladorCaja } from "../controller/pedidos.controller";
import { PedidoDTO } from "../controller/dto/cajaPedido.dto";
import { ClienteDTO } from "../controller/dto/cajaCliente.dto";
import { IngredienteDTO } from "../controller/dto/cajaIngrediente.dto";
import { RefrescoDTO } from "../controller/dto/cajaRefresco.dto";
import { MedidaDTO } from "../controller/dto/cajaMedida.dto";

export default Vue.extend({
  data() {
    return {
      headersTabla: [
        {
          text: "Producto",
          align: "start",
          sortable: true,
          value: "producto",
        },
        {
          text: "Medida",
          value: "medida",
        },
        {
          text: "Precio ($)",
          align: "end",
          value: "precio",
        },
        {
          text: "Acciones",
          value: "acciones",
          align: "center",
          sortable: false,
        },
      ],
      productos: [] as {
        producto: string;
        medida: string;
        precio: number;
        ingredientes?: IngredienteDTO[];
        idRefresco?: number;
      }[],
      refrescos: [] as unknown as (RefrescoDTO & { nombreYprecio: string })[],
      dialogCliente: false as boolean,
      dialogSandwich: false as boolean,
      dialogRefrescos: false as boolean,
      dialogIngredientes: false as boolean,
      snackbar: false as boolean,
      snackbarMensaje: "" as string,
      clientes: [] as { cedula: number; nombreCompleto: string }[],
      cliente: {
        cedula: null as number | null,
        nombre: null as string | null,
        apellido: null as string | null,
      },
      cedulaCliente: null as null | number,
      ingredientes: [] as IngredienteDTO[],
      ingredientesAmostrar: [] as IngredienteDTO[],
      medidasSandwich: [] as (MedidaDTO & { nombreYprecio: string })[],
      ingredienteSeleccionado: 0 as number,
      ingredientesSeleccionados: [] as IngredienteDTO[],
      refrescosSeleccionados: [] as any[],
      refrescoSeleccionado: 0 as number,
      medidaSeleccionada: null as null | number,
      sandwichConIngredientes: {},
    };
  },
  methods: {
    crearCliente() {
      const cliente: ClienteDTO = {
        cedula: this.cliente.cedula!,
        nombre: this.cliente.nombre!,
        apellido: this.cliente.apellido!,
      };

      ControladorCaja.crearCliente(cliente).then((respuesta) => {
        this.snackbarMensaje = respuesta;
        this.snackbar = true;

        this.obtenerClientes();
      });

      this.limpiarCliente();
    },
    limpiarCliente() {
      this.dialogCliente = false;
      this.cliente.cedula = null;
      this.cliente.nombre = null;
      this.cliente.apellido = null;
    },
    agregarIngrediente() {
      this.ingredientesSeleccionados.push(
        this.ingredientes.find((ing) => ing.id == this.ingredienteSeleccionado)!
      );
      this.ingredienteSeleccionado = 0;
      const filtroIngredientes = this.ingredientesSeleccionados.map(
        (ing) => ing.id
      );
      this.ingredientesAmostrar = this.ingredientes.filter((ingrediente) => {
        return (
          !filtroIngredientes.includes(ingrediente.id) && ingrediente.id != 1
        );
      });
    },
    agregarSandwich() {
      const ingredientes = this.ingredientesSeleccionados.map((ing) => {
        return ing;
      });
      ingredientes.push(this.ingredientes.find((ing) => ing.id == 1)!);
      this.productos.push({
        producto: "Sandwich",
        medida: this.medidasSandwich.find(
          (medida) => medida.id === this.medidaSeleccionada
        )!.nombre,
        precio:
          this.medidasSandwich.find(
            (medida) => medida.id === this.medidaSeleccionada
          )!.precio +
          ingredientes.reduce((total, ing) => {
            return total + ing.precio;
          }, 0),
        ingredientes: ingredientes,
      });
      this.limpiarSandwich();
    },
    limpiarSandwich() {
      this.dialogSandwich = false;
      this.medidaSeleccionada = null;
      this.ingredienteSeleccionado = 0;
      this.ingredientesSeleccionados = [];
    },
    mostrarIngredientes() {
      this.ingredientesAmostrar = this.ingredientes.filter(
        (ing) => ing.id != 1
      );
      this.dialogSandwich = true;
    },
    limpiarRefresco() {
      this.dialogRefrescos = false;
      this.refrescoSeleccionado = 0;
    },
    agregarRefresco() {
      this.refrescosSeleccionados.push(
        this.refrescos.find(
          (refresco) => refresco.id == this.refrescoSeleccionado
        )
      );
    },
    agregarRefrescos() {
      this.refrescosSeleccionados.forEach((refresco) => {
        this.productos.push({
          producto: refresco.nombre,
          precio: refresco.precio,
          medida: `${refresco.mililitros.toString()} ml`,
          idRefresco: refresco.id,
        });
      });
      this.refrescosSeleccionados = [];
      this.limpiarRefresco();
    },
    mostrarIngredientesDeSandwich(sandwich: any) {
      this.dialogIngredientes = true;
      this.sandwichConIngredientes = sandwich;
    },
    eliminarProducto(producto: any) {
      const indiceEliminarProducto = this.productos.indexOf(producto);
      this.productos.splice(indiceEliminarProducto, 1);
    },
    enviarPedido() {
      const refrescos: number[] = this.productos
        .filter((producto) => producto.producto != "Sandwich")
        .map((producto) => producto.idRefresco) as number[];
      const productos = this.productos
        .filter((producto) => producto.producto == "Sandwich")
        .map((producto) => {
          return {
            id_medida: this.medidasSandwich.find(
              (medida) => medida.nombre == producto.medida
            )!.id as number,
            ingredientes: producto.ingredientes!.map(
              (ingrediente) => ingrediente.id
            ) as number[],
          };
        });

      const pedido: PedidoDTO = {
        refrescos: refrescos,
        productos: productos,
        cedula_cliente: this.cedulaCliente as number,
      };

      ControladorCaja.crearPedido(pedido).then((respuesta) => {
        console.log("RESPUESTA PEDIDO", respuesta);

        this.snackbarMensaje = respuesta;
        this.snackbar = true;

        this.limpiarPedido();
      });
    },

    limpiarPedido() {
      this.productos = [];
      this.cedulaCliente = null;
    },

    obtenerClientes() {
      // Obtenemos clientes
      ControladorCaja.obtenerClientes().then((respuesta) => {
        this.clientes = respuesta.map((resp) => {
          return {
            cedula: resp.cedula,
            nombreCompleto: `${resp.cedula} - ${
              resp.nombre + " " + resp.apellido
            }`,
          };
        });
      });
    },
  },

  computed: {
    totalSandwichs: function (): number {
      return this.productos
        .filter((producto) => producto.producto == "Sandwich")
        .reduce((total, sandwich) => total + sandwich.precio, 0);
    },
    totalRefrescos: function (): number {
      return this.productos
        .filter((producto) => producto.producto !== "Sandwich")
        .reduce((total, refresco) => total + refresco.precio, 0);
    },
    existenSandwichs: function (): boolean {
      return !(
        this.productos.filter((prod) => prod.producto == "Sandwich").length > 0
      );
    },
  },
  mounted() {
    //Obtenemos ingredientes
    ControladorCaja.obtenerIngredientes().then((respuesta) => {
      this.ingredientes = respuesta.map((resp) => {
        return {
          nombre: `${resp.nombre} - ${resp.precio} $`,
          id: resp.id,
          precio: resp.precio,
        };
      });
    });

    // Obtenemos medidas de sandwich
    ControladorCaja.obtenerMedidas().then((respuesta) => {
      this.medidasSandwich = respuesta.map((resp) => {
        return {
          ...resp,
          nombreYprecio: `${resp.nombre} - ${resp.precio} $`,
        };
      });
    });

    // Obtenemos refrescos
    ControladorCaja.obtenerRefrescos().then((respuesta) => {
      this.refrescos = respuesta.map((resp) => {
        return {
          ...resp,
          nombreYprecio: `${resp.nombre} - ${resp.precio} $`,
        };
      });
    });

    this.obtenerClientes();
  },
});
</script>

<style>
ul {
  list-style: none;
}

li.ingrediente::before {
  content: "🥪 ";
}

li.refresco::before {
  content: "🥤 ";
}
</style>
