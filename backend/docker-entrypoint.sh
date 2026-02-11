#!/bin/bash

# Esperar a que la base de datos esté lista (opcional, pero recomendado)
# En un entorno real se usaría algo como wait-for-it, aquí confiamos en el restart policy de docker-compose

# Ejecutar migraciones
echo "Ejecutando migraciones..."
php artisan migrate --force

# Limpiar y cachear configuración
echo "Limpiando cache..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Iniciar PHP-FPM (el comando pasado al contenedor)
exec "$@"
