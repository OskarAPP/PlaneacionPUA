<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Programa de Unidad Académica</title>
    <style>
        /* Define la configuración de la página para Dompdf */
        @page {
            size: letter landscape;
            margin: 2.5cm 1.5cm 2cm 1.5cm; /* Ajusta márgenes para cabecera/pie */
        }

        /* Estilos generales del cuerpo del documento */
        body {
            font-family: Arial, sans-serif; /* Se usa Arial por compatibilidad, DejaVu Sans es una buena alternativa si está instalada */
            font-size: 10px;
            color: #000;
        }

        /* Contenedor principal y tablas */
        .page-container { width: 100%; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #000; padding: 4px 6px; vertical-align: top; text-align: left; word-wrap: break-word; }
        .no-border { border: none !important; } /* Utilidad para quitar bordes */

        /* Estilos de celdas con fondo gris */
        .header-gray { background-color: #e6e6e6; font-weight: bold; }
        .left-col-header { background-color: #e6e6e6; font-weight: bold; width: 45%; }
        .competencies-table .col1 { width: 25%; background-color: #e6e6e6; font-weight: bold; }
        .full-width-header { background-color: #e6e6e6; font-weight: bold; text-align: center; }

        /* Checkbox */
        .checkbox { display: inline-block; width: 12px; height: 12px; border: 1px solid #000; text-align: center; line-height: 12px; font-weight: bold; vertical-align: middle; }

        /* Encabezado y Pie de página */
        #header, #footer {
            position: fixed;
            left: 0;
            right: 0;
            width: 100%;
        }
        #header { top: -2.2cm; }
        #footer { bottom: -1.8cm; font-size: 9px; }
        .header-table, .footer-table { width: 100%; }
        .header-title {
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            vertical-align: middle;
        }
        .logo { width: 60px; vertical-align: middle; }

    </style>
</head>
<body>

    <!-- ENCABEZADO FIJO -->
    <div id="header">
        <table class="header-table no-border">
            <tr>
                <td class="no-border" style="width: 10%;">
                    <!-- Logo de la Universidad (Embebido en Base64 para evitar problemas de rutas) -->
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARFSURBVHhe7Z1/aBNhGMf/9+221rZt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt2..."/>
                </td>
                <td class="no-border header-title">
                    Programa de Unidad Académica
                </td>
            </tr>
        </table>
    </div>

    <!-- PIE DE PÁGINA FIJO -->
    <div id="footer">
        <table class="footer-table no-border">
            <tr>
                <td class="no-border" style="text-align: left; width: 33%;">R00/2014</td>
                <td class="no-border" style="text-align: center; width: 33%;">Página 1 de 13</td>
                <td class="no-border" style="text-align: right; width: 33%;">R-DES-15</td>
            </tr>
        </table>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="page-container">

        <!-- Sección superior en 2 columnas -->
        <table class="no-border" style="margin-bottom:12px;">
            <tr class="no-border">
                <!-- Columna Izquierda -->
                <td class="no-border" style="width: 50%; padding-right: 8px; vertical-align: top;">
                    <table class="left-col">
                        <tr>
                            <td class="left-col-header">Nombre de la Facultad o Escuela</td>
                            <td>Facultad de Ingeniería</td>
                        </tr>
                        <tr>
                            <td class="left-col-header">Nombre del Programa Educativo</td>
                            <td>Ingeniero en Tecnologías de Software</td>
                        </tr>
                        <tr>
                            <td class="left-col-header">Plan de Estudio:</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <td class="left-col-header">Nombre de la academia(s) que lo aprobó (aron):</td>
                            <td>Academia de Tecnología de software</td>
                        </tr>
                    </table>
                </td>

                <!-- Columna Derecha -->
                <td class="no-border" style="width: 50%; padding-left: 8px; vertical-align: top;">
                    <table>
                        <tr>
                            <td class="header-gray" colspan="4">Nombre de la Unidad de Aprendizaje:</td>
                        </tr>
                        <tr>
                            <td colspan="4">Computo en la nube</td>
                        </tr>
                        <tr style="text-align:center;">
                            <td class="header-gray">Créditos:</td>
                            <td class="header-gray">Horas totales:</td>
                            <td class="header-gray">Horas teóricas:</td>
                            <td class="header-gray">Horas prácticas:</td>
                        </tr>
                        <tr style="text-align:center;">
                            <td>4</td>
                            <td>4</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                         <tr style="text-align:center;">
                            <td class="header-gray">Área:</td>
                            <td class="header-gray">Núcleo:</td>
                            <td class="header-gray" colspan="2">Tipo:</td>
                        </tr>
                        <tr>
                            <td style="text-align:left;">Ciencia de la Ingeniería</td>
                            <td style="text-align:left;">sustantivo</td>
                            <td style="text-align:left;" colspan="2">obligatoria</td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                Unidad de Aprendizaje práctica de acuerdo al art. 57 RGA:
                                <span style="margin-left: 40px;">Si: <span class="checkbox"></span></span>
                                <span style="margin-left: 20px;">No: <span class="checkbox">x</span></span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <!-- Tabla de Competencias -->
        <table class="competencies-table">
            <thead>
                <tr>
                    <th colspan="2" class="full-width-header">Competencias del Perfil de Egreso del Programa Educativo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="col1">Genéricas</td>
                    <td>La utilización de las TICs en el ámbito profesional Habilidades cognitivas. Capacidades metodológicas. Capacidad de organización. habilidades de investigación</td>
                </tr>
                <tr>
                    <td class="col1">Específicas</td>
                    <td>Administra proyectos de tecnologías de software emergente, trabajando eficientemente en equipos multidisciplinarios con estricto apego al respeto de las personas y sus diferentes opiniones.
                    <br><br>
                    Diseña, desarrolla y administra sistemas que utilicen bancos de información y datos conforme a requerimientos definidos y normas organizacionales de manejo y seguridad de la información, apoyando el procesamiento analítico de la información para apoyar la toma de decisiones.</td>
                </tr>
                <tr>
                    <td class="col1">Competencias del área de formación</td>
                    <td rowspan="2">Construir programas y sistemas de cómputo para resolver problemas lógico-computacionales que requieren de desarrollos en nubes informáticas.</td>
                </tr>
                <tr>
                    <td class="col1">Competencia de la Unidad de Aprendizaje</td>
                </tr>
            </tbody>
        </table>

    </main>

</body>
</html>
