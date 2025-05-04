const Sensor = require('../models/Sensor');

class SensorDAO {
  constructor() {}

  async crearSensor(sensorData) {
    try {
      const sensor = new Sensor(sensorData);
      console.log("sensor a crear: ", sensor);
      return await sensor.save();
    } catch (error) {
      throw error;
    }
  }

  async obtenerSensores() {
    try {
      return await Sensor.find();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SensorDAO();