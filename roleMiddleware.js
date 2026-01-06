//This middleware is run after jwt check cuz we get role from req.user.role
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};

module.exports = roleMiddleware;
