# Garmin Entreno · by AlejandrLucena

Visualizador de entrenamientos de Garmin Connect. Pega el JSON que te da Claude o ChatGPT y obtén una tabla desglosada por vueltas, zonas de FC y grupos de intervalos — lista para compartir como imagen.

**Demo:** https://luce23.github.io/garmin-entreno

---

## Cómo funciona

1. Pregunta a Claude o ChatGPT (con el conector MCP de Garmin) los datos de una actividad
2. Copia el JSON que devuelven
3. Pégalo en la web
4. La tabla aparece al instante

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

## Zonas de frecuencia cardíaca

La web admite tres métodos de cálculo:

- **% Umbral de lactato** — introduce tu FC en umbral de lactato (recomendado)
- **% FC máxima** — introduce tu FC máxima y FC en reposo
- **Manual** — define los rangos Z1–Z5 directamente

Los ajustes se guardan en el navegador (localStorage) y se aplican automáticamente en cada carga.

---

## Guardar y compartir

Una vez cargada la actividad, tres botones:

- **Generar imagen** — descarga un PNG de alta resolución de la tabla completa
- **Copiar imagen** — copia la imagen al portapapeles (para pegar en WhatsApp, Notas, etc.)
- **Obtener link** — sube la imagen a Google Drive y copia el link al portapapeles

Todas las imágenes incluyen la firma `by AlejandrLucena` en el pie.

---

## Configurar "Obtener link" (Google Drive)

El botón **Obtener link** sube la imagen a tu propia carpeta de Google Drive y te devuelve un link compartible.

### Paso 1 — Crear el Apps Script

1. Ve a [script.google.com](https://script.google.com) con tu cuenta Google
2. Crea un nuevo proyecto
3. Copia el contenido de [`GarminDriveUpload_AppScript.js`](GarminDriveUpload_AppScript.js)
4. Reemplaza `PON_AQUI_EL_ID_DE_TU_CARPETA_DE_DRIVE` con el ID de tu carpeta de Drive
   - Abre la carpeta en Drive → copia el ID de la URL: `drive.google.com/drive/folders/ESTE_ES_EL_ID`
5. Despliega como **Aplicación web**:
   - Implementar → Nueva implementación
   - Tipo: Aplicación web
   - Ejecutar como: **Yo**
   - Quién puede acceder: **Cualquier usuario**
6. Copia la URL `/exec` que te da Google

### Paso 2 — Conectar con la web

Al hacer clic en **Obtener link** por primera vez, la web te pide un nombre de usuario.
- Si ya está registrado en el mapa interno, se configura automáticamente
- Si no, pega la URL del Apps Script cuando te la pida

La configuración se guarda en el navegador (localStorage) y no vuelve a preguntarlo.

---

## Formatos de JSON aceptados

La web entiende automáticamente la salida de:

- **Garmin Connect raw** — JSON de la API de Garmin (vía conector MCP)
- **ChatGPT / Claude** — JSON estructurado con campos `series`, `laps`, `zones`
- **Múltiples actividades** — un array o varios bloques JSON pegados juntos

---

## Tecnología

Un único fichero `index.html` sin dependencias externas en servidor. Usa:

- [html2canvas](https://html2canvas.hertzen.com) para la captura de imagen
- LocalStorage para guardar la configuración de zonas y la URL de Drive
- Google Apps Script (externo, opcional) para el upload a Drive
