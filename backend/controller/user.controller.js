const bcrypt = require('bcryptjs');
const User = require('../Model/user.model');
const jwt = require('jsonwebtoken');
const upload = require('../utils/upload');



const register = async (req, res) => {
    try {
        const { fullName, email, phone, password, role } = req.body;
        
        console.log('Request file:', req.file); // Debug log
        console.log('Request body keys:', Object.keys(req.body)); // Debug log

        // Check if file exists
        let profilePhotoUrl = '';
        if (req.file) {
            try {
                const profilePhoto = await upload(req.file); // Remove .path
                profilePhotoUrl = profilePhoto.secure_url;
                console.log('Upload successful:', profilePhotoUrl);
            } catch (uploadError) {
                console.log('Upload error:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: "File upload failed"
                });
            }
        }

        if (!fullName || !email || !phone || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all inputs"
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email or phone already exists"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        // Create user - fix according to your schema
        const newUser = await User.create({
            fullName,
            email,
            phone,
            password: hashpassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl // Store in profile object
            }
        });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                profile: newUser.profile
            }
        });

    } catch (error) {
        console.log('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};



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

        // Validate required fields
        if (!fullName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const userId = req.id; // from middleware authentication
        
        // Find user - FIX: Remove the condition that always returns error
        let user = await User.findById(userId);
        if (!user) { // FIX: Check if user NOT found
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let profilePhotoUrl = user.profile?.profilePhoto;

        // Handle profile photo upload if file exists
        if (file) {
            try {
                const profilePhoto = await upload(file);
                profilePhotoUrl = profilePhoto.secure_url;
            } catch (uploadError) {
                console.log('Upload error:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: "Profile photo upload failed"
                });
            }
        }

        // Convert skills to array if provided
        const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : user.profile?.skills || [];

        // Update user data
        user.fullName = fullName;
        user.email = email;
        user.phone = phone;
        
        // Update profile fields
        user.profile = {
            ...user.profile, // Keep existing profile data
            bio: bio || user.profile?.bio || '',
            skills: skillsArray,
            profilePhoto: profilePhotoUrl // Update profile photo if uploaded
        };

        await user.save();

        // Prepare response user object
        const updatedUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};



module.exports = { register, logout, login, updateProfile }