const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator(value) {
                return validator.isEmail(value)
            },
            message: 'Email is invalid!!!!!!!!'
        }
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator(value) {
                return value >= 0;
            },
            message: 'is not a valid age'
        },

    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate: {
            validator(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('"Password cannot contain "password"');
                }
                return value;
            },
            message: 'The password field shouldnt include password'
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],

})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user.id},'thisismynodejs',{ expiresIn: '7 days' })

    user.tokens = user.tokens.concat({token: token})
    await user.save()
    // const data = jwt.verify(token,'thisismynodejs')
    // console.log(token);
    return token;
}


userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()


    delete userObject.password
    delete userObject.tokens

    return userObject
}
//create Middleware before login
userSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return user 
}

//create Middleware before Save
// we should use traditional function instead arrow function to use 'this' keyword
//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    console.log('just before saving!');

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User