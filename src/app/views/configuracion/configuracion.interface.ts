export interface Configuracion {
    id?: number;
    tipo_empleo: 'Dependencia' | 'Autonomo' | 'Desempleado';
    cobra_desempleo: number; // 0 or 1 (boolean stored as int)
    meses_aguinaldo: string; // "6,12"
}
