const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: [2, 'Username must be at least 2 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
            },
            message() {
                return 'You must enter a valid email address'
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password must be at least 6 characters long']
    }
}, {
    methods: {
        async validatePass(formPassword) {
            const is_valid = await compare(formPassword, this.password);

            return is_valid;
        }
    }
});

userSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.password = await hash(this.password, 10);
    }

    next();
});

userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.password;

    return user;
}

const User = model('User', userSchema);

module.exports = User;