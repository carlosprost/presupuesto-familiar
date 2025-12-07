export interface Egreso {
    id_egreso?: number;
    fecha_egreso?: string;
    concepto: string;
    monto_egreso: number;
    tipo?: 'Necesario' | 'Extra' | 'Financiero';
}