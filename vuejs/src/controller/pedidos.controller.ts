import axios from "axios";
import { URL_BASE } from "../main";
import { PedidoDTO } from "./dto/cajaPedido.dto";

export class ControladorCaja {
    //crear pedido
    public static crearPedido(pedido: PedidoDTO): Promise<string> {
        console.log(pedido)
        return new Promise((resolve, reject) => {
            /*  axios
                .get(URL_BASE + "api/admin/ventas")
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });*/

            // const respuestaDTO: VentasGeneralDTO[] = DATOS_REPORTE_GENERAL;
            // for (const venta of respuestaDTO) {
            //     venta.nombre_completo = venta.nombre_cliente + " " + venta.apellido_cliente;
            //     venta.cantidad_sandwich = venta.productos.length;
            // }

            // resolve(respuestaDTO);
            resolve("Pedido Creado Con Exito")
        });
    }
}