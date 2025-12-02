<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Programa de Unidad de Aprendizaje</title>
    <style>
        /* RESET Y ESTILOS BASE PARA DOMPDF */
        body {
            font-family: Arial, Helvetica, sans-serif; /* Fuente del JRXML  */
            font-size: 10px;
            color: #000;
            margin: 0;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            page-break-inside: avoid;
        }
        th, td {
            border: 1px solid #000000; /* Bordes sólidos como en el PDF original */
            padding: 4px 6px;
            vertical-align: middle;
            text-align: left;
        }
        /* Color de fondo exacto extraído del JRXML  */
        th, .bg-header {
            background-color: #EDE8E2; 
            font-weight: bold;
            font-size: 11px;
        }
        h2 {
            font-size: 12px;
            margin: 0;
            padding: 0;
            display: none; /* Ocultamos los h2 modernos, usaremos tablas con títulos */
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        
        /* Estilos específicos para replicar el layout */
        .header-main td { border: none; }
        .section-title {
            background-color: #EDE8E2;
            font-weight: bold;
            text-align: center;
        }
        .footer-code {
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            font-size: 9px;
            color: #555;
            border-top: 1px solid #000;
            padding-top: 5px;
        }
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

        // Helper para strings
        $stringify = function ($value, $placeholder = '') {
            if ($value === null) return $placeholder;
            if (is_array($value)) {
                $flattened = array_filter(array_map(function ($item) {
                    if (is_array($item)) return trim(json_encode($item, JSON_UNESCAPED_UNICODE));
                    return trim((string) $item);
                }, $value));
                return empty($flattened) ? $placeholder : implode('; ', $flattened);
            }
            return trim((string) $value) === '' ? $placeholder : trim((string) $value);
        };
    @endphp

    <div class="footer-code">
        R00/2014 &nbsp;&nbsp;&nbsp;&nbsp; R-DES-15 &nbsp;&nbsp;&nbsp;&nbsp; Página <script type="text/php">if (isset($pdf)) { echo $pdf->get_page_number(); }</script>
    </div>

    <table>
        <tr>
            <td class="bg-header" width="30%">Nombre de la Facultad o Escuela</td>
            <td>{{ $resumen['facultad'] ?? 'Facultad de Ingeniería' }}</td>
        </tr>
        <tr>
            <td class="bg-header">Nombre del Programa Educativo</td>
            <td>{{ $resumen['carrera'] ?? 'Ingeniero en Tecnología de Software' }}</td>
        </tr>
        <tr>
            <td class="bg-header">Plan de Estudio:</td>
            <td>{{ $resumen['plan'] ?? '2017' }}</td>
        </tr>
        <tr>
            <td class="bg-header">Nombre de la academia(s) que lo aprobó (aron):</td>
            <td>{{ data_get($resumen, 'materia.academia') ?? 'Tecnología de Software' }}</td>
        </tr>
    </table>

    <table style="border:none; margin-bottom:5px;">
        <tr>
            <td style="border:none; text-align:right; font-size:14px; font-weight:bold; color:#0099CC;">
                Programa de Unidad Académica
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="bg-header" width="25%">Nombre de la Unidad de Aprendizaje:</td>
            <td colspan="5"><strong>{{ data_get($resumen, 'materia.nombre') ?? '—' }}</strong></td>
        </tr>
        <tr>
            <td class="bg-header">Créditos:</td>
            <td class="text-center">{{ data_get($resumen, 'materia.creditos') ?? '—' }}</td>
            <td class="bg-header">Horas totales:</td>
            <td class="text-center">{{ data_get($resumen, 'materia.horas_totales') ?? '—' }}</td>
            <td class="bg-header">Horas prácticas:</td>
            <td class="text-center">{{ data_get($resumen, 'materia.horas_practicas') ?? '—' }}</td>
        </tr>
        <tr>
            <td class="bg-header">Área:</td>
            <td class="text-center">{{ data_get($resumen, 'materia.area') ?? '—' }}</td>
            <td class="bg-header">Horas teóricas:</td>
            <td class="text-center">{{ data_get($resumen, 'materia.horas_teoricas') ?? '—' }}</td>
            <td class="bg-header">Tipo:</td>
            <td class="text-center">{{ data_get($resumen, 'materia.tipo') ?? '—' }}</td>
        </tr>
        <tr>
            <td class="bg-header">Núcleo:</td>
            <td colspan="3">{{ data_get($resumen, 'materia.nucleo') ?? '—' }}</td>
            <td class="bg-header">Práctica (Art. 57):</td>
            <td class="text-center">{{ data_get($resumen, 'materia.art57') ?? 'No' }}</td>
        </tr>
    </table>

    <table>
        <tr>
            <th colspan="2" class="section-title">Competencias del Perfil de Egreso del Programa Educativo</th>
        </tr>
        <tr>
            <td class="bg-header" width="20%">Genéricas</td>
            <td>
                <ul style="margin: 0; padding-left: 15px;">
                    @forelse(($competencias['genericas'] ?? []) as $item)
                        <li>{{ $stringify($item['competencia'] ?? $item['descripcion'] ?? null) }}</li>
                    @empty
                        <li>—</li>
                    @endforelse
                </ul>
            </td>
        </tr>
        <tr>
            <td class="bg-header">Específicas</td>
            <td>
                <ul style="margin: 0; padding-left: 15px;">
                    @forelse(($competencias['especificas'] ?? []) as $item)
                        <li>{{ $stringify($item['nombre'] ?? $item['descripcion'] ?? null) }}</li>
                    @empty
                        <li>—</li>
                    @endforelse
                </ul>
            </td>
        </tr>
        <tr>
            <td class="bg-header">Competencias del área de formación</td>
            <td>{{ $stringify($competencias['formacion'] ?? null) }}</td>
        </tr>
        <tr>
            <td class="bg-header">Competencia de la Unidad de Aprendizaje</td>
            <td>{{ $stringify($competencias['unidad'] ?? null) }}</td>
        </tr>
    </table>

    @if(!empty($subcompetencias))
        @foreach($subcompetencias as $index => $sub)
            <table style="margin-bottom: 0; border-bottom: none;">
                <tr>
                    <td class="bg-header" width="20%">Subcompetencia {{ $index + 1 }}</td>
                    <td><strong>{{ $sub['titulo'] ?? '—' }}</strong>: {{ $sub['descripcion'] ?? '' }}</td>
                </tr>
            </table>
            
            <table style="margin-top: 0;">
                <thead>
                    <tr>
                        <th width="15%">Temas / Subtemas</th>
                        <th width="35%">Actividades de Aprendizaje / Resultados</th>
                        <th width="25%">Evidencias / Evaluación</th>
                        <th width="25%">Recursos / Bibliografía</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <em>Contenido:</em><br>
                           {{-- Aquí puedes iterar si tienes 'temas' dentro de subcompetencia, si no, mostramos descripción general --}}
                           {{ $sub['temas'] ?? 'Consultar programa extendido.' }}
                        </td>

                        <td>
                            <strong>Actividades:</strong><br>
                            {{ $sub['actividades'] ?? '—' }}
                            <br><br>
                            <strong>Resultados:</strong><br>
                            {{ $sub['resultados'] ?? '—' }}
                        </td>

                        <td>
                            {{ $sub['evidencias'] ?? '—' }}
                        </td>

                        <td>
                            {{ $sub['recursos'] ?? '—' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        @endforeach
    @else
        <p class="text-center">No hay subcompetencias registradas.</p>
    @endif

    <table>
        <tr>
            <th colspan="4" class="section-title">Criterios de Evaluación</th>
        </tr>
        <tr class="bg-header">
            <td width="50%">Instrumento / Evidencia</td>
            <td width="20%">Ponderación</td>
            <td width="30%">Tipo</td>
        </tr>
        {{-- Combinamos las dos listas de evaluación --}}
        @foreach(array_merge($evalFinal, $evalCompetencias) as $inst)
            <tr>
                <td>{{ $inst['nombre'] ?? '—' }}</td>
                <td class="text-center">{{ $inst['porcentaje'] ?? '—' }}</td>
                <td class="text-center">
                    {{-- Determinar si es final o por competencia basado en el origen --}}
                    {{ in_array($inst, $evalFinal) ? 'Evaluación Final' : 'Por Competencias' }}
                </td>
            </tr>
        @endforeach
    </table>

    <table>
        <tr>
            <th colspan="5" class="section-title">Bibliografía Sugerida</th>
        </tr>
        <tr class="bg-header">
            <td>Título</td>
            <td>Autor</td>
            <td>Editorial</td>
            <td>Año</td>
            <td>Tipo</td>
        </tr>
        @forelse($bibliografia as $book)
            <tr>
                <td>{{ $book['titulo'] ?? '—' }}</td>
                <td>{{ $book['autor'] ?? $book['autores'] ?? '—' }}</td>
                <td>{{ $book['editorial'] ?? '—' }}</td>
                <td>{{ $book['anio'] ?? '—' }}</td>
                <td>{{ $book['tipo'] ?? '—' }}</td>
            </tr>
        @empty
            <tr><td colspan="5" class="text-center">Sin bibliografía registrada</td></tr>
        @endforelse
    </table>

    <table>
        <tr>
            <th class="section-title">Perfil del Docente</th>
        </tr>
        <tr>
            <td>
                <strong>Académicos:</strong><br>
                <ul style="margin-top:0;">
                    @forelse(($perfilDocente['academicos'] ?? []) as $item) <li>{{ $stringify($item) }}</li> @empty <li>—</li> @endforelse
                </ul>
                <strong>Profesionales:</strong><br>
                <ul style="margin-top:0;">
                    @forelse(($perfilDocente['profesionales'] ?? []) as $item) <li>{{ $stringify($item) }}</li> @empty <li>—</li> @endforelse
                </ul>
                <strong>Docentes:</strong><br>
                <ul style="margin-top:0;">
                    @forelse(($perfilDocente['docentes'] ?? []) as $item) <li>{{ $stringify($item) }}</li> @empty <li>—</li> @endforelse
                </ul>
            </td>
        </tr>
    </table>

    <br>
    <table style="margin-top: 20px;">
        <tr>
            <th colspan="2" class="section-title">Comité Curricular</th>
        </tr>
        @php($firmantes = $comite['firmantes'] ?? [])
        @forelse($firmantes as $rol => $persona)
            <tr>
                <td width="40%" class="bg-header">
                    {{ ucfirst(str_replace('_', ' ', $rol)) }}
                </td>
                <td height="40">
                    {{ $persona['display'] ?? '—' }} <br>
                    <span style="font-size: 8px; color: #777;">(Firma)</span>
                </td>
            </tr>
        @empty
            <tr><td colspan="2">Sin firmantes definidos.</td></tr>
        @endforelse
        <tr>
             <td class="bg-header">Fecha de elaboración/modificación:</td>
             <td>{{ $comite['fecha'] ?? now()->format('d/m/Y') }}</td>
        </tr>
    </table>

</body>
</html>