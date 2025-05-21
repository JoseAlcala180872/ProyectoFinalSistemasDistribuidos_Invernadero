const DatoDAO = require('../dataAccess/DatoDAO');
const { AppError } = require('../utils/appError');

class datoController {
    static async crearDato(req, res, next) {
        try {
            const { humedad, temperatura, fechaHora} = req.body;
            if (!humedad || !temperatura || !fechaHora) {
                return next(new AppError('Los campos humedad, temperatura y fechaHora son requeridos.', 500));
            }
            const datoData = { humedad, temperatura, fechaHora };
            const dato = await DatoDAO.crearDato(datoData);
            res.status(201).json(dato);
        } catch (error) {
            next(new AppError('Error al crear dato.', 500));
        }
    }
    static async obtenerDatos(req, res, next) {
        try {
            const datos = await DatoDAO.obtenerDatos();

            if (!datos || datos.length === 0) {
                return next(new AppError('No se encontraron datos.', 404));
            }

            res.status(200).json(datos);
        } catch (error) {
            next(new AppError('Error al obtener los datos.', 500));
        }
    }
    static async obtenerDatosAgrupados(req, res, next) {
        try {
            const datos = await DatoDAO.obtenerDatosAgrupados();

            if (!datos || datos.length === 0) {
                return next(new AppError('No se encontraron datos agrupados.', 404));
            }

            res.status(200).json(datos);
        } catch (error) {
            next(new AppError('Error al obtener los datos agrupados.', 500));
        }
    }

    static async obtenerUltimasFechas(req, res, next) {
        try {
            const datos = await DatoDAO.obtenerUltimasFechas();

            if (!datos || datos.length === 0) {
                return next(new AppError('No hay datos en las últimas fechas.', 404));
            }

            res.status(200).json(datos);
        } catch (error) {
            next(new AppError('Error al obtener las últimas fechas.', 500));
        }
    }

    static async obtenerDatosPorLapso(req, res, next) {
        try {
            const { inicio, fin } = req.query;
            console.log(inicio + 'inicio y fin');
            if (!inicio || !fin) {
                return next(new AppError('Debes proporcionar las fechas inicio y fin.', 400));
            }

            const datos = await DatoDAO.obtenerDatosPorLapso(inicio, fin);

            if (!datos || datos.length === 0) {
                return next(new AppError(`No se encontraron datos entre ${inicio} y ${fin}.`, 404));
            }

            res.status(200).json(datos);
        } catch (error) {
            next(new AppError('Error al obtener datos por lapso.', 500));
        }
    }

    static async obtenerPromedioUltimaHora(req, res, next) {
        try {
            const datos = await DatoDAO.obtenerPromedioUltimaHora();

            if (!datos || datos.length === 0) {
                return next(new AppError('No se encontraron datos para la última hora.', 404));
            }

            res.status(200).json(datos);
        } catch (error) {
            next(new AppError('Error al obtener el promedio de la última hora.', 500));
        }
    }

    static async obtenerDatosPaginados(req, res, next) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 20;

            const datos = await DatoDAO.obtenerDatosPaginados(pagina, limite);

            if (!datos || datos.length === 0) {
                return next(new AppError('No se encontraron datos en la paginación.', 404));
            }

            res.status(200).json({ pagina, limite, datos });
        } catch (error) {
            next(new AppError('Error al obtener datos paginados.', 500));
        }
    }
    
    static async obtenerDatosFiltrados(req, res, next) {
        try {
            const minTemp = parseFloat(req.query.minTemp) || 0;
            const maxTemp = parseFloat(req.query.maxTemp) || 100;
            const minHum = parseFloat(req.query.minHum) || 0;
            const maxHum = parseFloat(req.query.maxHum) || 100;

            const datos = await DatoDAO.obtenerDatosFiltrados(minTemp, maxTemp, minHum, maxHum);

            if (!datos || datos.length === 0) {
                return next(new AppError('No se encontraron datos con esos filtros.', 404));
            }

            res.status(200).json({ minTemp, maxTemp, minHum, maxHum, datos });
        } catch (error) {
            next(new AppError('Error al obtener datos filtrados.', 500));
        }
    }

    static async obtenerDatosPorHora(req, res, next) {
        try {
            const datos = await DatoDAO.obtenerDatosPorHora();
            res.status(200).json(datos);
        } catch (error) {
            next(new AppError('Error al obtener datos por hora.', 500));
        }
    }
}

module.exports = datoController;
