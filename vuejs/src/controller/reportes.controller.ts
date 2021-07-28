import axios from "axios";
import { URL_BASE } from "../main";
import { VentasGeneralDTO } from "./dto/ventasGeneral.dto";
import { DATOS_REPORTE_GENERAL } from "./respuestas/reportes";

export class ControladorReportes {
    public static obtenerVentasGeneral(): Promise<VentasGeneralDTO[]> {
        return new Promise((resolve, reject) => {
            /*  axios
                .get(URL_BASE + "api/admin/ventas")
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });*/

            const respuestaDTO: VentasGeneralDTO[] = DATOS_REPORTE_GENERAL;
            for (const venta of respuestaDTO) {
                venta.nombre_completo = venta.nombre_cliente + " " + venta.apellido_cliente;
                venta.cantidad_sandwich = venta.productos.length;
            }

            setTimeout(() => {
                resolve(respuestaDTO);
            }, 2000);
        });
    }
}
