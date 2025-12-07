# 💰 Presupuesto Familiar

Aplicación web moderna para la gestión de finanzas personales con análisis inteligente basado en la regla 50/30/20, automatización de Aguinaldo (SAC) y reportes anuales para Declaración Jurada.

## 🚀 Características

### Gestión Financiera
- ✅ **Registro de Ingresos y Egresos**: Interfaz intuitiva con Material Design
- 📊 **Balance en Tiempo Real**: Cálculo reactivo de disponible, totales y porcentajes
- 📅 **Navegación Mensual**: Filtra y visualiza tus finanzas por mes/año
- ✏️ **Edición Completa**: Modifica o elimina registros con confirmación de seguridad

### Análisis Inteligente
- 🎯 **Regla 50/30/20**: Categorización automática de gastos
  - **50%** Necesidades (Vivienda, Servicios, Alimentación)
  - **30%** Extras (Entretenimiento, Ocio)
  - **20%** Ahorro + Pagos Financieros
- 💡 **Consejos Dinámicos**: Alertas y recomendaciones según tu comportamiento financiero
- 📈 **Barras de Progreso**: Visualización clara de límites y metas

### Automatización Argentina
- 🇦🇷 **Diálogo de Sueldo Inteligente**: Se activa automáticamente al inicio de cada mes
- 💵 **Cálculo de SAC (Aguinaldo)**: Sugerencia automática en Junio/Diciembre basada en el mejor sueldo del semestre
- ⚙️ **Configuración de Empleo**: Gestiona tipo de empleo, desempleo y meses de Aguinaldo

### Reportes y DDJJ
- 📋 **Balance Anual**: Vista consolidada de Ingresos/Egresos/Balance del año fiscal
- 💼 **Historial de Sueldos**: Lista detallada de todos tus ingresos salariales
- 📊 **Promedio Anual**: Cálculo automático del ingreso promedio mensual
- 📄 **Asistente DDJJ**: Datos listos para tu Declaración Jurada de Ingresos y Patrimonio

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 21** - Framework principal
- **Angular Material** - Componentes UI modernos y responsivos
- **NgRx** - Gestión de estado centralizada
- **RxJS** - Programación reactiva

### Backend
- **Node.js + Express** - Servidor API REST
- **SQLite3** - Base de datos embebida (portabilidad total)
- **CORS** - Habilitado para desarrollo

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm 9+

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/presupuesto-familiar.git
cd presupuesto-familiar
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar la aplicación**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🎮 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Compila Angular y ejecuta el servidor (Producción) |
| `npm run dev` | Ejecuta Angular (4200) y servidor (3000) en paralelo |
| `npm run build` | Compila la aplicación Angular |
| `npm test` | Ejecuta las pruebas unitarias |

## 📁 Estructura del Proyecto

```
presupuesto-familiar/
├── src/                          # Código fuente Angular
│   ├── app/
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── ingreso/          # Gestión de ingresos
│   │   │   ├── egreso/           # Gestión de egresos
│   │   │   ├── presupuesto/      # Dashboard principal
│   │   │   └── salary-dialog/    # Diálogo de sueldo mensual
│   │   └── views/                # Vistas principales
│   │       ├── home/             # Página principal
│   │       ├── configuracion/    # Configuración de usuario
│   │       └── reports/          # Reportes anuales
├── server/                       # Backend Node.js
│   ├── db.js                     # Configuración SQLite
│   ├── controller.js             # Lógica de negocio
│   └── index.js                  # Servidor Express
├── data/                         # Base de datos SQLite
│   └── presupuesto.db            # (Generado automáticamente)
└── dist/                         # Build de producción
```

## 💾 Base de Datos

La aplicación utiliza **SQLite** para máxima portabilidad. La base de datos se crea automáticamente en `data/presupuesto.db` al iniciar el servidor por primera vez.

### Tablas
- `ingreso`: Registros de ingresos
- `egreso`: Registros de egresos con categorización
- `configuracion`: Preferencias de usuario (tipo de empleo, SAC)

## 🎨 Capturas de Pantalla

> **Nota**: Ejecuta `npm start` y navega a `http://localhost:3000` para ver la interfaz completa.

## 🔧 Configuración

### Tipo de Empleo
Accede a **Configuración** (ícono de engranaje) para definir:
- Empleado en Relación de Dependencia
- Monotributista
- Autónomo
- Desempleado (con/sin subsidio)

### Meses de Aguinaldo
Personaliza los meses en los que cobras SAC (por defecto: Junio y Diciembre).

## 📊 Uso de la Regla 50/30/20

Al registrar un egreso, selecciona su categoría:
- **Necesario**: Alquiler, servicios, comida, transporte
- **Extra**: Salidas, streaming, hobbies
- **Financiero**: Cuotas de préstamos, tarjetas

El dashboard te mostrará automáticamente si estás dentro de los límites recomendados.

## 🐛 Solución de Problemas

### Error: `EADDRINUSE` (Puerto 3000 ocupado)
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

### La base de datos no se crea
Verifica que tengas permisos de escritura en la carpeta `data/`.

### Errores de compilación
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Carlos Prost**

---

⭐ Si este proyecto te resultó útil, ¡no olvides darle una estrella en GitHub!
