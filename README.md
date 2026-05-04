# Garmin Entreno · by AlejandrLucena

Visualizador de entrenamientos de Garmin Connect. Carga un `.fit`/`.zip`, conéctate al servidor MCP o pega JSON — obtén una tabla desglosada por vueltas, zonas de FC y grupos de intervalos, lista para compartir como imagen.

**Demo:** https://Alejandrlucena.github.io/garmin-entreno

---

## Cómo funciona

### Opción 1 — Archivo local
Arrastra un `.fit` o `.zip` al recuadro del editor, o usa el botón **📁 Garmin**.

### Opción 2 — Conector directo
Pulsa **🔌 Conector → ⚙ Configurar** para introducir la URL de tu servidor, luego pulsa **🔌 Conector** → elige actividad → se carga automáticamente, sin subir ningún archivo.

- Funciona desde **móvil y escritorio**
- Requiere tener [garmin-coach-mcp](https://github.com/Alejandrlucena/garmin-coach-mcp) desplegado en Railway o corriendo en local
- Solo muestra actividades con datos de splits (carrera, ciclismo, natación…); fuerza, yoga, etc. se ocultan automáticamente
- Usa los campos **Desde / Hasta** para filtrar por rango de fechas y acceder a cualquier actividad histórica (2017, 2018…); sin fechas muestra las 30 más recientes

### Opción 3 — JSON manual
Pega el JSON de una actividad que te haya dado Claude o ChatGPT y pulsa **▶ Renderizar**.

No requiere instalación, login ni backend. Todo corre en el navegador.

---

## Qué muestra

Cada actividad se desglosa en tres bloques:

- **Calentamiento** — vueltas iniciales antes de la serie principal
- **Intervalos** — grupos de carrera + recuperación con cabecera de resumen por serie
- **Enfriamiento** — vueltas finales tras el último intervalo

Por cada vuelta:

| Columna | Descripción |
|---|---|
| Paso | Etiqueta de la fase (Calentamiento, Carrera, Descanso, Enfriamiento…) |
| Vuelta | Número(s) de vuelta |
| Tiempo | Duración de la vuelta |
| Tiempo acum. | Tiempo acumulado desde el inicio |
| Distancia | Kilómetros de la vuelta |
| Ritmo | min/km |
| FC med / FC máx | Frecuencia cardíaca media y máxima |
| Cad | Cadencia (pasos/min) |
| Zona FC | Zona de entrenamiento Z1–Z5 con barra de color |

Los grupos de intervalos incluyen una fila de resumen con totales de tiempo, distancia y FC del conjunto completo.

---

## Barra de acciones

| Botón | Acción |
|-------|--------|
| 🌐 Garmin Connect | Abre Garmin Connect en el navegador |
| ⚡ Zonas FC | Activa o desactiva las zonas de FC (toggle on/off) |
| ⚙ Configurar (Zonas FC) | Abre/cierra el panel de configuración de zonas |
| 📤 Drive | Sube la vista actual a Drive y copia el link |
| 🔌 Conector | Carga actividades desde el servidor Garmin MCP |
| ⚙ Configurar (Drive/Conector) | Abre el panel de configuración unificado |

**Drive** y **Conector** comparten un único botón partido con zona **⚙ Configurar** en la parte inferior.
**Zonas FC** también es un botón partido: el área principal activa/desactiva las zonas y el área **⚙** abre la configuración.

---

## Zonas de frecuencia cardíaca

La web admite cuatro métodos de cálculo:

- **% Umbral de lactato** — introduce tu FC en umbral de lactato (recomendado)
- **% FC máxima** — introduce tu FC máxima
- **Karvonen (% FCR)** — introduce FC máxima y FC en reposo
- **Manual** — define los rangos Z1–Z5 directamente

Los ajustes se guardan en el navegador (localStorage) y se aplican automáticamente en cada carga.

Flujo de uso:
1. Pulsa **⚙ Configurar** bajo el botón Zonas FC, introduce tu método y valores, pulsa **Aplicar zonas**
2. A partir de ahí, el botón **⚡ Zonas FC** activa y desactiva las zonas con un solo clic

---

## Guardar y compartir

Una vez cargada la actividad, tres botones:

- **Generar imagen** — muestra una preview de la tabla con botón **Descargar** (PNG). Funciona en todos los navegadores y dispositivos, incluyendo iOS Safari.
- **Copiar imagen** — copia la imagen directamente al portapapeles sin ningún popup (compatible con Safari y Chrome). Si el navegador no admite copia de imágenes, muestra un aviso para usar "Generar imagen".
- **Obtener link** (Drive) — sube la imagen a Google Drive y copia el link al portapapeles.

Todas las imágenes incluyen la firma `by AlejandrLucena` en el pie.

---

## Configuración unificada (⚙ Configurar)

El panel único de configuración gestiona:

- **Usuario** — alias local que se usa para recuperar tu configuración en otros dispositivos
- **URL del servidor Garmin MCP** — dónde está corriendo [garmin-coach-mcp](https://github.com/Alejandrlucena/garmin-coach-mcp)
- **URL de Drive (Apps Script)** — URL `/exec` de tu Google Apps Script para subir imágenes

Al guardar el servidor, la URL de Drive se sincroniza automáticamente desde el volumen de Railway — no hace falta reintroducirla en cada dispositivo.

### Crear el Apps Script para Drive

1. Ve a [script.google.com](https://script.google.com) con tu cuenta Google
2. Crea un nuevo proyecto y copia el contenido de [`GarminDriveUpload_AppScript.js`](GarminDriveUpload_AppScript.js)
3. Reemplaza `PON_AQUI_EL_ID_DE_TU_CARPETA_DE_DRIVE` con el ID de tu carpeta de Drive
4. Despliega como **Aplicación web** (ejecutar como: Yo · acceso: Cualquier usuario)
5. Copia la URL `/exec` y pégala en ⚙ Configurar

---

## Tecnología

Un único fichero `index.html` sin dependencias en servidor. Usa:

- [html2canvas](https://html2canvas.hertzen.com) para la captura de imagen
- [fit-file-parser](https://github.com/jimmykane/fit-file-parser) (inlined) para leer `.fit`
- [JSZip](https://stuk.github.io/jszip/) (inlined) para extraer `.zip`
- LocalStorage para guardar configuración de zonas, Drive y Conector
- Google Apps Script (externo, opcional) para el upload a Drive

---

## Proyectos relacionados

- [garmin-coach-mcp](https://github.com/Alejandrlucena/garmin-coach-mcp) — Servidor MCP que conecta Garmin Connect con Claude y ChatGPT. Alimenta el botón 🔌 Conector de esta web.
