// precioMaquina(componentes, precios): dado una lista de componentes y una lista de precios, devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.


const precioMaquina = (componentes, precios) => {
    

    const porComponente = precio => componentes.includes(precio.componente);
   
    const aPrecioTotal = (precioTotal, precio) => precioTotal + precio.precio
  

    return precios
    .filter(porComponente)
    .reduce(aPrecioTotal, 0)   
    
}

// console.log(precioMaquina(["Monitor GPRS 4000"], local.precios))

// antidadVentasComponente(componente, ventas): dado un componente y una lista de ventas, devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió.

const cantidadVentasComponente = (componente, ventas) => {
   
    const porComponente = (venta) => venta.componentes.includes(componente)

    return ventas.filter(porComponente).length;
}

// console.log(cantidadVentasComponente("Monitor GPRS 3000", local.ventas))

// vendedoraDelMes(mes, anio, local): dados dos parámetros numéricos (mes, anio) y un objeto local, devuelve el nombre de la vendedora que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const vendedoraDelMes = (mes, anio, local) => {

    const porMesYAnio = venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio;
    
    const porVendedora = (ventasTotal, ventaActual) => {
        const existe = ventasTotal.some(venta => venta.nombreVendedora=== ventaActual.nombreVendedora);

        if(!existe) {
            return [...ventasTotal, { nombreVendedora: ventaActual.nombreVendedora, ventasTotales: precioMaquina(ventaActual.componentes, local.precios) }]
        }
        else {
            return ventasTotal.map(venta => venta.nombreVendedora === ventaActual.nombreVendedora ? { ...venta, ventasTotales: venta.ventasTotales + precioMaquina(ventaActual.componentes, local.precios)} : venta);
        }
    }

    const porMayorImporte = (mayorVendedora, vendedora) => mayorVendedora.ventasTotales > vendedora.ventasTotales ? mayorVendedora.nombreVendedora : vendedora.nombreVendedora;
   
    return local.ventas.filter(porMesYAnio).reduce(porVendedora, []).reduce(porMayorImporte)
}
// console.log(vendedoraDelMes(2, 2019, local))

// ventasMes(mes, anio, local): obtiene el valor total de las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio, local) => {
    const porMesYAnio = venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio;
    

    const aTotalDelMes = (sumaParcial, venta) => sumaParcial + precioMaquina(venta.componentes, local.precios);
   


    return local.ventas.filter(porMesYAnio).reduce(aTotalDelMes, 0)
}

// console.log(ventasMes(1, 2019, local))

// ventasVendedora(nombre, local): obtiene el valor total de todas las ventas realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre, local) => {
    const porVendedora = venta => venta.nombreVendedora === nombre;
    
    const aTotalPorVendedora = (sumaParcial, venta) => sumaParcial + precioMaquina(venta.componentes, local.precios);

    return local.ventas.filter(porVendedora).reduce(aTotalPorVendedora, 0)
}

// console.log(ventasVendedora("Ada", local))

// componenteMasVendido(local): devuelve el nombre del componente que más cantidad de ventas tuvo históricamente en un local. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = local => {


    const aComponentes = precio => precio.componente;

    const aCantidades = (cantidadesParciales, componenteActual) => {
        cantidadesParciales =  {...cantidadesParciales,  [componenteActual]: cantidadVentasComponente(componenteActual, local.ventas)};
        return cantidadesParciales
    }

    const porMasVendido = (masVendido, componente) => ventasPorComponente[masVendido] > ventasPorComponente[componente] ? masVendido : componente;

    const ventasPorComponente = local.precios.map(aComponentes).reduce(aCantidades, {});

    return Object.keys(ventasPorComponente).reduce(porMasVendido);

}

// console.log(componenteMasVendido(local))


// huboVentas(mes, anio, ventas): indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio, ventas) => {
    const porMesYAnio = venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio;
    
    return ventas.some(porMesYAnio);
}

// console.log(huboVentas(3, 2019, local.ventas));


// ventasSucursal(sucursal, local): obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (sucursal, local) => {
    const porSucursal = venta => venta.sucursal === sucursal;
   
    const aTotalPorSucursal = (sumaParcial, venta) => sumaParcial + precioMaquina(venta.componentes, local.precios);

    return local.ventas.filter(porSucursal).reduce(aTotalPorSucursal, 0)
}

// console.log(ventasSucursal("Centro", local));

/*UNIFICACION DE FUNCIONES*/
// Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const ventasPorParametroAMedir = (parametro, valor, local) => {

    const porParametro = venta => venta[parametro] === valor;
   
    const aTotalPorParametro = (sumaParcial, venta) => sumaParcial + precioMaquina(venta.componentes, local.precios);

    return local.ventas.filter(porParametro).reduce(aTotalPorParametro, 0);
}

// console.log(ventasPorParametroAMedir("vendedora", "Ada", local));

// sucursalDelMes(mes, anio, local): dado dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio, local) => {
    const porMesYAnio = venta => venta.fecha.getMonth() === mes-1 && venta.fecha.getFullYear() === anio;

    const porSucursal = (ventasTotal, ventaActual) => {
        const existe = ventasTotal.some(venta => venta.sucursal === ventaActual.sucursal);

        if(!existe) {
            return [...ventasTotal, { sucursal: ventaActual.sucursal, ventasTotales: precioMaquina(ventaActual.componentes, local.precios) }]
        }
        else {
            return ventasTotal.map(venta => venta.sucursal === ventaActual.sucursal ? { ...venta, ventasTotales: venta.ventasTotales + precioMaquina(ventaActual.componentes, local.precios)} : venta);
        }
    }

    const porMayorImporte = (sucursalMasVendedora, ventas) => sucursalMasVendedora.ventasTotales > ventas.ventasTotales ? sucursalMasVendedora.sucursal : ventas.sucursal;
    

    const totalVentasPorSucursal = local.ventas.filter(porMesYAnio).reduce(porSucursal, [])

    if (totalVentasPorSucursal.length > 1) {
       return totalVentasPorSucursal.reduce(porMayorImporte)
    }
    else {
        return totalVentasPorSucursal[0].sucursal
    }
}


// console.log(sucursalDelMes(1, 2019, local))

// renderPorMes(local): Muestra una lista ordenada del importe total vendido por cada mes/año, p. ej. (los mostrados datos no son los resultados reales):

// Ventas por mes:
//    Total de enero 2019: XXXX
//    Total de febrero 2019: XXXX




const renderPorMes = local => {
    let mensaje = "Ventas por mes:"

    const aArrayDeFechas = (arrayTotal, venta) => {
        const { fecha } = venta;
        const existeAnioyMes = arrayTotal.some(v => fecha.getFullYear() === v.anio && fecha.getMonth() === v.mes);

        if (!existeAnioyMes) {
            return [...arrayTotal, { mes: fecha.getMonth(), anio: fecha.getFullYear()}]
        }
        else {
            return arrayTotal;
        }
    }

    const porTotalVentas = fecha => {
       fecha = {...fecha, totalVenta: ventasMes(fecha.mes + 1, fecha.anio, local)};

       return fecha
    }

    const porOrdendeFecha = (a, b) => {
        return a.mes - b.mes;
    }

    const arrayDeFechas = local.ventas.reduce(aArrayDeFechas, []).map(porTotalVentas).sort(porOrdendeFecha)


    const arrayDeMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    for (const fecha of arrayDeFechas) {
        mensaje += ` \n- Total de ${arrayDeMeses[fecha.mes]} ${fecha.anio}: $${fecha.totalVenta}`
    }

    return mensaje
} 
 
// console.log(renderPorMes(local))

// renderPorSucursal(local): Muestra una lista del importe total vendido por cada sucursal, p. ej. (los datos mostrados no son los resultados reales):
// Ventas por sucursal:
// ----------------------------
//   - Total de Centro: 4195
//   - Total de Caballito: 1265

const renderPorSucursal = local => {
    let mensaje = `Ventas por sucursal:`
   


    const aArrayDeSucursales = (arrayTotal, venta) => {
        const { sucursal: sucursalVenta } = venta;

        const existeSucursal = arrayTotal.some(v => sucursalVenta === v.sucursal);

        if (!existeSucursal) {
            return [...arrayTotal, { sucursal: sucursalVenta, totalVentas: ventasSucursal(sucursalVenta, local)}];
        }
        else {
            return arrayTotal;
        }
    }

    const arrayDeSucursales = local.ventas.reduce(aArrayDeSucursales, []);
    
    for (const sucursal of arrayDeSucursales) {
        mensaje += `\n- Total de ${sucursal.sucursal}: $${sucursal.totalVentas}`
    }
    return mensaje

}

// console.log(renderPorSucursal(local))

// render(local): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó, p. ej. (los datos mostrados no son los resultados reales):
// Reporte
// ==========================================
//  Ventas por mes:
//   - Total de enero 2019: 1250
//   - Total de febrero 2019: 4210
// ------------------------------------------
//  Ventas por sucursal:
//   - Total de Centro: 4195
//   - Total de Caballito: 1265
// ------------------------------------------
//  Producto estrella: Monitor GPRS 3000
// ------------------------------------------ 
//  Vendedora que más ingresos generó: Grace

const render = local => {
    let mensaje = `Reporte
    \n==========================================
    \n${renderPorMes(local)}
    \n------------------------------------------
    \n${renderPorSucursal(local)}
    \n------------------------------------------
    \nProducto estrella: ${componenteMasVendido(local)}
    \n------------------------------------------
`

    const aArrayDeVendedoras = (arrayTotal, venta) => {
        const { nombreVendedora } = venta;

        const existeVendedora = arrayTotal.some(v => nombreVendedora === v.nombreVendedora);

        if (!existeVendedora) {
            return [...arrayTotal, { vendedora: nombreVendedora, totalVentas: ventasVendedora(nombreVendedora, local)}];
        }
        else {
            return arrayTotal;
        }
    }
        const aVendedoraConMasVentas = (masVentas, venta) => {
       return masVentas.totalVentas > venta.TotalVentas ? masVentas.vendedora : venta.vendedora;
    }

    const mejorVendedora = local.ventas.reduce(aArrayDeVendedoras, []).reduce(aVendedoraConMasVentas)

    mensaje += `\nVendedora que más ingresos generó: ${mejorVendedora}`

    return mensaje 
}

// console.log(render(local))