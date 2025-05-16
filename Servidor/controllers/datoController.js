const DatoDAO = require('../dataAccess/DatoDAO');
const { AppError } = require('../utils/appError');

class DatoController {
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
}

module.exports = DatoController;
