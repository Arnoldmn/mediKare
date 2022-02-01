import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    dateOfBirth: {
        type: String,
        default: '',
        
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    apartment: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },

});

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

export default mongoose.model('User', UserSchema);
 