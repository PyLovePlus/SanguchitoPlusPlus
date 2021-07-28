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
