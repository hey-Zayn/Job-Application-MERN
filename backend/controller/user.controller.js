const bcrypt = require('bcryptjs');
const User = require('../Model/user.model');
const jwt = require('jsonwebtoken');



const register = async (req, res) => {
    try {
        const { fullName, email, phone, password, role } = req.body;


        if (!fullName || !email || !phone || !password || !role) {
            return res.status(404).json({
                success: false,
                message: "Please fill all Inputs"
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Existed"
            })
        }


        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            phone,
            password: hashpassword,
            role
        });


        await newUser.save();


        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            newUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}



const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;


        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all Inputs"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Existed "
            })
        }


        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        // check role 
        if (role !== user.role) {
            return res.status(403).json({
                success: false,
                message: "Account doesn't exist with this role"
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "JWT secret is not set in environment variables"
            });
        }



        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });



        const safeUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200)
            .cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                success: true,
                message: `Welcome back ${user.fullName}`,
                user: safeUser,
                token
            })







    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phone, bio, skills } = req.body;

        const file = req.file;
        if (!fullName || !email || !phone || !bio || !skills) {
            return res.status(404).json({
                success: false,
                message: "Please fill all Inputs"
            })
        }

        // cloudinary 

        const skillsArray = skills.split(',');

        const userId = req.id;// middleware authentication 
        let user = await User.findById(userId);
        if (userId) {
            return res.status(400).json({
                success: false,
                message: "User not founded"
            })
        }


        // updating data
        user.fullName = fullName,
            user.email = email,
            user.phone = phone,
            user.profile.bio = bio,
            user.profile.skills = skillsArray,

            // resume comes later here....

            await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfuly",
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}




module.exports = { register, logout, login, updateProfile }