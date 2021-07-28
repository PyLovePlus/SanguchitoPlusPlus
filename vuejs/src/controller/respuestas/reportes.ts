import { VentasMedidaDTO } from "../dto/ventaMedida.dto";
import { VentasGeneralDTO } from "../dto/ventasGeneral.dto";

export const DATOS_REPORTE_GENERAL: VentasGeneralDTO[] = [
    {
        ref_venta: 1,
        nombre_cliente: "Ricardo",
        apellido_cliente: "Salvatorelli",
        fecha: "2021-07-28",
        total: 27.0,
        productos: [
            {
                nombre: "Sandwich Doble",
                ingredientes: ["Jamon", "Queso"],
            },
        ],
    },

    {
        ref_venta: 2,
        nombre_cliente: "Ricardo",
        apellido_cliente: "Salvatorelli",
        fecha: "2021-07-28",
        total: 58.0,
        productos: [
            {
                nombre: "Sandwich Doble",
                ingredientes: ["Jamon", "Queso"],
            },
            {
                nombre: "Sandwich Triple",
                ingredientes: ["Queso"],
            },
        ],
    },

    {
        ref_venta: 3,
        nombre_cliente: "Victoria",
        apellido_cliente: "Paciello",
        fecha: "2021-07-28",
        total: 10.0,
        productos: [
            {
                nombre: "Sandwich Individual",
                ingredientes: ["Queso"],
            },
        ],
    },
];

export const DATOS_REPORTE_MEDIDA: VentasMedidaDTO[] = [
    {
        nombre_medida: "Triple",
        precio_total: 569.6,
        ventas: [
            {
                fecha: "2021-07-28",
                ref_venta: 1,
                cantidad: 5,
            },
            {
                fecha: "2021-07-28",
                ref_venta: 2,
                cantidad: 1,
            },
            {
                fecha: "2021-07-28",
                ref_venta: 3,
                cantidad: 2,
            },
        ],
    },
    {
        nombre_medida: "Doble",
        precio_total: 100,
        ventas: [
            {
                fecha: "2021-07-28",
                ref_venta: 6,
                cantidad: 5,
            },
            {
                fecha: "2021-07-28",
                ref_venta: 7,
                cantidad: 1,
            },
            {
                fecha: "2021-07-28",
                ref_venta: 8,
                cantidad: 26,
            },
        ],
    },
    {
        nombre_medida: "Individual",
        precio_total: 10,
        ventas: [
            {
                fecha: "2021-07-28",
                ref_venta: 10,
                cantidad: 5,
            },
            {
                fecha: "2021-07-28",
                ref_venta: 12,
                cantidad: 1,
            },
            {
                fecha: "2021-07-28",
                ref_venta: 13,
                cantidad: 1,
            },
        ],
    },
];
