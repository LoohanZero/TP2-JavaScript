# Trabajo Práctico 2 - JS

## A tener en cuenta

- Usar métodos de array en lo posible: `map`, `filter`, `reduce`, `sort`, `some`, `every`, `find`.
- Los métodos no deben modificar los objetos que se les pasan por argumentos.
- Realizar test para cada función. No olvidarse de testear:
    - Varios casos positivos
    - Casos neutros (datos vacíos)
    - Casos excepcionales
    - Casos negativos o de error
    - Tipos de datos devueltos
    - Que los objetos no se modifiquen
- Investigar el objeto `Date`, cómo crear fechas y métodos para obtener datos (día, mes y año). Tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre) y en los ejercicios se pide ingresar los valores del 1 al 12.    

## Local de ventas de PCs

Una empresa de venta de computadoras está desarrollando un sistema para llevar registro de ventas. Para ello cuenta con la siguiente información:

  * Lista de las vendedoras de la empresa
  * Lista de ventas. Un array con objetos. Cada objeto representa una venta y tiene las propiedades `fecha`, `nombreVendedora` (un String con el nombre), `componentes` (un array Strings con el nombre de cada componente vendido).
  * Lista de precios de los componentes, de la forma (nombre componente, precio).

```js
const local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],
  sucursales: ['Centro', 'Caballito'],
  ventas: [
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" },
    { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" },
    { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" },
    { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard ASUS 1200", "RAM Quinston"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
    { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard ASUS 1200", "HDD Wezter Dishital"], sucursal: "Centro" },
    { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" },
    { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" }
  ],
  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};
```

Se pide desarrollar las siguientes funciones

* **precioMaquina(componentes, precios)**: dado una lista de componentes y una lista de precios, devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

* **cantidadVentasComponente(componente, ventas)**: dado un componente y una lista de ventas, devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió.

* **vendedoraDelMes(mes, anio, local)**: dados dos parámetros numéricos (`mes`, `anio`) y un objeto `local`, devuelve el nombre de la vendedora que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

* **ventasMes(mes, anio, local)**: obtiene el valor total de las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

* **ventasVendedora(nombre, local)**: obtiene el valor total de todas las ventas realizadas por una vendedora sin límite de fecha.

* **componenteMasVendido(ventas)**: dada una lista de ventas, devuelve el nombre del componente que más cantidad de ventas tuvo históricamente. El dato de la cantidad de ventas es el que indica la función `cantidadVentasComponente`

* **huboVentas(mes, anio, ventas)**: indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

* **ventasSucursal(sucursal, local)**: obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

* Las funciones **ventasSucursal** y **ventasVendedora** tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

* **sucursalDelMes(mes, anio, local)**: dado dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

* **renderPorMes(local)**: Muestra una lista ordenada del importe total vendido por cada mes/año, p. ej. (los mostrados datos no son los resultados reales):

```
Ventas por mes:
   Total de enero 2019: XXXX
   Total de febrero 2019: XXXX
```

* **renderPorSucursal(local)**: Muestra una lista del importe total vendido por cada sucursal, p. ej. (los datos mostrados no son los resultados reales):

```
Ventas por sucursal:
----------------------------
  - Total de Centro: 4195
  - Total de Caballito: 1265
```

* **render(local)**: Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó, p. ej. (los datos mostrados no son los resultados reales):

```
Reporte
==========================================
 Ventas por mes:
  - Total de enero 2019: 1250
  - Total de febrero 2019: 4210
------------------------------------------
 Ventas por sucursal:
  - Total de Centro: 4195
  - Total de Caballito: 1265
------------------------------------------
 Producto estrella: Monitor GPRS 3000
------------------------------------------ 
 Vendedora que más ingresos generó: Grace
```
