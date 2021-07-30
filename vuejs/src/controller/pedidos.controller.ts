import axios from "axios";
import { URL_BASE } from "../main";
import { ClienteDTO } from "./dto/cajaCliente.dto";
import { PedidoDTO } from "./dto/cajaPedido.dto";
import { IngredienteDTO } from "./dto/cajaIngrediente.dto";
import { MedidaDTO } from "./dto/cajaMedida.dto";
import { RefrescoDTO } from "./dto/cajaRefresco.dto";

export class ControladorCaja {
    //crear pedido
    public static crearPedido(pedido: PedidoDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            axios
                .post(URL_BASE + "api/pedidos", pedido)
                .then((respuesta) => {
                    resolve("Pedido creado con exito");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static crearCliente(cliente: ClienteDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            axios
                .post(URL_BASE + "api/clientes", cliente)
                .then((respuesta) => {
                    resolve("Cliente Creado con Exito");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static obtenerIngredientes(): Promise<IngredienteDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/ingredientes/")
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static obtenerMedidas(): Promise<MedidaDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/medidas")
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static obtenerRefrescos(): Promise<RefrescoDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/refrescos/")
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static obtenerClientes(): Promise<ClienteDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/clientes")
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
