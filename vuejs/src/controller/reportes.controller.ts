import axios from "axios";
import { URL_BASE } from "../main";
import { VentasGeneralDTO } from "./dto/ventasGeneral.dto";
import { VentasDiaDTO } from "./dto/ventasDia.dto";
import { DATOS_REPORTE_GENERAL, DATOS_REPORTE_MEDIDA } from "./respuestas/reportes";
import { VentasMedidaDTO } from "./dto/ventaMedida.dto";

export class ControladorReportes {
    //Reporte 1
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

            resolve(respuestaDTO);
        });
    }

    //Reporte 2
    public static obtenerVentasSegunDia(fecha: string): Promise<VentasDiaDTO[]> {
        return new Promise((resolve, reject) => {
            /*axios
                .get(URL_BASE + "api/admin/ventas?dia=" + fecha)
                .then((respuesta) => {
                    resolve(respuesta.data);
                })
                .catch((err) => {
                    reject(err);
                });*/
            const respuestaDTO: VentasDiaDTO[] = DATOS_REPORTE_GENERAL;
            for (const venta of respuestaDTO) {
                venta.nombre_completo = venta.nombre_cliente + " " + venta.apellido_cliente;
                venta.cantidad_sandwich = venta.productos.length;
            }

            resolve(respuestaDTO);
        });
    }

    //Reporte 3
    public static obtenerVentasPorMedida(): Promise<VentasMedidaDTO[]> {
        return new Promise((resolve, reject) => {
            /*axios
            .get(URL_BASE + "api/admin/ventas/medidas")
            .then((respuesta) => {
                resolve(respuesta.data);
            })
            .catch((err) => {
                reject(err);
            });*/

            const respuestaDTO: VentasMedidaDTO[] = DATOS_REPORTE_MEDIDA;
            for (const ventaMedida of respuestaDTO) {
                let aux_total = 0;
                for (const venta of ventaMedida.ventas) {
                    aux_total += venta.cantidad;
                }
                ventaMedida.cantidad_total = aux_total;
            }

            resolve(respuestaDTO);
        });
    }
}
