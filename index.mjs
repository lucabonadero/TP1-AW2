/* Requerimientos
Desarrollar una aplicación del lado del servidor que permita, a partir de un endpoint
(URL), crear un LOG del estado del servidor. Este LOG debe incluir:
● Fecha completa del reporte.
● Inicio de actividad del servidor (momento de encendido).
● El tiempo que el servidor estuvo activo.
● Información sobre los CPU.
● Memoria RAM total y memoria RAM utilizada .
● Las interfaces de red. */

import { writeFile } from 'node:fs/promises'
import os from 'node:os'
import http, { createServer, get } from 'node:http'
import { write } from 'node:fs'
import path from 'node:path'

const log = `
Fecha: ${new Date()}
Inicio de actividad del servidor: ${new Date()}
Tiempo activo: ${os.uptime()}
Información sobre los CPU: ${JSON.stringify(os.cpus())}
Memoria RAM total: ${os.totalmem()}
Memoria RAM utilizada: ${os.freemem()}
Interfaces de red: ${JSON.stringify(os.networkInterfaces())}
`

const dia = new Date()
const fechaNombre = dia.getDate()
const pathA = path.join(`D:/IES/3ERAÑO/TP1-AW2/Archivos/log(${fechaNombre}).txt`)

const sv = createServer((request, response)=>{
    const path = request.url
    const met = request.method
    writeFile(pathA, log, 'utf-8')
        .then(() => {
            console.log('Log creado');
            response.end('Log creado');
        })
        .catch((error) => {
            console.log(error);
            response.end('Error');
        });
})

sv.listen(3000);


    
