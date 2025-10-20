{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Tarifas por hora (en d\'f3lares)\
const tarifas = \{\
    auto: 5,\
    moto: 3\
\};\
\
// Arrays para datos\
let estacionados = JSON.parse(localStorage.getItem('estacionados')) || [];\
let historial = JSON.parse(localStorage.getItem('historial')) || [];\
\
// Funci\'f3n para ingresar veh\'edculo\
function ingresarVehiculo() \{\
    const placa = document.getElementById('placa').value.trim().toUpperCase();\
    const tipo = document.getElementById('tipo').value;\
    \
    if (placa === '') \{\
        alert('Ingresa una placa v\'e1lida');\
        return;\
    \}\
    \
    if (estacionados.some(v => v.placa === placa)) \{\
        alert('Este veh\'edculo ya est\'e1 estacionado');\
        return;\
    \}\
    \
    const vehiculo = \{\
        placa,\
        tipo,\
        entrada: new Date().toISOString()\
    \};\
    \
    estacionados.push(vehiculo);\
    guardarDatos();\
    renderizarListas();\
    document.getElementById('placa').value = '';\
\}\
\
// Funci\'f3n para salida y c\'e1lculo de cobro\
function salidaVehiculo(index) \{\
    const vehiculo = estacionados[index];\
    const salida = new Date();\
    const entrada = new Date(vehiculo.entrada);\
    \
    // Calcular tiempo en minutos\
    const tiempoMinutos = Math.ceil((salida - entrada) / (1000 * 60));\
    const horas = Math.ceil(tiempoMinutos / 60); // Redondeo hacia arriba por hora\
    \
    const tarifaHora = tarifas[vehiculo.tipo];\
    const cobro = horas * tarifaHora;\
    \
    const registro = \{\
        ...vehiculo,\
        salida: salida.toISOString(),\
        tiempoMinutos,\
        cobro\
    \};\
    \
    historial.push(registro);\
    estacionados.splice(index, 1);\
    guardarDatos();\
    renderizarListas();\
    \
    alert(`Veh\'edculo $\{vehiculo.placa\} ($\{vehiculo.tipo\})\\nTiempo: $\{tiempoMinutos\} minutos\\nCobro: $$\{cobro\}`);\
\}\
\
// Renderizar listas\
function renderizarListas() \{\
    const listaEstacionados = document.getElementById('listaEstacionados');\
    listaEstacionados.innerHTML = '';\
    \
    estacionados.forEach((v, index) => \{\
        const li = document.createElement('li');\
        li.innerHTML = `\
            <span>$\{v.placa\} - $\{v.tipo\} (Entrada: $\{new Date(v.entrada).toLocaleString()\})</span>\
            <button onclick="salidaVehiculo($\{index\})">Salida</button>\
        `;\
        listaEstacionados.appendChild(li);\
    \});\
    \
    const listaHistorial = document.getElementById('listaHistorial');\
    listaHistorial.innerHTML = '';\
    \
    historial.forEach(v => \{\
        const li = document.createElement('li');\
        li.innerHTML = `\
            <span>$\{v.placa\} - $\{v.tipo\} (Salida: $\{new Date(v.salida).toLocaleString()\}) - Cobro: $$\{v.cobro\}</span>\
        `;\
        listaHistorial.appendChild(li);\
    \});\
\}\
\
// Guardar en localStorage\
function guardarDatos() \{\
    localStorage.setItem('estacionados', JSON.stringify(estacionados));\
    localStorage.setItem('historial', JSON.stringify(historial));\
\}\
\
// Inicializar\
renderizarListas();}