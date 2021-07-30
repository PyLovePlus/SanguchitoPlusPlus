export interface VentasDiaDTO {
    ref_venta: number;
    nombre_cliente: string;
    apellido_cliente: string;
    total: number;
    productos: {
        nombre: string;
        ingredientes: string[];
    }[];

    nombre_completo?: string;
    cantidad_sandwich?: number;
}
