const database = require('./model/database');

async function do_auth(username, password) {
    console.log('Auth called with:', username, password);
    
    try {
        // Consultar la base de datos real
        const result = await database.query(
            'SELECT * FROM users WHERE name = $1 AND password = $2',
            [username, password]
        );
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log('Auth success: user found in database');
            return { name: user.name, password: user.password };
        } else {
            console.log('Auth error: invalid credentials');
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        console.error('Auth database error:', error);
        throw new Error('Authentication failed');
    }
}

module.exports = {
    check: do_auth,
    do_auth: do_auth
};