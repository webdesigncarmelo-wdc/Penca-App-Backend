import 'dotenv/config';
import jwt from 'jsonwebtoken';

export function genToken(email) {
    return jwt.sign({ email }, process.env.JWT_PW, { expiresIn: '1h' });
}

export function verifyToken(req, res, next) {
    next
    // simplifica el jwt para poder compararlo
    const token = req.header("Authorization")?.replace('Bearer ', '')

    // verify si hay token
    if (!token) {
        return res.status(401).json({error: "token required"})
    }

    try {
        const data = jwt.verify(token, process.env.JWT_PW)
        // esto agrega al email como parte del req.params
        //para usarlo en el UserModel posterior (muy interesante)
        req.emailOn = data.email
        next()
    } catch(e) {
        return res.status(401).json({error: "the token is not OK"})
    }
}

// modificado con un next para que no funcione jeje