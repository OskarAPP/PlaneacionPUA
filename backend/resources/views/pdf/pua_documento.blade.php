<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Programa de Unidad de Aprendizaje</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: "Segoe UI", Arial, sans-serif; font-size: 11px; color: #0f172a; margin: 0; padding: 32px; background: #f8fafc; }
        header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #cbd5f5; }
        .brand { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .document-meta { text-align: right; font-size: 10px; color: #475569; }
        h2 { font-size: 13px; margin: 0 0 8px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
        section { background: #fff; border-radius: 12px; padding: 16px 20px; margin-bottom: 16px; box-shadow: 0 5px 18px rgba(15,23,42,0.05); }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th, td { border: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: top; }
        th { background: #eef2ff; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.4px; }
        .two-column { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; background: #1d4ed8; color: #fff; }
        .list { margin: 0; padding-left: 18px; }
        .list li { margin-bottom: 4px; }
        .muted { color: #475569; font-size: 10px; }
        .subcompetencia-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 10px; }
        .subcompetencia-card h3 { margin: 0 0 6px; font-size: 12px; color: #0f172a; }
        .grid-two { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
    </style>
</head>
<body>
    @php
        $datosPua = $modulos['datos_pua'] ?? [];
        $competencias = $modulos['competencias_perfil'] ?? [];
        $perfilDocente = $modulos['perfil_docente'] ?? [];
        $bibliografia = $modulos['bibliografia_sugerida']['agregados'] ?? [];
        $comite = $modulos['comite_curricular'] ?? [];
        $evalFinal = $modulos['evaluacion_final']['instrumentos'] ?? [];
        $evalCompetencias = $modulos['evaluacion_competencias']['instrumentos'] ?? [];
        $subcompetencias = $modulos['subcompetencias']['items'] ?? [];

        $stringify = function ($value, $placeholder = '—') {
            if ($value === null) {
                return $placeholder;
            }

            if (is_array($value)) {
                $flattened = array_filter(array_map(function ($item) {
                    if (is_array($item)) {
                        return trim(json_encode($item, JSON_UNESCAPED_UNICODE));
                    }
                    return trim((string) $item);
                }, $value));

                return empty($flattened) ? $placeholder : implode('; ', $flattened);
            }

            $text = trim((string) $value);
            return $text === '' ? $placeholder : $text;
        };
    @endphp

    <header>
        <div class="brand">
            {{ $resumen['facultad'] ?? 'Universidad Autónoma de Campeche' }}<br>
            Programa de Unidad de Aprendizaje
        </div>
        <div class="document-meta">
            Documento #{{ $documento->id }} · Versión {{ str_pad($version, 2, '0', STR_PAD_LEFT) }}<br>
            Estado: {{ ucfirst($documento->status_revision) }}<br>
            Actualizado: {{ optional($documento->updated_at)->format('d/m/Y H:i') ?? '—' }}
        </div>
    </header>

    <section>
        <h2>Identificación de la unidad</h2>
        <table>
            <tr>
                <th>Facultad</th>
                <td>{{ $resumen['facultad'] ?? '—' }}</td>
                <th>Carrera</th>
                <td>{{ $resumen['carrera'] ?? '—' }}</td>
            </tr>
            <tr>
                <th>Plan de estudios</th>
                <td>{{ $resumen['plan'] ?? '—' }}</td>
                <th>Unidad de aprendizaje</th>
                <td>{{ data_get($resumen, 'materia.nombre') ?? '—' }}</td>
            </tr>
            <tr>
                <th>Créditos</th>
                <td>{{ data_get($resumen, 'materia.creditos') ?? '—' }}</td>
                <th>Horas totales</th>
                <td>{{ data_get($resumen, 'materia.horas_totales') ?? '—' }}</td>
            </tr>
            <tr>
                <th>Horas teóricas</th>
                <td>{{ data_get($resumen, 'materia.horas_teoricas') ?? '—' }}</td>
                <th>Horas prácticas</th>
                <td>{{ data_get($resumen, 'materia.horas_practicas') ?? '—' }}</td>
            </tr>
            <tr>
                <th>Área / Núcleo</th>
                <td>{{ data_get($resumen, 'materia.area') ?? '—' }} / {{ data_get($resumen, 'materia.nucleo') ?? '—' }}</td>
                <th>Tipo</th>
                <td>{{ data_get($resumen, 'materia.tipo') ?? '—' }}</td>
            </tr>
            <tr>
                <th>Art. 57 RGA</th>
                <td colspan="3">{{ data_get($resumen, 'materia.art57') ?? '—' }}</td>
            </tr>
        </table>
    </section>

    <section>
        <h2>Competencias del perfil de egreso</h2>
        <div class="two-column">
            <div>
                <span class="badge">Genéricas</span>
                <ul class="list">
                    @forelse(($competencias['genericas'] ?? []) as $item)
                        <li>{{ $stringify($item['competencia'] ?? $item['descripcion'] ?? null) }}</li>
                    @empty
                        <li class="muted">Sin registros</li>
                    @endforelse
                </ul>
            </div>
            <div>
                <span class="badge">Específicas</span>
                <ul class="list">
                    @forelse(($competencias['especificas'] ?? []) as $item)
                        <li>{{ $stringify($item['nombre'] ?? $item['descripcion'] ?? null) }}</li>
                    @empty
                        <li class="muted">Sin registros</li>
                    @endforelse
                </ul>
            </div>
        </div>
        <div class="two-column" style="margin-top:12px;">
            <div>
                <small class="muted">Competencias del área de formación</small>
                <p>{{ $stringify($competencias['formacion'] ?? null) }}</p>
            </div>
            <div>
                <small class="muted">Competencia de unidad de aprendizaje</small>
                <p>{{ $stringify($competencias['unidad'] ?? null) }}</p>
            </div>
        </div>
    </section>

    <section>
        <h2>Perfil del docente</h2>
        <div class="two-column">
            <div>
                <span class="badge">Académico</span>
                <ul class="list">
                    @forelse(($perfilDocente['academicos'] ?? []) as $item)
                        <li>{{ $stringify($item) }}</li>
                    @empty
                        <li class="muted">Sin requisitos definidos</li>
                    @endforelse
                </ul>
            </div>
            <div>
                <span class="badge">Profesional</span>
                <ul class="list">
                    @forelse(($perfilDocente['profesionales'] ?? []) as $item)
                        <li>{{ $stringify($item) }}</li>
                    @empty
                        <li class="muted">Sin requisitos definidos</li>
                    @endforelse
                </ul>
            </div>
            <div>
                <span class="badge">Docente</span>
                <ul class="list">
                    @forelse(($perfilDocente['docentes'] ?? []) as $item)
                        <li>{{ $stringify($item) }}</li>
                    @empty
                        <li class="muted">Sin requisitos definidos</li>
                    @endforelse
                </ul>
            </div>
        </div>
    </section>

    <section>
        <h2>Evaluación</h2>
        <div class="two-column">
            <div>
                <span class="badge">Evaluación final</span>
                <table>
                    <thead>
                        <tr>
                            <th>Instrumento</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($evalFinal as $instrumento)
                            <tr>
                                <td>{{ $instrumento['nombre'] ?? '—' }}</td>
                                <td>{{ $instrumento['porcentaje'] ?? '—' }}</td>
                            </tr>
                        @empty
                            <tr><td colspan="2" class="muted">Sin instrumentos registrados</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            <div>
                <span class="badge">Evaluación por competencias</span>
                <table>
                    <thead>
                        <tr>
                            <th>Instrumento</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($evalCompetencias as $instrumento)
                            <tr>
                                <td>{{ $instrumento['nombre'] ?? '—' }}</td>
                                <td>{{ $instrumento['porcentaje'] ?? '—' }}</td>
                            </tr>
                        @empty
                            <tr><td colspan="2" class="muted">Sin instrumentos registrados</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <section>
        <h2>Bibliografía sugerida</h2>
        @if(empty($bibliografia))
            <p class="muted">Sin referencias registradas.</p>
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
    </section>

    <section>
        <h2>Comité curricular</h2>
        <div class="two-column">
            <div>
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
            </div>
            <div>
                <table>
                    <tr>
                        <th>Fecha de elaboración</th>
                        <td>{{ $comite['fecha'] ?? now()->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <th>Estado del módulo</th>
                        <td>{{ ucfirst($comite['status'] ?? ($documento->status_revision ?? 'borrador')) }}</td>
                    </tr>
                </table>
            </div>
        </div>
        @php($firmantes = $comite['firmantes'] ?? [])
        <table style="margin-top:12px;">
            <thead>
                <tr>
                    <th>Rol</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                @forelse($firmantes as $rol => $persona)
                    <tr>
                        <td>{{ ucfirst(str_replace('_', ' ', $rol)) }}</td>
                        <td>{{ $persona['display'] ?? '—' }}</td>
                    </tr>
                @empty
                    <tr><td colspan="2" class="muted">Sin firmantes registrados.</td></tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section>
        <h2>Subcompetencias</h2>
        @if(empty($subcompetencias))
            <p class="muted">Aún no se han capturado subcompetencias en este documento.</p>
        @else
            @foreach($subcompetencias as $index => $subcompetencia)
                <div class="subcompetencia-card">
                    <h3>Subcompetencia {{ $index + 1 }} · {{ $subcompetencia['titulo'] ?? 'Sin título' }}</h3>
                    <p>{{ $subcompetencia['descripcion'] ?? 'Sin descripción' }}</p>
                    <div class="grid-two" style="margin:8px 0;">
                        <div>
                            <small class="muted">Resultados de aprendizaje</small>
                            <p>{{ $subcompetencia['resultados'] ?? '—' }}</p>
                        </div>
                        <div>
                            <small class="muted">Actividades de aprendizaje</small>
                            <p>{{ $subcompetencia['actividades'] ?? '—' }}</p>
                        </div>
                    </div>
                    <div class="grid-two">
                        <div>
                            <small class="muted">Evidencias</small>
                            <p>{{ $subcompetencia['evidencias'] ?? '—' }}</p>
                        </div>
                        <div>
                            <small class="muted">Recursos</small>
                            <p>{{ $subcompetencia['recursos'] ?? '—' }}</p>
                        </div>
                    </div>
                    <p class="muted">Horas T/P: {{ $subcompetencia['horasTeoricas'] ?? '0' }} / {{ $subcompetencia['horasPracticas'] ?? '0' }}</p>
                </div>
            @endforeach
        @endif
    </section>

</body>
</html>
