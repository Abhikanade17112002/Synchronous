const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hash password asynchronously
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Compare password asynchronously
async function comparePassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

// Generate token asynchronously
async function generateToken(payload, secretKey) {
  const token = await new Promise((resolve, reject) => {

    jwt.sign({payload}, secretKey, { expiresIn: "5h" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
  return token;
}

// Verify token asynchronously
async function verifyToken(token, secretKey) {
  const verified = await new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
  return verified;
}


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
}
