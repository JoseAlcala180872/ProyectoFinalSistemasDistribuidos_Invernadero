const Dato = require('../models/dato');

class DatoDAO {

  constructor() { }

  async crearDato(datoData) {
    try {
      const dato = new Dato(datoData);
      return await dato.save();
    } catch (error) {
      throw error;
    }
  }

  async obtenerDatos() {
    try {
      return await Dato.find().limit(20);
    } catch (error) {
      throw error;
    }
  }

  async obtenerDatosAgrupados() {
    try {
      return await Dato.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$fechaHora" } }
            },
            promedioHumedad: { $avg: "$humedad" },
            promedioTemperatura: { $avg: "$temperatura" },
            datosPorFecha: { $push: "$$ROOT" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
    } catch (error) {
      throw error;
    }
  }

  async obtenerUltimasFechas() {
    try {
      return await Dato.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$fechaHora" } },
            promedioHumedad: { $avg: "$humedad" },
            promedioTemperatura: { $avg: "$temperatura" }
          }
        },
        { $sort: { _id: -1 } },
        { $limit: 10 } //aqui si quieres mas le puedes mover a las fechas
      ]);
    } catch (error) {
      throw error;
    }
  }

  async obtenerDatosPorLapso(fechaInicio, fechaFin) {
    try {
      return await Dato.aggregate([
        {
          $match: {
            fechaHora: {
              $gte: new Date(fechaInicio),
              $lte: new Date(fechaFin)
            }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$fechaHora" } },
            promedioHumedad: { $avg: "$humedad" },
            promedioTemperatura: { $avg: "$temperatura" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
    } catch (error) {
      throw error;
    }
  }

  async obtenerPromedioUltimaHora() {
    try {
      return await Dato.aggregate([
        { $sort: { fechaHora: -1 } },  // 🔹 Ordenar por fecha descendente (más reciente primero)
        { $limit: 1 },  // 🔹 Obtener solo la última hora registrada
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d %H:00", date: "$fechaHora" } },
            promedioHumedad: { $avg: "$humedad" },
            promedioTemperatura: { $avg: "$temperatura" },
            datosPorHora: { $push: "$$ROOT" }
          }
        }
      ]);
    } catch (error) {
      throw error;
    }
  }

  async obtenerDatosPaginados(pagina = 1, limite = 20) {
    try {
      const salto = (pagina - 1) * limite;
      return await Dato.find().skip(salto).limit(limite).sort({ fechaHora: -1 });
    } catch (error) {
      throw error;
    }
  }

  async obtenerDatosFiltrados(minTemp, maxTemp, minHum, maxHum) {
    try {
      return await Dato.find({
        temperatura: { $gte: minTemp, $lte: maxTemp },
        humedad: { $gte: minHum, $lte: maxHum }
      }).sort({ fechaHora: -1 });
    } catch (error) {
      throw error;
    }
  }

  async obtenerDatosPorHora() {
    try {
      // Agrupa por hora del día actual
      return await Dato.aggregate([
        {
          $match: {
            fechaHora: {
              $gte: new Date(new Date().setHours(0,0,0,0)),
              $lte: new Date()
            }
          }
        },
        {
          $group: {
            _id: { $hour: "$fechaHora" },
            promedioTemperatura: { $avg: "$temperatura" },
            promedioHumedad: { $avg: "$humedad" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
    } catch (error) {
      throw error;
    }
  }
  /*
   async obtenerProductoPorId(id) {
     try {
       return await Producto.findById(id);
     } catch (error) {
       throw error;
     }
   }
 
   async actualizarProducto(id, productoData) {
     try {
       return await Producto.findByIdAndUpdate(id, productoData, { new: true });
     } catch (error) {
       throw error;
     }
   }
 
   async eliminarProducto(id) {
     try {
       return await Producto.findByIdAndRemove(id);
     } catch (error) {
       throw error;
     }
   }
 
   async obtenerProductos(limit = 10) {
     try {
       return await Producto.find().limit(limit);
     } catch (error) {
       throw error;
     }
   }
 */
}

module.exports = new DatoDAO();