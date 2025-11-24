<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    // Laravel estaba respondiendo con un header vacío en los preflight, así que listamos
    // explícitamente los encabezados comunes que usamos desde Vite para evitar rechazos CORS.
    'allowed_headers' => [
    'Content-Type',
    'content-type',
    'X-Requested-With',
    'x-requested-with',
    'Accept',
    'accept',
    'Origin',
    'origin',
    'Authorization',
    'authorization',
                         ],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
