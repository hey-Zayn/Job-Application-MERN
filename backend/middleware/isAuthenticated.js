const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }


        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invaild token"
            })
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Middleware Erro",
            error
        })
    }
}


module.exports = isAuthenticated