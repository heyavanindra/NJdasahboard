const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decoded;
   next();
}

module.exports = authMiddleware;