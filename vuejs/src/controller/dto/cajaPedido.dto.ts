export interface PedidoDTO {
    cedula_cliente: number;
    productos: {
        id_medida: number,
        ingredientes: number[]
    }[],
    refrescos: number[]
}
