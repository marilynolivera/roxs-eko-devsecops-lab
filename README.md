Vulnerable Node by RoxsRoss
===============

# 🛡️ NodeVulnerable - OWASP Security Lab

Aplicación vulnerable de Node.js diseñada para pruebas de seguridad y análisis de código. Esta tienda virtual de figuras LEGO contiene vulnerabilidades intencionales del OWASP Top 10 para fines educativos.

⚠️ **ADVERTENCIA**: Esta aplicación contiene vulnerabilidades intencionales. Solo debe usarse en entornos de prueba controlados con fines educativos.

## 🚀 Inicio Rápido

### Con Docker Compose
```bash
docker-compose up -d
```

La aplicación estará disponible en:
- **Aplicación Web**: http://localhost:3000
- **Documentación API (Swagger)**: http://localhost:3000/api-docs

### Usuarios de Prueba
- **Admin**: `admin` / `admin`
- **Usuario**: `roxs` / `roxs981`

## 📚 Documentación API

Este proyecto incluye documentación completa de la API usando **Swagger/OpenAPI 3.0**.

### Acceder a la Documentación
Visita: http://localhost:3000/api-docs

La documentación incluye:
- ✅ Todos los endpoints disponibles
- ✅ Esquemas de request/response
- ✅ Ejemplos de uso
- ✅ Indicadores de vulnerabilidades en cada endpoint
- ✅ Interfaz interactiva para probar la API

### 🔌 Endpoints API REST Disponibles

#### **Sistema**
- `GET /api/health` - Health check del servidor

#### **Autenticación**
- `POST /api/auth/login` - Iniciar sesión (JSON)
  ```json
  {
    "username": "admin",
    "password": "admin"
  }
  ```
- `POST /api/auth/logout` - Cerrar sesión

#### **Productos**
- `GET /api/products` - Listar todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `GET /api/search?q=LEGO` - Buscar productos

#### **Compras** (requiere autenticación)
- `POST /api/purchases` - Crear una compra
  ```json
  {
    "mail": "usuario@example.com",
    "product_name": "LEGO Stormtrooper Classic",
    "product_id": 1,
    "address": "Av. Corrientes 1234, Buenos Aires",
    "phone": "+54 11 1234 5678",
    "ship_date": "2025-10-20",
    "price": "$50"
  }
  ```
- `GET /api/purchases` - Obtener compras del usuario actual

### 📝 Ejemplos de Uso con cURL

```bash
# Health Check
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'

# Listar productos
curl http://localhost:3000/api/products

# Buscar productos
curl "http://localhost:3000/api/search?q=LEGO"

# Obtener producto específico
curl http://localhost:3000/api/products/1
```

## 🐛 Vulnerabilidades Incluidas

Este proyecto implementa las vulnerabilidades más comunes del [OWASP Top 10 2021](https://owasp.org/API-Security/editions/2023/en/0x11-t10/):

- **A01:2021** - Broken Access Control 
- **A02:2021** - Cryptographic Failures 
- **A03:2021** - Injection (SQL Injection)
- **A04:2021** - Insecure Design 
- **A05:2021** - Security Misconfiguration 
- **A06:2021** - Vulnerable and Outdated Components 
- **A07:2021** - Identification and Authentication Failures 
- **A08:2021** - Software and Data Integrity Failures
- **A09:2021** - Security Logging and Monitoring Failures 
- **A10:2021** - Server-Side Request Forgery 

## 🎨 Características

- ✨ Interfaz moderna con gradientes y animaciones
- 🛒 Sistema de compras con carrito
- 🔍 Búsqueda de productos
- 📦 Catálogo de productos LEGO
- 🛍️ Historial de compras
- 📚 Documentación API con Swagger
- 🐳 Soporte Docker y Kubernetes

## 🛠️ Tecnologías

- **Backend**: Node.js + Express
- **Base de Datos**: PostgreSQL
- **Template Engine**: EJS
- **Documentación**: Swagger UI + OpenAPI 3.0
- **Containerización**: Docker + Docker Compose

## 📖 Uso Educativo

Este laboratorio es ideal para:
- 🎓 Aprender sobre vulnerabilidades web
- 🔒 Practicar técnicas de pentesting
- 🛡️ Entrenar herramientas de análisis de seguridad
- 📊 Demostrar vulnerabilidades del OWASP Top 10
- 🧪 Probar escáneres de seguridad (SAST/DAST)

## 🔗 Enlaces Útiles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security](https://owasp.org/API-Security/)
- [Swagger/OpenAPI](https://swagger.io/specification/)

## 👨‍💻 Autor

**RoxsRoss**

Basado en el proyecto original [vulnerable-node](https://github.com/cr0hn/vulnerable-node) por cr0hn.

## 🙏 Agradecimientos

- [cr0hn](https://github.com/cr0hn) - Por el proyecto original vulnerable-node
- Comunidad OWASP - Por las guías de seguridad
- Ekoparty Security Conference

## 📄 Licencia

MIT License
