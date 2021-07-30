export interface VentasMedidaDTO {
    nombre_medida: string;
    precio_total: number;
    ventas: {
        fecha: string;
        ref_venta: number;
        cantidad: number;
    }[];
    cantidad_total?: number;
}
