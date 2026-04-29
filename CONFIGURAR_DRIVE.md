# Configurar "Obtener link" con Google Drive

Esto deja la web igual que ahora, pero anade un boton que sube el JPG a tu carpeta de Drive y te copia el link.

Carpeta de destino ya configurada:

`https://drive.google.com/drive/folders/1flQC1TuTgMoskS0gFUwr_bL1qQomirR3`

## Pasos

1. Abre `https://script.google.com/`.
2. Pulsa `Nuevo proyecto`.
3. Borra el contenido de `Code.gs`.
4. Pega el contenido de `apps-script/garmin-drive-upload.gs`.
5. Arriba, cambia el nombre del proyecto a `Garmin Drive Upload`.
6. Pulsa `Implementar` -> `Nueva implementacion`.
7. En el engranaje de tipo, elige `Aplicacion web`.
8. Configura:
   - Ejecutar como: `Yo`
   - Quien tiene acceso: `Cualquier usuario`
9. Pulsa `Implementar`.
10. Autoriza los permisos de Google Drive.
11. Copia la `URL de la aplicacion web`.
12. Abre `https://luce23.github.io/garmin-entreno/`.
13. Pulsa `Drive link`.
14. Pega la URL.
15. En la clave secreta puedes dejarlo vacio si no cambiaste `UPLOAD_SECRET`.

## Uso

1. Carga el `.fit` o `.zip`.
2. Pulsa `Renderizar`.
3. Pulsa `Obtener link`.
4. La imagen se guarda como JPG en Drive y el link queda copiado.

## Borrar fotos

Entra en la carpeta de Drive y borra las fotos que ya no quieras. Si las borras de Drive, el link deja de funcionar.
