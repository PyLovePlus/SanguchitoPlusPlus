export interface VentaClienteDTO {
    nombre_cliente: string;
    apellido_cliente: string;
    nombre_completo?: string;
    precio_total: number;
    ventas: {
        fecha: string;
        ref_venta: number;
        cantidad: number;
    }[];
    cantidad_total?: number;
}
