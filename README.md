# 📝 Simply Simple Notes - DevSecOps Lab

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.2.5-green?style=for-the-badge&logo=flask)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Una aplicación de notas vulnerable diseñada para prácticas de DevSecOps**

*Time to Demo. by RoxsRoss - EkoParty 2024* 🚀

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [Docker](#-docker) • [Seguridad](#-seguridad)

</div>

---

## 📖 Descripción

**Simply Simple Notes** es una aplicación web moderna de gestión de notas construida con Flask, diseñada específicamente como laboratorio de práctica para DevSecOps. La aplicación incluye vulnerabilidades intencionales para fines educativos y demuestra las mejores prácticas de desarrollo moderno con una interfaz de usuario excepcional.

### 🎯 Propósito

- **Educación en Seguridad**: Identificar y explotar vulnerabilidades comunes
- **Prácticas DevSecOps**: Integración de herramientas de seguridad en CI/CD
- **Desarrollo Moderno**: Demostración de UX/UI de nivel profesional
- **Containerización**: Implementación con Docker y Docker Compose

---

## ✨ Características

### 🎨 Interfaz de Usuario

- **Modo Oscuro/Claro**: Toggle animado con persistencia en localStorage
- **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **Animaciones Suaves**: Transiciones y efectos visuales profesionales
- **Tema Personalizable**: Variables CSS para fácil customización

### 📋 Funcionalidades de Notas

- ✅ **Crear, Editar y Eliminar** notas
- ⭐ **Sistema de Favoritos** con persistencia local
- 🔍 **Búsqueda en Tiempo Real** con filtrado instantáneo
- ✏️ **Edición Inline** con atajos de teclado
- 📊 **Estadísticas** (total de notas, favoritas, palabras)
- 📥 **Exportar/Importar** notas en formato JSON
- 📋 **Copiar al Portapapeles** con un click
- 🎯 **Notificaciones Toast** para feedback visual

### ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + K` | Focus en búsqueda |
| `Ctrl/Cmd + N` | Nueva nota |
| `Ctrl/Cmd + E` | Exportar notas |
| `Ctrl/Cmd + D` | Toggle modo oscuro |
| `Ctrl/Cmd + Enter` | Guardar edición |
| `Escape` | Cancelar edición |

### 🔒 Vulnerabilidades Intencionales (Para Aprendizaje)

- SQL Injection
- Cross-Site Scripting (XSS)
- CSRF (Cross-Site Request Forgery)
- Insecure Direct Object References
- Security Misconfiguration
- Sensitive Data Exposure

> ⚠️ **ADVERTENCIA**: Esta aplicación contiene vulnerabilidades intencionales. NO usar en producción.

---

## 🚀 Instalación

### Requisitos Previos

- Python 3.11+
- pip
- Docker y Docker Compose (opcional)
- Git

### Opción 1: Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/roxsross/roxs-eko-devsecops-lab.git
cd roxs-eko-devsecops-lab

# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar la aplicación
python run.py
```

La aplicación estará disponible en `http://localhost:8080`

### Opción 2: Docker (Recomendado)

```bash
docker-compose up -d
```

### Opción 3: Docker Compose Manual

```bash
# Construir y ejecutar
docker-compose up --build

# En segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f
```

---

## 📦 Estructura del Proyecto

```
roxs-eko-devsecops-lab/
├── notes/                      # Módulo principal de la aplicación
│   ├── __init__.py
│   ├── routes.py              # Rutas de la aplicación
│   ├── forms.py               # Formularios WTForms
│   ├── db.py                  # Gestión de base de datos
│   ├── templates/             # Templates HTML
│   │   └── index.html         # Template principal mejorado
│   └── static/                # Archivos estáticos
├── tests/                     # Tests unitarios
├── .env.example               # Variables de entorno ejemplo
├── .dockerignore              # Archivos ignorados por Docker
├── Dockerfile                 # Dockerfile multi-stage
├── docker-compose.yml         # Configuración Docker Compose
├── requirements.txt           # Dependencias Python
├── run.py                     # Punto de entrada
├── config.py                  # Configuración de la app
└── README.md                  # Este archivo
```
---

## 🐳 Docker

### Construcción de la Imagen

```bash
# Imagen optimizada multi-stage
docker build -f Dockerfile -t simply-simple-notes .

# Ver tamaño de la imagen
docker images simply-simple-notes
```

### Ejecución

```bash
# Ejecutar contenedor
docker run -d \
  -p 8080:8080 \
  --name notes-app \
  -e SECRET_KEY=your-secret-key \
  simply-simple-notes

# Ver logs
docker logs -f notes-app

# Acceder al shell
docker exec -it notes-app /bin/sh
```

### Docker Compose

```bash
# Iniciar
docker-compose up -d

# Ver estado
docker-compose ps

# Detener
docker-compose down

# Limpiar volúmenes
docker-compose down -v
```

---

## 🔐 Seguridad

### Herramientas de Análisis

```bash
# Escaneo de vulnerabilidades con Trivy
trivy image simply-simple-notes

# Análisis estático con Bandit
bandit -r notes/

# Linter de Dockerfile
docker run --rm -i hadolint/hadolint < Dockerfile.optimized

# Análisis de dependencias
safety check
```

### Vulnerabilidades Conocidas

Esta aplicación incluye las siguientes vulnerabilidades **intencionales**:

1. **SQL Injection**: En el sistema de búsqueda
2. **XSS**: En el campo de notas
3. **CSRF**: Falta de tokens CSRF
4. **Insecure Configuration**: Debug mode habilitado
5. **Weak Secrets**: Secret key predecible

### Mitigación (Para Aprendizaje)

Consulta el archivo `SECURITY.md` para ver cómo mitigar cada vulnerabilidad.

---

## 🧪 Testing

```bash
# Ejecutar tests
python -m pytest tests/ -v

# Con cobertura
python -m pytest --cov=notes tests/

# Tests en Docker
docker exec notes-app python -m pytest tests/
```

---

## 🛠️ Tecnologías

### Backend
- **Flask 2.2.5**: Framework web
- **SQLite**: Base de datos
- **WTForms**: Manejo de formularios
- **Flask-Bootstrap**: Componentes UI

### Frontend
- **HTML5/CSS3**: Estructura y estilos
- **JavaScript (Vanilla)**: Interactividad
- **Font Awesome 6**: Iconos
- **Google Fonts (Inter)**: Tipografía

### DevOps
- **Docker**: Containerización
- **Docker Compose**: Orquestación
- **Make**: Automatización
- **GitHub Actions**: CI/CD (próximamente)

---

## 👤 Autor

**RoxsRoss**

- GitHub: [@roxsross](https://github.com/roxsross)
- Twitter: [@roxsross](https://twitter.com/roxsross)
- LinkedIn: [roxsross](https://linkedin.com/in/roxsross)

---

<div align="center">

**Hecho con ❤️ por RoxsRoss**

*EkoParty - DevSecOps Lab*

⭐ Si te gustó este proyecto, dale una estrella!

</div>
