const database = require('./database');

async function list_products() {
    console.log('list_products called');
    
    try {
        const result = await database.query('SELECT * FROM products ORDER BY id');
        console.log(`Found ${result.rows.length} products`);
        return result.rows;
    } catch (error) {
        console.error('Error listing products:', error);
        throw error;
    }
}

async function getProduct(product_id) {
    console.log('getProduct called with id:', product_id);
    
    try {
        const result = await database.query('SELECT * FROM products WHERE id = $1', [product_id]);
        
        if (result.rows.length > 0) {
            console.log('Product found:', result.rows[0].name);
            return result.rows[0];
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error getting product:', error);
        throw error;
    }
}

async function search(query) {
    console.log('search called with query:', query);
    
    try {
        const result = await database.query(
            'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id',
            [`%${query}%`]
        );
        
        console.log(`Search found ${result.rows.length} products`);
        return result.rows;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

async function purchase(cart) {
    console.log('purchase called with cart:', cart);
    
    try {
        const result = await database.query(
            `INSERT INTO purchases (mail, product_name, user_name, product_id, address, phone, ship_date, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [cart.mail, cart.product_name, cart.username, cart.product_id, 
             cart.address, cart.phone, cart.ship_date, cart.price]
        );
        
        console.log('Purchase saved successfully:', result.rows[0].id);
        return result.rows[0];
    } catch (error) {
        console.error('Error saving purchase:', error);
        throw error;
    }
}

async function get_purcharsed(username) {
    console.log('get_purcharsed called with username:', username);
    
    try {
        const result = await database.query(
            'SELECT * FROM purchases WHERE user_name = $1 ORDER BY purchase_date DESC',
            [username]
        );
        
        console.log(`Found ${result.rows.length} purchases for user ${username}`);
        return result.rows;
    } catch (error) {
        console.error('Error getting purchases:', error);
        throw error;
    }
}

var actions = {
    "list": list_products,
    "getProduct": getProduct,
    "search": search,
    "purchase": purchase,
    "getPurchased": get_purcharsed
}

module.exports = actions;
