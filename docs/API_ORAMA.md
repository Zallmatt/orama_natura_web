# 📦 Documentación de APIs – ORAMA NATURA

Esta es la lista oficial de endpoints disponibles en el backend de Orama Natura. 
El sistema utiliza **Joi** para las validaciones y delega cálculos pesados (como stock y precios finales) directamente a **PostgreSQL (Supabase)**.

---

## 🛍️ Productos (`/api/products`)
Los endpoints de consulta pública (GET) apuntan a la vista `products_with_prices` ocultando márgenes de ganancia (`cost_price`) y retornando el costo con descuentos pre-calculado en `final_price`.

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/products` | `GET` | Obtener todos los productos activos. |
| `/api/products/inactive` | `GET` | Obtener todos los productos inactivos. |
| `/api/products/filter` | `GET` | Filtrar productos mediante query. Ej: `?category=x&discount=true&is_launch=true`. |
| `/api/products/launches` | `GET` | Obtener últimos 6 productos marcados como lanzamientos (`is_launch = true`). |
| `/api/products/promotions` | `GET` | Obtener últimos 6 productos con descuento pre-calculado. |
| `/api/products/:id` | `GET` | Obtener un producto por ID. |
| `/api/products` | `POST` | Crear un nuevo producto (Payload validado por *Joi productSchema*). |
| `/api/products/:id` | `PUT` | Actualizar un producto (Payload validado por *Joi productSchema*). |
| `/api/products/:id/activate` | `PUT` | Reactivar un producto eliminado previamente. |
| `/api/products/:id` | `DELETE` | Eliminar un producto (Soft-delete: lo marca como inactivo). |

---

## 🏷️ Categorías (`/api/categories`)
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/categories` | `GET` | Obtener todas las categorías. |
| `/api/categories/:id` | `GET` | Obtener detalles de una categoría por ID. |
| `/api/categories` | `POST` | Crear una nueva categoría. |
| `/api/categories/:id` | `PUT` | Editar una categoría existente. |
| `/api/categories/:id` | `DELETE` | Eliminar una categoría. |

---

## 🌸 Fragancias (`/api/fragrances`)
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/fragrances` | `GET` | Listar fragancias disponibles. |
| `/api/fragrances` | `POST` | Crear nueva fragancia. |
| `/api/fragrances/:id` | `PUT` | Editar una fragancia existente. |
| `/api/fragrances/:id` | `DELETE` | Eliminar una fragancia. |
| `/api/products/:id/fragrances` | `PUT` | Asociar fragancias a un producto específico. |

---

## 🛒 Órdenes (`/api/orders`)
**Nota sobre Stock:** El stock *NO* se descuenta manualmente en Node.js. Al insertar em `order_items`, el *Trigger PostgreSQL `tr_reduce_stock_after_sale`* hace el descuento automáticamente.

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/orders` | `POST` | Crear orden. (Validado por *Joi createOrderSchema*). |
| `/api/orders` | `GET` | Obtener todas las órdenes (requiere token ADMIN). |
| `/api/orders/:id` | `GET` | Obtener orden detallada por ID con todos sus items (requiere token ADMIN). |
| `/api/orders/:id/resumen` | `GET` | Obtener la orden en formato plano / resumido (requiere token ADMIN). |
| `/api/orders/user/:id` | `GET` | Órdenes detalladas de un usuario específico. |
| `/api/orders/user/:id/resumen` | `GET` | Resumen de todas las órdenes de un usuario específico. |
| `/api/orders/:id/status` | `PUT` | Cambia estado de la orden. Validado estrictamente contra ENUM de Postgres (*pending, paid, cancelled...*). |

---

## 📊 Estadísticas (`/api/stats`)
Todos los endpoints requieren token de administrador (`authenticateToken`, `authorizeAdmin`).

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/stats/total-sales` | `GET` | Sumatoria total del `total_amount` de todas las órdenes pagadas. |
| `/api/stats/top-products` | `GET` | Devuelve el **Top 5** de productos más vendidos con cantidades calculadas en tiempo real. |
| `/api/stats/sales-per-month`| `GET` | Devuelve la sumatoria de ventas pagadas agrupadas por cada uno de los **últimos 6 meses**. |
| `/api/stats/ministerio` | `GET` | Devuelve datos y estadísticas específicas para el reporte del Ministerio. |

---

## 👤 Usuarios (`/api/users`)
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/users` | `GET` | Obtener todos los usuarios. |
| `/api/users/:id` | `GET` | Obtener detalles de un usuario. |
| `/api/users` | `POST` | Insertar manualmente perfil de usuario de forma cruda. |
| `/api/users/:id` | `PUT` | Editar perfil de usuario. |
| `/api/users/:id` | `DELETE` | Eliminar perfil de usuario. |
| `/api/users/register-admin` | `POST` | Crea credenciales en Supabase Auth y crea perfil de administrador forzadamente (`role=admin`). |

---

## 🔐 Autenticación (`/api/auth`)
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/register` | `POST` | Validado por *Joi registerSchema*. Crea la sesión en Auth y el perfil atado en `users`. |
| `/api/auth/login` | `POST` | Validado por *Joi loginSchema*. Loguea, obtiene roles y firma nuestro propio JWT a medida. |

---

## 💸 Promociones (`/api/promotions`)
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/promotions` | `GET` | Ver todas las promociones. |
| `/api/promotions/active` | `GET` | Ver solo las promociones activas al día de la fecha. |
| `/api/promotions/:id` | `GET` | Ver detalles de promoción por ID. |
| `/api/promotions` | `POST` | Crear nueva regla de promoción. |
| `/api/promotions/:id` | `PUT` | Editar una promoción. |
| `/api/promotions/:id` | `DELETE` | Eliminar promoción de forma definitiva. |

---

## 🧠 Notas Adicionales
- Todo error en la API es atrapado por el middleware **`errorHandler.js`**, devolviendo un JSON seguro y estandarizado con el formato `{ success: false, error: "mensaje" }`.
- Las funciones de base de datos están encapsuladas exclusivamente en la carpeta `/models`, por lo que los controladores no tienen contacto directo con SQL ni con el cliente de Supabase.