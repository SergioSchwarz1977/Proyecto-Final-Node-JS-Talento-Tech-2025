# Proyecto Final - API CRUD de Productos

Este proyecto es una API simple en Node.js (Express) que implementa un CRUD para productos. Cada producto tiene los campos:

- `nombre` (string)
- `categoria` (string)
- `precio` (number)

Los datos se almacenan en Firestore (Firebase). Hay autenticación por JWT para las rutas protegidas.

---

## 🧰 Requisitos

- Node.js 18+ (o la versión que uses en el entorno)
- Cuenta de Firebase con Firestore configurada
- Variables de entorno en un archivo `.env`

## 🔐 Variables de entorno (ejemplo .env)

Debes crear un `.env` en la raíz del proyecto con las siguientes variables (según tu proyecto de Firebase):

```
PORT=4000
JWT_SECRET_KEY=tu_clave_secreta_para_jwt
FIREBASE_API_KEY=xxxxx
FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
FIREBASE_PROJECT_ID=xxxxx
FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
FIREBASE_MESSAGING_SENDER_ID=xxxxx
FIREBASE_APP_ID=xxxxx
```

---

## 🚀 Instalación y ejecución

1. Clonar el proyecto
2. Instalar dependencias

```powershell
cd "d:\Proyecto Final Node Js"
npm install
```

3. Agregar `.env` (ver sección anterior)

4. Ejecutar el servidor

```powershell
npm start
```

Por defecto, las rutas están disponibles bajo el prefijo `/api` (por ejemplo `http://localhost:4000/api/...`). Ajusta `PORT` según tu `.env`.

---

## 🔑 Autenticación

Para obtener un token JWT (ejemplo de autenticación básica en este proyecto):

- Endpoint: `POST /api/login`
- Body (JSON):

```json
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

Respuesta ejemplo:

```json
{ "token": "<JWT-TOKEN-AQUI>" }
```

Usar el token para las rutas protegidas añadiendo el header:

```
Authorization: Bearer <JWT-TOKEN-AQUI>
```

---

## 📦 Rutas (CRUD de productos)

Todas estas rutas están bajo el prefijo `/api` y requieren el header `Authorization` (token JWT) a excepción de `/api/login`.

1) Obtener todos los productos

- Método: GET
- URL: `/api/products`
- Respuesta (200): array de productos

Ejemplo respuesta:

```json
[
	{
		"id": "abc123",
		"nombre": "Yerba",
		"categoria": "infusion",
		"precio": 200
	}
]
```

2) Obtener un producto por id

- Método: GET
- URL: `/api/products/:id`
- Respuesta (200): objeto producto

Ejemplo:

GET `/api/products/fVu5C4s2t5vHqrU2hKrf`

Respuesta:

```json
{
	"id": "fVu5C4s2t5vHqrU2hKrf",
	"nombre": "Yerba",
	"categoria": "infusion",
	"precio": 200
}
```

3) Crear nuevo producto

- Método: POST
- URL: `/api/products/create`
- Body (JSON):

```json
{
	"nombre": "Yerba",
	"categoria": "infusion",
	"precio": 200
}
```

Respuesta (201):

```json
{
	"message": "Producto creado exitosamente",
	"product": {
		"nombre": "Yerba",
		"categoria": "infusion",
		"precio": 200,
		"id": "kKk4LP7OZGrw6kS59zrg"
	}
}
```

4) Actualizar producto

- Método: PUT
- URL: `/api/products/:id`
- Body (JSON) con los campos a cambiar (ej. `nombre`, `categoria`, `precio`)

Ejemplo:

PUT `/api/products/fVu5C4s2t5vHqrU2hKrf`
Body:

```json
{ "precio": 250 }
```

Respuesta (200): objeto con resultado de la actualización (según implementación del backend).

5) Eliminar producto

- Método: DELETE
- URL: `/api/products/:id`

Ejemplo:

DELETE `/api/products/fVu5C4s2t5vHqrU2hKrf`

Respuesta (200): mensaje de confirmación

---

## 🔍 Notas / detalles técnicos

- Firestore: colección `products` (documentos con campos `nombre`, `categoria`, `precio`).
- Arquitectura: controlador (controllers) → servicio (service) → modelo (models) → Firestore.
- Cors: configurado para `http://localhost:3000` (ajusta si el frontend corre en otro origen).
- Middleware de autenticación: espera el header `Authorization: Bearer <token>` y verifica con `JWT_SECRET_KEY`.

---

## 💡 Recomendaciones y mejoras posibles

- Validaciones en los endpoints (comprobar tipos y campos obligatorios).
- Manejar errores con respuestas JSON homogéneas para facilitar el frontend.
- En `update` conviene usar `id` desde `req.params` y validar que el body no contenga campos inválidos.
- Agregar logs y tests unitarios / de integración.

---

Se encuentra desplegado en Vercel los archivos de BackEnd.

Los archivos que contemplan al FrontEnd se encuentran en arreglos para luego hacer el despliegue


