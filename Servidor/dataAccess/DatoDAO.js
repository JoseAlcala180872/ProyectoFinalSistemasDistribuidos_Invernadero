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