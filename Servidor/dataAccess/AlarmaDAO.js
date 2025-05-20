const Alarma = require('../models/Alarma');

class AlarmaDAO {
    static async crearAlarma(alarmaData) {
        return await new Alarma(alarmaData).save();
    }

    static async obtenerAlarmasActivas() {
        return await Alarma.find({ estado: true });
    }

    static async obtenerTodasLasAlarmas() { 
        return await Alarma.find();
    }

    static async obtenerAlarmaPorId(id) {
        return await Alarma.findById(id);
    }

    static async activarAlarma(id) {
        return await Alarma.findByIdAndUpdate(id, { estado: true }, { new: true });
    }

    static async desactivarAlarma(id) {
        return await Alarma.findByIdAndUpdate(id, { estado: false }, { new: true });
    }

    static async eliminarAlarma(id) {
        return await Alarma.findByIdAndDelete(id);
    }
}

module.exports = AlarmaDAO;