const { Pool } = require('pg');
const config = require('../config');

// Crear un pool de conexiones PostgreSQL con configuración mejorada
class Database {
    constructor() {
        this.pool = new Pool({
            connectionString: config.db.connectionString,
            max: 20,                    // Máximo 20 conexiones
            idleTimeoutMillis: 30000,   // Cerrar conexiones inactivas después de 30s
            connectionTimeoutMillis: 5000, // Timeout de conexión de 5s
            statement_timeout: 10000,   // Timeout de consultas de 10s
            query_timeout: 10000,       // Timeout de queries de 10s
        });

        // Manejar errores de pool
        this.pool.on('error', (err) => {
            console.error('Database pool error:', err);
        });

        // Inicializar la base de datos si es necesario
        this.initializeDatabase();
    }

    async waitForDatabase(maxRetries = 10, delay = 2000) {
        console.log('Waiting for database to be ready...');
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.pool.query('SELECT 1');
                console.log('Database is ready!');
                return;
            } catch (error) {
                console.log(`Database not ready, attempt ${i + 1}/${maxRetries}. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw new Error('Database is not available after maximum retries');
    }

    async initializeDatabase() {
        // Esperar a que la base de datos esté lista
        await this.waitForDatabase();
        
        try {
            console.log('Initializing database...');
            
            // Crear tabla users si no existe
            await this.query(`
                CREATE TABLE IF NOT EXISTS users (
                    name VARCHAR(100) PRIMARY KEY,
                    password VARCHAR(50) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Crear tabla products si no existe
            await this.query(`
                CREATE TABLE IF NOT EXISTS products (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    description TEXT NOT NULL,
                    price INTEGER NOT NULL,
                    image VARCHAR(500),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Crear tabla purchases si no existe
            await this.query(`
                CREATE TABLE IF NOT EXISTS purchases (
                    id SERIAL PRIMARY KEY,
                    mail VARCHAR(100) NOT NULL,
                    product_name VARCHAR(100) NOT NULL,
                    user_name VARCHAR(100) NOT NULL,
                    product_id INTEGER NOT NULL,
                    address TEXT,
                    phone VARCHAR(20),
                    ship_date DATE,
                    price INTEGER NOT NULL,
                    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Insertar datos iniciales si no existen
            await this.insertInitialData();
            
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }

    async insertInitialData() {
        try {
            // Insertar usuarios por defecto si no existen
            const userCount = await this.query('SELECT COUNT(*) FROM users');
            if (parseInt(userCount.rows[0].count) === 0) {
                await this.query(`
                    INSERT INTO users (name, password) VALUES 
                    ('admin', 'admin'),
                    ('roxs', 'roxs981'),
                    ('roberto', 'asdfpiuw981')
                `);
                console.log('Default users inserted');
            }

            // Insertar productos por defecto si no existen
            const productCount = await this.query('SELECT COUNT(*) FROM products');
            if (parseInt(productCount.rows[0].count) === 0) {
                await this.query(`
                    INSERT INTO products (name, description, price, image) VALUES 
                    ('LEGO Stormtrooper Classic', 'Figura coleccionable de Stormtrooper de Star Wars. Edición limitada con detalles auténticos.', 50, 'product_1.jpg'),
                    ('LEGO Constructor Aventurero', 'Minifigura de constructor con accesorios. Perfecto para tus proyectos creativos.', 75, 'product_2.jpg'),
                    ('LEGO Soldado Táctico', 'Figura de soldado con rifle y equipo completo. Ideal para coleccionistas.', 30, 'product_3.jpg'),
                    ('LEGO Fotógrafo Profesional', 'Minifigura con cámara y trípode. Captura los mejores momentos en miniatura.', 85, 'product_4.jpg'),
                    ('LEGO Piloto de Carreras', 'Figura de piloto con casco y traje de competición. Velocidad y estilo garantizados.', 45, 'product_5.jpg'),
                    ('LEGO Explorador Espacial', 'Astronauta con equipo espacial completo. Listo para misiones intergalácticas.', 65, 'product_6.jpg'),
                    ('LEGO Ninja Maestro', 'Guerrero ninja con armadura y armas tradicionales. Edición especial de colección.', 55, 'product_7.jpg'),
                    ('LEGO Superhéroe Urbano', 'Figura de superhéroe con capa y accesorios. Protege la ciudad de LEGO.', 95, 'product_9.jpg')
                `);
                console.log('Default products inserted');
            }
        } catch (error) {
            console.error('Error inserting initial data:', error);
        }
    }

    async query(text, params = []) {
        const start = Date.now();
        try {
            const result = await this.pool.query(text, params);
            const duration = Date.now() - start;
            console.log(`Query executed in ${duration}ms:`, text.substring(0, 50) + '...');
            return result;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }

    async getClient() {
        return await this.pool.connect();
    }

    async close() {
        await this.pool.end();
    }

    // Método para transacciones
    async transaction(callback) {
        const client = await this.getClient();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

// Crear instancia singleton
const database = new Database();

module.exports = database;