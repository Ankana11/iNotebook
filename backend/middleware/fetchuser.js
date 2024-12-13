var jwt = require('jsonwebtoken');
const JWT_SECRET = '$diya@@das';

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Attach user info to request
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
