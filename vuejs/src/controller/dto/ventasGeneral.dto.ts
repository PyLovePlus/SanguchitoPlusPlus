export interface VentasGeneralDTO {
    ref_venta: number;
    nombre_cliente: string;
    apellido_cliente: string;
    fecha?: string /* YYYY-MM-DD */;
    total: number;
    productos: {
        nombre: string;
        ingredientes: string[];
    }[];

    nombre_completo?: string;
    cantidad_sandwich?: number;
}
