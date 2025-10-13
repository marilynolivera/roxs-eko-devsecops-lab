var express = require('express');
var router = express.Router();
var url = require('url');

var db_products = require('../model/products');
var auth = require('../auth');

// Middleware para verificar autenticación en API
function checkApiAuth(req, res, next) {
    if (!req.session || !req.session.user_name) {
        return res.status(401).json({ 
            error: 'Unauthorized',
            message: 'Debe iniciar sesión para acceder a este recurso'
        });
    }
    next();
}

/**
 * GET /api/products
 * Lista todos los productos
 */
router.get('/api/products', function(req, res, next) {
    db_products.list()
        .then(function (data) {
            res.json({
                success: true,
                count: data.length,
                products: data
            });
        })
        .catch(function (err) {
            console.error('Error listing products:', err);
            res.status(500).json({
                success: false,
                error: 'Error al obtener productos',
                message: err.message
            });
        });
});

/**
 * GET /api/products/:id
 * Obtiene un producto por ID
 */
router.get('/api/products/:id', function(req, res, next) {
    var product_id = req.params.id;

    db_products.getProduct(product_id)
        .then(function (data) {
            res.json({
                success: true,
                product: data
            });
        })
        .catch(function (err) {
            console.error('Error getting product:', err);
            res.status(404).json({
                success: false,
                error: 'Producto no encontrado',
                message: err.message
            });
        });
});

/**
 * GET /api/products/search
 * Busca productos por término
 */
router.get('/api/search', function(req, res, next) {
    var query = req.query.q || '';

    if (!query) {
        return res.status(400).json({
            success: false,
            error: 'Parámetro de búsqueda requerido',
            message: 'Debe proporcionar el parámetro "q" con el término de búsqueda'
        });
    }

    db_products.search(query)
        .then(function (data) {
            res.json({
                success: true,
                query: query,
                count: data.length,
                products: data
            });
        })
        .catch(function (err) {
            console.error('Error searching products:', err);
            res.status(500).json({
                success: false,
                error: 'Error en la búsqueda',
                message: err.message
            });
        });
});

/**
 * POST /api/auth/login
 * Autenticación de usuario
 */
router.post('/api/auth/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: 'Credenciales incompletas',
            message: 'Debe proporcionar username y password'
        });
    }

    auth.check(username, password)
        .then(function (result) {
            if (result) {
                req.session.user_name = username;
                res.json({
                    success: true,
                    message: 'Autenticación exitosa',
                    user: username
                });
            } else {
                res.status(401).json({
                    success: false,
                    error: 'Credenciales inválidas',
                    message: 'Usuario o contraseña incorrectos'
                });
            }
        })
        .catch(function (err) {
            console.error('Error in authentication:', err);
            res.status(500).json({
                success: false,
                error: 'Error en autenticación',
                message: err.message
            });
        });
});

/**
 * POST /api/auth/logout
 * Cerrar sesión
 */
router.post('/api/auth/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Error al cerrar sesión',
                message: err.message
            });
        }
        res.json({
            success: true,
            message: 'Sesión cerrada exitosamente'
        });
    });
});

/**
 * POST /api/purchases
 * Crear una nueva compra
 */
router.post('/api/purchases', checkApiAuth, function(req, res, next) {
    var params = req.body;

    try {
        if (!params.price) {
            throw new Error("Missing parameter 'price'");
        }

        var cart = {
            mail: params.mail,
            address: params.address,
            ship_date: params.ship_date,
            phone: params.phone,
            product_id: params.product_id,
            product_name: params.product_name,
            username: req.session.user_name,
            price: params.price.toString().replace(/[$€]/g, '').trim()
        };

        // Validar email
        var re = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;
        if (!re.test(cart.mail)) {
            throw new Error("Invalid mail format");
        }

        // Validar que todos los campos estén presentes
        for (var prop in cart) {
            if (cart[prop] == undefined || cart[prop] === '') {
                throw new Error("Missing parameter '" + prop + "'");
            }
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: 'Datos inválidos',
            message: err.message
        });
    }

    db_products.purchase(cart)
        .then(function (result) {
            res.json({
                success: true,
                message: '¡Compra realizada con éxito!',
                purchase: result
            });
        })
        .catch(function (err) {
            console.error('Purchase error:', err);
            res.status(500).json({
                success: false,
                error: 'Error al procesar la compra',
                message: err.message
            });
        });
});

/**
 * GET /api/purchases
 * Obtener compras del usuario actual
 */
router.get('/api/purchases', checkApiAuth, function(req, res, next) {
    db_products.getPurchased(req.session.user_name)
        .then(function (data) {
            res.json({
                success: true,
                count: data.length,
                purchases: data
            });
        })
        .catch(function (err) {
            console.error('Error getting purchases:', err);
            res.status(500).json({
                success: false,
                error: 'Error al obtener compras',
                message: err.message
            });
        });
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/api/health', function(req, res) {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.1'
    });
});

module.exports = router;
