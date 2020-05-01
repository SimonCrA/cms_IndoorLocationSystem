const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs')

// let Client = mongoose.model('Client');

let rolesValidos = {
    values: ['SUPER_ROLE', 'ADMIN_ROLE', 'TECH_LEAD_ROLE', 'SALES_LEAD_ROLE', 'TECH_EMPLOYEE_ROLE', 'SALES_EMPLOYEE_ROLE'],
    message: '{VALUE}, is no a valid role'
};

let validDepartments = {
    values: ['sales', 'tech', 'maintaing', 'service'],
    message: '{VALUE}, is not a valid deparment'
};

let Schema = mongoose.Schema;


let userSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name is needed']
        },
        surname: {
            type: String,
            required: [true, 'surname is needed']
        },
        email: {
            type: String,
            required: [true, 'email is needed'],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is needed']
        },
        role: {
            type: String,
            default: 'USER_ROLE',
            enum: rolesValidos
        },
        img: {
            type: String,
            required: false
        },
        state: {
            type: Boolean,
            default: true
        },
        department: {
            type: String,
            required: false,
            enum: validDepartments
        },
        client: { type: Schema.Types.ObjectId, ref: 'Client', required: false }

}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            usuario.password = hash;
            next();
        });
    });
});

userSchema.methods.compararPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, sonIguales) => {
        if (err) {
            return callback(err);
        };
        callback(null, sonIguales);
    })
};

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

module.exports = mongoose.model('User', userSchema);