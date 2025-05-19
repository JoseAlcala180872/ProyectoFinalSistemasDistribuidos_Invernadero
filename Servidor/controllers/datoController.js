const { AppError } = require('../utils/appError');
const DatoDAO = require('../dataAccess/DatoDAO');

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
}

module.exports = datoController;