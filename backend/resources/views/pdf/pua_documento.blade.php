<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Programa de Unidad de Aprendizaje</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #1f2937; }
        h1, h2 { color: #0f172a; margin-bottom: 6px; }
        .section { margin-bottom: 18px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
        th, td { border: 1px solid #cbd5f5; padding: 6px; text-align: left; }
        th { background: #e2e8f0; font-weight: bold; }
        ul { margin: 0; padding-left: 18px; }
        .small { font-size: 10px; color: #475569; }
    </style>
</head>
<body>
    <h1>Programa de Unidad de Aprendizaje</h1>
    <div class="small">
        Documento #{{ $documento->id }} · Carrera ID: {{ $documento->carrera_id }} · Materia ID: {{ $documento->materia_id }}
    </div>

    <div class="section">
        <h2>Datos generales</h2>
        <table>
            <tr>
                <th>Status de revisión</th>
                <td>{{ ucfirst($documento->status_revision) }}</td>
            </tr>
            <tr>
                <th>Última actualización</th>
                <td>{{ optional($documento->updated_at)->format('d/m/Y H:i') }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>Bibliografía sugerida</h2>
        @php($bibliografia = $modulos['bibliografia_sugerida']['agregados'] ?? [])
        @if(empty($bibliografia))
            <p>No hay elementos registrados.</p>
        @else
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>Año</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($bibliografia as $item)
                        <tr>
                            <td>{{ $item['titulo'] ?? 'Sin título' }}</td>
                            <td>{{ $item['autor'] ?? $item['autores'] ?? 'Sin autor' }}</td>
                            <td>{{ $item['editorial'] ?? '—' }}</td>
                            <td>{{ $item['anio'] ?? '—' }}</td>
                            <td>{{ $item['tipo'] ?? '—' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    <div class="section">
        <h2>Comité curricular</h2>
        @php($comite = $modulos['comite_curricular'] ?? [])
        <table>
            <tr>
                <th>Responsable</th>
                <td>{{ $comite['responsable']['display'] ?? 'Sin definir' }}</td>
            </tr>
            <tr>
                <th>Participante extra</th>
                <td>{{ $comite['participanteExtra']['display'] ?? '—' }}</td>
            </tr>
        </table>
        @php($firmantes = $comite['firmantes'] ?? [])
        @if(!empty($firmantes))
            <table>
                <thead>
                    <tr>
                        <th>Rol</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($firmantes as $rol => $persona)
                        <tr>
                            <td>{{ ucfirst(str_replace('_', ' ', $rol)) }}</td>
                            <td>{{ $persona['display'] ?? '—' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
</body>
</html>
