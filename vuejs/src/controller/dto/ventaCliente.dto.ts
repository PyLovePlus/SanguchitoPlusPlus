export interface VentaClienteDTO {
    nombre_cliente: string;
    apellido_cliente: string;
    nombre_completo?: string;
    precio_total: number;
    ventas: {
        fecha: string;
        ref_venta: number;
        cantidad_productos: number;
    }[];
    cantidad_total?: number;
    cantidad_compras?: number;
}
