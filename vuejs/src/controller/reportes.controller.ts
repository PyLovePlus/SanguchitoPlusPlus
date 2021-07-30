import axios from "axios";
import { URL_BASE } from "../main";
import { VentasGeneralDTO } from "./dto/ventasGeneral.dto";
import { VentasDiaDTO } from "./dto/ventasDia.dto";
import {
    DATOS_REPORTE_CLIENTES,
    DATOS_REPORTE_GENERAL,
    DATOS_REPORTE_INGREDIENTE,
    DATOS_REPORTE_MEDIDA,
} from "./respuestas/reportes";
import { VentasMedidaDTO } from "./dto/ventaMedida.dto";
import { VentasIngredienteDTO } from "./dto/ventaIngrediente.dto";
import { VentaClienteDTO } from "./dto/ventaCliente.dto";

export class ControladorReportes {
    //Reporte 1
    public static obtenerVentasGeneral(): Promise<VentasGeneralDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/admin/ventas")
                .then((respuesta) => {
                    //resolve(respuesta.data);

                    const respuestaDTO: VentasGeneralDTO[] = respuesta.data;
                    for (const venta of respuestaDTO) {
                        venta.nombre_completo = venta.nombre_cliente + " " + venta.apellido_cliente;
                        venta.cantidad_sandwich = venta.productos.length;
                    }

                    resolve(respuestaDTO);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    //Reporte 2
    public static obtenerVentasSegunDia(fecha: string): Promise<VentasDiaDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/admin/ventas?dia=" + fecha)
                .then((respuesta) => {
                    //resolve(respuesta.data);

                    const respuestaDTO: VentasDiaDTO[] = respuesta.data;
                    for (const venta of respuestaDTO) {
                        venta.nombre_completo = venta.nombre_cliente + " " + venta.apellido_cliente;
                        venta.cantidad_sandwich = venta.productos.length;
                    }

                    resolve(respuestaDTO);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    //Reporte 3
    public static obtenerVentasPorMedida(): Promise<VentasMedidaDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/admin/ventas/medidas")
                .then((respuesta) => {
                    //resolve(respuesta.data);

                    const respuestaDTO: VentasMedidaDTO[] = respuesta.data;
                    for (const ventaMedida of respuestaDTO) {
                        let aux_total = 0;
                        for (const venta of ventaMedida.ventas) {
                            aux_total += venta.cantidad;
                        }
                        ventaMedida.cantidad_total = aux_total;
                    }

                    resolve(respuestaDTO);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    //Reporte 4
    public static obtenerVentasPorIngredientes(): Promise<VentasIngredienteDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/admin/ventas/ingredientes")
                .then((respuesta) => {
                    // resolve(respuesta.data);

                    const respuestaDTO: VentasIngredienteDTO[] = respuesta.data;
                    for (const ventaIngrediente of respuestaDTO) {
                        let aux_total = 0;
                        for (const venta of ventaIngrediente.ventas) {
                            aux_total += venta.cantidad;
                        }
                        ventaIngrediente.cantidad_total = aux_total;
                    }

                    resolve(respuestaDTO);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    //Reporte 5
    public static obtenerVentasPorClientes(): Promise<VentaClienteDTO[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(URL_BASE + "api/admin/ventas/clientes")
                .then((respuesta) => {
                    //resolve(respuesta.data);

                    const respuestaDTO: VentaClienteDTO[] = respuesta.data;
                    for (const ventaCliente of respuestaDTO) {
                        let aux_total = 0;
                        for (const venta of ventaCliente.ventas) {
                            aux_total += venta.cantidad;
                        }
                        ventaCliente.cantidad_total = aux_total;
                        ventaCliente.nombre_completo =
                            ventaCliente.nombre_cliente + " " + ventaCliente.apellido_cliente;
                        ventaCliente.cantidad_compras = ventaCliente.ventas.length;
                    }

                    resolve(respuestaDTO);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
