const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un correo válido']
    },
    clave: {
        type: String,
        required: [true, 'La clave es obligatoria'],
        minlength: [6, 'La clave debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
});

// Método para comparar claves
UsuarioSchema.methods.compararClave = async function(clave) {
    return await bcrypt.compare(clave, this.clave);
};

// Middleware para hashear la clave antes de guardar
UsuarioSchema.pre('save', async function(next) {
    // Solo hashear la clave si ha sido modificada o es nueva
    if (!this.isModified('clave')) return next();
    
    try {
        // Generar salt y hashear la clave
        const salt = await bcrypt.genSalt(10);
        this.clave = await bcrypt.hash(this.clave, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para no devolver la clave en las consultas
UsuarioSchema.methods.toJSON = function() {
    const usuarioObject = this.toObject();
    delete usuarioObject.clave;
    return usuarioObject;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);