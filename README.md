# 🐾 Aplicación Pet Clinic

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=spring-boot)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Maven](https://img.shields.io/badge/Maven-Build-red?style=for-the-badge&logo=apache-maven)

**Un sistema moderno y containerizado de gestión de clínica veterinaria**

[Características](#-características) • [Inicio Rápido](#-inicio-rápido) • [Docker](#-despliegue-con-docker) • [Desarrollo](#-desarrollo)

</div>

---

## 📖 Acerca de

Pet Clinic es una aplicación **Spring Boot** que demuestra las mejores prácticas en desarrollo web moderno con Java. Esta es una [versión dockerizada de la aplicación original](https://github.com/spring-projects/spring-petclinic) publicada por la comunidad de Spring Boot, mejorada con UI/UX moderna y soporte de containerización.

### 🏗️ Arquitectura

Construida con el patrón **MVC (Modelo-Vista-Controlador)**, esta aplicación muestra:

- **Spring Boot** - Framework de aplicación e inyección de dependencias
- **Spring MVC** - Capa web y controladores REST
- **Spring Data JPA** - Persistencia de datos y patrón repository
- **Thymeleaf** - Motor de plantillas del lado del servidor
- **H2/MySQL** - Soporte de base de datos (en memoria o persistente)
- **Docker** - Containerización y despliegue

La arquitectura enfatiza la **separación de responsabilidades**, proporcionando una división clara entre la lógica de negocio, el acceso a datos y las capas de presentación.


## ✨ Características

<table>
<tr>
<td width="50%">

### 👥 Gestión de Propietarios
- ➕ Registrar nuevos dueños de mascotas
- 🔍 Buscar propietarios por nombre
- ✏️ Actualizar información de propietarios
- 📋 Ver detalles de propietarios y mascotas

</td>
<td width="50%">

### 🐕 Gestión de Mascotas
- 🐾 Agregar mascotas a propietarios
- 📝 Seguimiento de información de mascotas
- 🏥 Historial de visitas médicas
- 🎂 Detalles y seguimiento de edad

</td>
</tr>
<tr>
<td width="50%">

### 👨‍⚕️ Directorio de Veterinarios
- 📋 Listar todos los veterinarios
- 🩺 Ver especialidades
- 📄 Resultados paginados
- 🔍 Navegación fácil

</td>
<td width="50%">

### 🎨 UI/UX Moderna
- 🌈 Diseño cálido y amigable
- 📱 Totalmente responsive
- ⚡ Animaciones suaves
- ♿ Interfaz accesible

</td>
</tr>
</table>

---

## 🚀 Inicio Rápido

### Prerequisitos

- ☕ **Java 17** o superior
- 📦 **Maven 3.8+** (o usar el wrapper incluido)
- 🐳 **Docker** (opcional, para despliegue containerizado)

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/dockersamples/spring-petclinic.git
cd spring-petclinic
```

### 2️⃣ Ejecutar Localmente

#### Opción A: Usando Maven Wrapper (Recomendado)

```bash
# Construir y ejecutar
./mvnw package
java -jar target/*.jar
```

#### Opción B: Usando Spring Boot Maven Plugin (Hot Reload)

```bash
# Ejecutar con recarga automática al cambiar código
./mvnw spring-boot:run
```

### 3️⃣ Acceder a la Aplicación

Abre tu navegador y navega a:

```
🌐 http://localhost:8080
```

<img width="625" alt="Captura de Pet Clinic" src="https://user-images.githubusercontent.com/313480/179161406-54a28200-d52e-411f-bfbe-463cf64b64b3.png">

---

## 📝 Notas Importantes

> **💡 Usuarios de Windows**: Configura `git config core.autocrlf true` para evitar fallos de formato (usa `--global` para configuración global)

> **🔧 Usuarios de Gradle**: Construye con `./gradlew build` y encuentra el JAR en `build/libs`

---

## 🐳 Despliegue con Docker

### Construcción Estándar

Construir una imagen Docker usando el Dockerfile estándar:

```bash
docker build -t petclinic-app . -f Dockerfile
```

### Construcción Multi-Stage (Optimizada)

Usar construcción multi-stage para menor tamaño de imagen:

```bash
docker build -t petclinic-app . -f Dockerfile.multi
```

### Ejecutar Contenedor

```bash
docker run -d -p 8080:8080 --name petclinic petclinic-app
```

### Usando Docker Compose (Recomendado)

La forma más fácil de ejecutar la aplicación con todas las dependencias:

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

**Docker Compose incluye:**
- 🐾 Aplicación Pet Clinic
- 🗄️ Base de datos MySQL (opcional)
- 🔗 Configuración de red
- 📦 Persistencia de volúmenes

---

## 💻 Desarrollo

### Estructura del Proyecto

```
pet-clinic/
├── src/
│   ├── main/
│   │   ├── java/              # Código fuente Java
│   │   ├── resources/
│   │   │   ├── static/        # CSS, JS, imágenes
│   │   │   └── templates/     # Plantillas Thymeleaf
│   └── test/                  # Tests unitarios e integración
├── Dockerfile                 # Construcción Docker estándar
├── Dockerfile.multi          # Construcción Docker multi-stage
├── docker-compose.yml        # Configuración Docker Compose
└── pom.xml                   # Configuración Maven
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
./mvnw test

# Ejecutar con cobertura
./mvnw clean test jacoco:report
```

### Construir para Producción

```bash
# Crear JAR de producción
./mvnw clean package -DskipTests

# Ejecutar build de producción
java -jar target/spring-petclinic-*.jar
```

---

## 🎨 Mejoras de UI/UX

Esta versión incluye mejoras modernas de interfaz:

- 🌈 **Paleta de Colores Cálidos** - Inspirada en el cuidado amigable de mascotas
- 🎭 **Animaciones Suaves** - Experiencia de usuario mejorada
- 📱 **Diseño Responsive** - Funciona en todos los dispositivos
- ♿ **Accesibilidad** - Compatible con WCAG
- 🚀 **Rendimiento** - Tiempos de carga optimizados

Ver [UI_IMPROVEMENTS.md](./UI_IMPROVEMENTS.md) para documentación detallada.

---

## 📚 Recursos y Referencias

### Documentación
- 📖 [Documentación Spring Boot](https://spring.io/guides/gs/spring-boot)
- 🐳 [Guía Docker Java](https://docs.docker.com/language/java/build-images/)
- 🏗️ [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- 🎨 [Documentación Thymeleaf](https://www.thymeleaf.org/documentation.html)

### Proyecto Original
- 🔗 [Spring PetClinic Original](https://github.com/spring-projects/spring-petclinic)
- 🐳 [Docker Samples](https://github.com/dockersamples/spring-petclinic)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

1. Haz fork del repositorio
2. Crea tu rama de feature (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios (`git commit -m 'Agregar alguna CaracteristicaIncreible'`)
4. Push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está licenciado bajo Apache License 2.0 - ver el repositorio original [Spring PetClinic](https://github.com/spring-projects/spring-petclinic) para más detalles.

---

<div align="center">

**Hecho con ❤️ para mascotas y sus familias**

🐾 ¡Feliz Codificación! 🐾

</div>
