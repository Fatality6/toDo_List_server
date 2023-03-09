import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register user
export const register = async (req,res) => {
    try {
        const { username, password } = req.body
        const isUsed = await User.findOne({username})
        if(isUsed) {
            return res.json({
                message:'Данный username уже занят'
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({
            username,
            password: hash
        })
        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        )
        await newUser.save()
        res.json({
            token,
            newUser,
            message: 'Регистрация прошла успешно'
        })

    } catch (error) {
        res.json({message:'Ошибка при создании пользователя'})
    }
}

//Login user
export const login = async (req,res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        if(!user) {
           return res.json({message:'Проверьте данные для входа'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.json({message:'Проверьте данные для входа'})
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        )
        res.json({
            token, user, message:'Вы вошли в систему'
        })
    } catch (error) {
        res.json({message:'Ошибка авторизации'})
    }
}

//Get me
export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) {
            res.json({message:'Такого пользователя не существует'})
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        )
        res.json({
            user,
            token
        })
    } catch (error) {
        res.json({message:'Нет доступа.'})
    }
}