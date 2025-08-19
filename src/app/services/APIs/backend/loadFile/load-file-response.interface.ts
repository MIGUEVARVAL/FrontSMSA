export interface LoadFileSuccessResponse {
    exitoso: boolean;
    errores: LoadFileError[];
    mensajeExito: string;
};

export interface LoadFileErrorResponse {
    error: {
        exitoso: boolean;
        errores: LoadFileError[];
    };
};

export interface LoadFileError {
    codigo_error: string;
    tipo_error: string;
    detalle: string;
};