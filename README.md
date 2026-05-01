# Garmin Entreno · by AlejandrLucena

Visualizador de entrenamientos de Garmin Connect. Carga un `.fit`/`.zip`, conéctate al servidor MCP o pega JSON — obtén una tabla desglosada por vueltas, zonas de FC y grupos de intervalos, lista para compartir como imagen.

**Demo:** https://Alejandrlucena.github.io/garmin-entreno

---

## Cómo funciona

### Opción 1 — Archivo local
Arrastra un `.fit` o `.zip` al recuadro del editor, o usa el botón **📁 Garmin**.

### Opción 2 — Conector directo
Pulsa **🔌 Conector → ⚙** para introducir la URL de tu servidor, luego pulsa **🔌 Conector** → elige actividad → se carga automáticamente, sin subir ningún archivo.

- Funciona desde **móvil y escritorio**
- Requiere tener [garmin-coach-mcp](https://github.com/Alejandrlucena/garmin-coach-mcp) desplegado en Railway o corriendo en local
- Solo muestra actividades con datos de splits (carrera, ciclismo, natación…); fuerza, yoga, etc. se ocultan automáticamente

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
| 🌐 Connect | Abre Garmin Connect en el navegador |
| ⚡ Zonas FC | Configura las zonas de FC |
| 📤 Drive | Sube la vista actual a Drive y copia el link |
| 🔌 Conector | Carga actividades desde el servidor Garmin MCP |

Los botones **Drive** y **Conector** son botones partidos: la mitad superior lanza la acción y la mitad inferior **⚙ Configurar** abre los ajustes sin interferir.

---

## Zonas de frecuencia cardíaca

La web admite cuatro métodos de cálculo:

- **% Umbral de lactato** — introduce tu FC en umbral de lactato (recomendado)
- **% FC máxima** — introduce tu FC máxima
- **Karvonen (% FCR)** — introduce FC máxima y FC en reposo
- **Manual** — define los rangos Z1–Z5 directamente

Los ajustes se guardan en el navegador (localStorage) y se aplican automáticamente en cada carga.

---

## Guardar y compartir

Una vez cargada la actividad, tres botones:

- **Generar imagen** — descarga un PNG de alta resolución de la tabla completa
- **Copiar imagen** — copia la imagen al portapapeles (para pegar en WhatsApp, Notas, etc.)
- **Obtener link** (Drive) — sube la imagen a Google Drive y copia el link al portapapeles

Todas las imágenes incluyen la firma `by AlejandrLucena` en el pie.

---

## Configurar "Obtener link" (Google Drive)

El botón **📤 Drive → ⚙** te pide la URL de tu propio Google Apps Script. Una vez guardada se conecta automáticamente en siguientes sesiones.

### Crear el Apps Script

1. Ve a [script.google.com](https://script.google.com) con tu cuenta Google
2. Crea un nuevo proyecto y copia el contenido de [`GarminDriveUpload_AppScript.js`](GarminDriveUpload_AppScript.js)
3. Reemplaza `PON_AQUI_EL_ID_DE_TU_CARPETA_DE_DRIVE` con el ID de tu carpeta de Drive
4. Despliega como **Aplicación web** (ejecutar como: Yo · acceso: Cualquier usuario)
5. Copia la URL `/exec`

---

## Configurar el Conector Garmin

El botón **🔌 Conector → ⚙** te pide la URL de tu propio servidor Garmin MCP.

- Despliega [garmin-coach-mcp](https://github.com/Alejandrlucena/garmin-coach-mcp) en Railway y pega la URL que te dé (`https://tuservicio.up.railway.app`)
- O arráncalo en local y usa `http://localhost:8000`
- Las URLs con sufijo `/mcp` o `/sse` se limpian automáticamente
- Sin URL configurada, el conector muestra un mensaje de ayuda en lugar de fallar en silencio

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
