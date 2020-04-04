describe("precioMaquina()", (componentes, precios) => {
    it("Debería devolver un número cuando se le pasan los parámetros componentes y precios", () => {
        componentes = ["Monitor GPRS 3000", "RAM Quinston Fury"];
        precios = local.precios;

        const resultado = precioMaquina(componentes, precios);
        expect(resultado).to.be.finite;
    })
    it("Debería devolver 350 cuando se le pasan los componentes Monitor ASC 543 y Motherboard ASUS 1200 y los precios", () => {
        componentes = ["Monitor ASC 543", "Motherboard ASUS 1200"];
        precios = local.precios;

        const resultado = precioMaquina(componentes, precios);
        expect(resultado).to.equal(350);
    })
    it("Debería devolver 340 cuando se le pasan los componentes RAM Quinston Fury y RAM Quinston y los precios", () => {
        componentes = [ "RAM Quinston Fury","RAM Quinston"];
        precios = local.precios;

        const resultado = precioMaquina(componentes, precios);
        expect(resultado).to.equal(340);
    })
    it("Debería devolver cero cuando el componente no existe en el listado de precios del local", () => {
        componentes = ["Monitor GPRS 4000"];
        precios = local.precios;
        
        const resultado = precioMaquina(componentes, precios)
        expect(resultado).to.equal(0);
    })
    it("Debería devolver un error cuando no se le pasa el parámetro componentes", () => {
        precios = local.precios;

        const fn = () => precioMaquina(precios);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el parámetro precios", () => {
        componentes = [ "RAM Quinston Fury","RAM Quinston"];

        const fn = () => precioMaquina(componentes);
        expect(fn).to.throw();
    })
  
    it("El objeto precios debería ser igual antes y después de ejecutar la función", () => {
        componentes = ["Monitor GPRS 3000", "RAM Quinston Fury"];
        const preciosOriginal = [
            { componente: "Monitor GPRS 3000", precio: 200 },
            { componente: "Motherboard ASUS 1500", precio: 120 },
            { componente: "Monitor ASC 543", precio: 250 },
            { componente: "Motherboard ASUS 1200", precio: 100 },
            { componente: "Motherboard MZI", precio: 30 },
            { componente: "HDD Toyiva", precio: 90 },
            { componente: "HDD Wezter Dishital", precio: 75 },
            { componente: "RAM Quinston", precio: 110 },
            { componente: "RAM Quinston Fury", precio: 230 }
          ];
          const preciosCopia = deepcopy(preciosOriginal);

        precioMaquina(componentes, preciosOriginal);

        expect(preciosOriginal).to.deep.eql(preciosCopia);
    })
})


describe("cantidadVentasComponente()", (componente, ventas) => {
    it("Debería devolver un número cuando se le pasan los parámetros Monitor GPRS 3000 y el array de ventas", () => {
        componente = "Monitor GPRS 3000";
        ventas = local.ventas;

        const resultado = cantidadVentasComponente(componente, ventas);
        expect(resultado).to.be.finite;
    })

    it("Debería devolver el número 5 cuando se le pasan los parámetros Monitor ASC 543 y el array de ventas", () => {
        componente = "Monitor ASC 543";
        ventas = local.ventas;

        const resultado = cantidadVentasComponente(componente, ventas);
        expect(resultado).to.equal(5);
    })

    it("Debería devolver el número 4 cuando se le pasan los parámetros HDD Wezter Dishital y el array de ventas", () => {
        componente = "HDD Wezter Dishital";
        ventas = local.ventas;

        const resultado = cantidadVentasComponente(componente, ventas);
        expect(resultado).to.equal(4);
    })
    it("Debería devolver cero cuando el componente no existe en el listado de precios del local", () => {
        componente = "Monitor GPRS 4000";
        ventas = local.ventas;
        
        const resultado = cantidadVentasComponente(componente, ventas)
        expect(resultado).to.equal(0);
    })
    it("Debería devolver un error cuando no se le pasa el parámetro componente", () => {
        ventas = local.ventas;

        const fn = () => cantidadVentasComponente(ventas);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el parámetro ventas", () => {
        componente = "RAM Quinston Fury";

        const fn = () => cantidadVentasComponente(componente);
        expect(fn).to.throw();
    })   
    it("El objeto de las ventas debería ser igual antes y después de ejecutar la función", () => {
        componente = "Motherboard ASUS 1500";
        const ventaOriginal = [
            { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
            { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
            { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" }]
        const ventaCopia = deepcopy(ventaOriginal);

        cantidadVentasComponente(componente, ventaOriginal);

        expect(ventaOriginal).to.deep.eql(ventaCopia);
    })

})



describe("vendedoraDelMes()", (mes, anio, dataLocal) => {
    it("Debería devolver el nombre de la vendedora en un string al pasarle el mes y año de las ventas y el parámetro local", () => {
    mes = 1;
    anio = 2019; 
    dataLocal = local;

    const resultado = vendedoraDelMes(mes, anio, dataLocal);
    expect(resultado).to.be.a("string");
    })
    it("Debería devolver el nombre Ada cuando se le pasan el mes 1 y el año 2019 de las ventas y el parámetro local", () => {
        mes = 1;
        anio = 2019; 
        dataLocal = local;

        const resultado = vendedoraDelMes(mes, anio, dataLocal);
        expect(resultado).to.equal("Ada");
    })

    it("Debería devolver el nombre Ada cuando se le pasan el mes 2 y el año 2019 de las ventas y el parámetro local", () => {
        mes = 2;
        anio = 2019; 
        dataLocal = local;

        const resultado = vendedoraDelMes(mes, anio, dataLocal);
        expect(resultado).to.equal("Ada");
    })
    it("Debería devolver error cuando se le pasan el mes 7 y el año 2019 de las ventas y el parámetro local", () => {
        mes = 7;
        anio = 2019; 
        dataLocal = local;

        const fn = () => vendedoraDelMes(mes, anio, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando se le pasan el mes 2 y el año 2020 de las ventas y el parámetro local", () => {
        mes = 2;
        anio = 2020; 
        dataLocal = local;

        const fn = () => vendedoraDelMes(mes, anio, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando se le pasan el mes 1 y el año 2019 de las ventas y se le pasa el parámetro local", () => {
        mes = 1;
        anio = 2019; 

        const fn = () => vendedoraDelMes(mes, anio);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando se le pasan el mes 1, no se le pasa el año de las ventas y se le pasa el parámetro local", () => {
        mes = 1; 
        dataLocal = local;

        const fn = () => vendedoraDelMes(mes, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando no se le pasa el mes y se le pasa el año como 2019 de las ventas y le pasamos el parámetro local", () => {
        anio = 2019; 
        dataLocal = local;

        const fn = () => vendedoraDelMes(anio, dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto del local debería ser igual antes y después de ejecutar la función", () => {
        mes = 1; 
        anio = 2019; 
        localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        vendedoraDelMes(mes, anio, localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})

describe("ventasMes()", (mes, anio, dataLocal) => {
    it("Debería devolver el monto total de ventas del mes 01 del año 2019 como un número", () => {
    mes = 1;
    anio = 2019; 
    dataLocal = local;

    const resultado = ventasMes(mes, anio, dataLocal);
    expect(resultado).to.be.finite;
    })
    it("Debería devolver 1250 cuando se le pasan el mes 1 y el año 2019 de las ventas y el parámetro local", () => {
        mes = 1;
        anio = 2019; 
        dataLocal = local;

        const resultado = ventasMes(mes, anio, dataLocal);
        expect(resultado).to.equal(1250);
    })

    it("Debería devolver 4420 cuando se le pasan el mes 2 y el año 2019 de las ventas y el parámetro local", () => {
        mes = 2;
        anio = 2019; 
        dataLocal = local;

        const resultado = ventasMes(mes, anio, dataLocal);
        expect(resultado).to.equal(4420);
    })
    it("Debería devolver cero cuando se le pasan el mes 6 y el año 2019 de las ventas y el parámetro local", () => {
        mes = 6;
        anio = 2019; 
        dataLocal = local;

        const resultado = ventasMes(mes, anio, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver cero cuando se le pasan el mes 2 y el año 2021 de las ventas y el parámetro local", () => {
        mes = 2;
        anio = 2021; 
        dataLocal = local;

        const resultado = ventasMes(mes, anio, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver error cuando se le pasan el mes 2 y el año 2019 de las ventas y no se le pasa el parámetro local", () => {
        mes = 2;
        anio = 2019; 

        const fn = () => ventasMes(mes, anio);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando se le pasa el mes 2, no se le pasa el año de las ventas y se le pasa el parámetro local", () => {
        mes = 2; 
        dataLocal = local;

        const fn = () => ventasMes(mes, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando no se le pasa el mes y el año que se le pasa es 2019 de las ventas y le pasamos el parámetro local", () => {
        anio = 2019; 
        dataLocal = local;
        const fn = () => ventasMes(anio, dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto del local debería ser igual antes y después de ejecutar la función", () => {
        mes = 1; 
        anio = 2019; 
        localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        ventasMes(mes, anio, localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})


describe("ventasVendedora()", (nombre, dataLocal) => {
    it("Debería devolver el monto total de ventas de la vendedora Ada, en número ", () => {
        nombre = "Ada"; 
        dataLocal = local;

        const resultado = ventasVendedora(nombre, dataLocal);
        expect(resultado).to.be.finite;
    })
    it("Debería devolver 1750 cuando se le pasa el nombre Ada como parámetro y el parámetro local", () => {
        nombre = "Ada"; 
        dataLocal = local;

        const resultado = ventasVendedora(nombre, dataLocal);
        expect(resultado).to.equal(1750);
    })

    it("Debería devolver 1970 cuando se le pasa el nombre Grace como parámetro y el parámetroe local", () => {
        nombre = "Grace"; 
        dataLocal = local;

        const resultado = ventasVendedora(nombre, dataLocal);
        expect(resultado).to.equal(1970);
    })
    it("Debería devolver cero cuando se le pasa un nombre inexistente de una vendedora y el parámetro local", () => {
        nombre = "Juana"; 
        dataLocal = local;

        const resultado = ventasVendedora(nombre, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver error cuando se le pasa el nombre de la vendedora (Ada) y no se le pasa el parámetro local", () => {
        nombre = "Ada"; 

        const fn = () => ventasVendedora(nombre);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando no se le pasa el nombre de la vendedora y se le pasa el parámetro local", () => {
        dataLocal = local;

        const fn = () => ventasVendedora(dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto del local debería ser igual antes y después de ejecutar la función", () => {
        nombre = "Ada"
        localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        ventasVendedora(nombre, localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})

describe("componenteMasVendido()", (dataLocal) => {
    it("Debería devolver el nombre del componente más vendido como un string", () => {
    dataLocal = local;

    const resultado = componenteMasVendido(dataLocal);
    expect(resultado).to.be.a("string");
    })
    it("Debería devolver Motherboard ASUS 1200 como componente más vendido cuando se le pasa el parámetro local", () => {
        dataLocal = local;

        const resultado = componenteMasVendido(dataLocal);
        expect(resultado).to.equal("Motherboard ASUS 1200");
    })

    it("Debería devolver error cuando no se le pasa el parámetro local", () => { 

        const fn = () => componenteMasVendido();
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un número", () => {
        dataLocal = 4;

        const fn = () => componenteMasVendido(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un objeto vacío", () => {
        dataLocal = {};

        const fn = () => componenteMasVendido(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un string", () => {
        dataLocal = "Más adelante muchas sorpresas te esperan, mi querido padawan";

        const fn = () => componenteMasVendido(dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto del local debería ser igual antes y después de ejecutar la función", () => {
        localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        componenteMasVendido(localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})

describe("huboVentas()", (mes, anio, ventas) => {
    it("Debería devolver un booleano", () => {
        mes = 1;
        anio = 2019;
        ventas = local.ventas;

        const resultado = huboVentas(mes, anio, ventas);
        expect(resultado).to.be.a("boolean");
    })
    it("Debería devolver true cuando se le pasan el mes 1 y el año 2019 de las ventas y el parámetro ventas", () => {
        mes = 1;
        anio = 2019;
        ventas = local.ventas;

        const resultado = huboVentas(mes, anio, ventas);
        expect(resultado).to.be.true;
    })
    it("Debería devolver false cuando se le pasan el mes 1 y el año 2020 de las ventas y el parámetro ventas", () => {
        mes = 1;
        anio = 2020;
        ventas = local.ventas;

        const resultado = huboVentas(mes, anio, ventas);
        expect(resultado).to.be.false;
    })
    it("Debería devolver error cuando se le pasan el mes 1 y el año 2019 de las ventas y no se le pasa el parámetro ventas", () => {
        mes = 1;
        anio = 2019;

        const fn = () => huboVentas(mes, anio);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando no se le pasa el parámetro mes, y se le pasa el año 2019 de las ventas y el parámetro ventas", () => {
        ventas = local.ventas;
        anio = 2019;

        const fn = () => huboVentas(anio, ventas);
        expect(fn).to.throw();
    })
    it("Debería devolver error cuando se le pasa como parámetros mes 1 y ventas y no se le pasa el parámetro año", () => {
        ventas = local.ventas;
        mes = 1;

        const fn = () => huboVentas(mes, ventas);
        expect(fn).to.throw();
    })
    it("El objeto de ventas debería ser igual antes y después de ejecutar la función", () => {
        mes = 1; 
        anio = 2019; 
        ventasOriginal = local.ventas;
        const ventasCopia = deepcopy(ventasOriginal);

        huboVentas(mes, anio, ventasOriginal);

        expect(ventasOriginal).to.deep.eql(ventasCopia);
    })
})

describe("ventasSucursal()", (sucursal, dataLocal) => {
    it("Debería devolver un número cuando se le pasan los parámetros sucursal y local", () => {
        sucursal = "Centro"
        dataLocal = local;

        const resultado = ventasSucursal(sucursal, dataLocal);
        expect(resultado).to.be.finite;
    })
    it("Debería devolver 4405 cuando se le pasa la sucursal Centro y el parámetro del local", () => {
        sucursal = "Centro"
        dataLocal = local;

        const resultado = ventasSucursal(sucursal, dataLocal);
        expect(resultado).to.equal(4405);
    })
    it("Debería devolver 1265 cuando se le pasa la sucursal Caballito y el parámetro del local", () => {
        sucursal = "Caballito"
        dataLocal = local;

        const resultado = ventasSucursal(sucursal, dataLocal);
        expect(resultado).to.equal(1265);
    })
    it("Debería devolver cero cuando la sucursal no existe", () => {
        sucursal = "Caballitossss"
        dataLocal = local;

        const resultado = ventasSucursal(sucursal, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver cero cuando a la sucursal se le pasa como parámetro un número", () => {
        sucursal = 4;
        dataLocal = local;

        const resultado = ventasSucursal(sucursal, dataLocal);
        expect(resultado).to.equal(0);
    })
  
    it("Debería devolver un error cuando no se le pasa el parámetro sucursal", () => {
        dataLocal = local;

        const fn = () => ventasSucursal(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el parámetro local", () => {
        sucursal = "Caballito"

        const fn = () => ventasSucursal(sucursal);
        expect(fn).to.throw();
    })
    it("El objeto local debería ser igual antes y después de ejecutar la función", () => {
        sucursal = "Centro"
        localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        ventasSucursal(sucursal, localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})


describe("ventasPorParametroAMedir()", (parametro, valor, dataLocal) => {
    it("Debería devolver un número cuando se le pasan los parámetros sucursal, Centro y local", () => {
        parametro = "sucursal";
        valor = "Centro"
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.be.finite;
    })
    it("Debería devolver un número cuando se le pasan los parámetros nombreVendedora, Ada y local", () => {
        parametro = "nombreVendedora";
        valor = "Ada"
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.be.finite;
    })
    it("Debería devolver 4405 cuando se le pasa la sucursal Centro y el parámetro del local", () => {
        parametro = "sucursal";
        valor = "Centro";
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.equal(4405);
    })
    it("Debería devolver 1750 cuando se le pasa el parámetro nombreVendedora, el valor Ada y el parámetro local", () => {
        parametro = "nombreVendedora";
        valor = "Ada"; 
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.equal(1750);
    })
    it("Debería devolver cero cuando la sucursal no existe", () => {
        parametro = "sucursal"
        valor = "Caballitossss"
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver cero cuando la vendedora no existe", () => {
        parametro = "nombreVendedora"
        valor = "Marcela"
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver cero cuando al valor del nombre de la sucursal se le pasa como parámetro un número", () => {
        parametro = "sucursal"
        valor = 4;
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.equal(0);
    })
    it("Debería devolver cero cuando al valor del nombre de la vendedora se le pasa como parámetro un número", () => {
        parametro = "nombreVendedora"
        valor = 4;
        dataLocal = local;

        const resultado = ventasPorParametroAMedir(parametro, valor, dataLocal);
        expect(resultado).to.equal(0);
    })
  
    it("Debería devolver un error cuando no se le pasa el parámetro 'parámetro'", () => {
        valor = "Ada";
        dataLocal = local;

        const fn = () => ventasPorParametroAMedir(valor, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el valor del parámetro", () => {
        parametro = "sucursal";
        dataLocal = local;

        const fn = () => ventasPorParametroAMedir(parametro, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el parámetro local", () => {
        parametro = "sucursal";
        valor = "Centro";

        const fn = () => ventasSucursal(parametro, valor);
        expect(fn).to.throw();
    })
    it("El objeto local debería ser igual antes y después de ejecutar la función", () => {
        parametro = "nombreVendedora"
        valor = "Ada";
        localOriginal = local;

        const localCopia = deepcopy(localOriginal);

        ventasPorParametroAMedir(parametro, valor, localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})

describe("sucursalDelMes()", (mes, anio, dataLocal) => {
    it("Debería devolver un string", () => {
        mes = 01;
        anio = 2019;
        dataLocal = local;

        const resultado = sucursalDelMes(mes, anio, dataLocal);
        expect(resultado).to.be.a("string");
    })
    it("Debería devolver la sucursal Centro cuando se le pasa el mes 01 y el año 2019", () => {
        mes = 01;
        anio = 2019;
        dataLocal = local;

        const resultado = sucursalDelMes(mes, anio, dataLocal);
        expect(resultado).to.equal("Centro");
    })
    it("Debería devolver la sucursal Centro cuando se le pasa el mes 02 y el año 2019", () => {
        mes = 02;
        anio = 2019;
        dataLocal = local;

        const resultado = sucursalDelMes(mes, anio, dataLocal);
        expect(resultado).to.equal("Centro");
    })
    it("Debería devolver error cuando se le pasa un año en el que no hay ventas: 2020", () => {
        mes = 02;
        anio = 2020;
        dataLocal = local;

        const fn = () => sucursalDelMes(mes, anio, dataLocal);
        expect(fn).to.throw();
    }) 
    it("Debería devolver error cuando se le pasa un mes en el que no hay ventas: 07 de 2019", () => {
        mes = 07;
        anio = 2019;
        dataLocal = local;

        const fn = () => sucursalDelMes(mes, anio, dataLocal);
        expect(fn).to.throw();
    })   
    it("Debería devolver un error cuando no se le pasa el parámetro mes", () => {
        anio = 2019;
        dataLocal = local;

        const fn = () => sucursalDelMes(anio, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el parámetro año", () => {
        mes = 01;
        dataLocal = local;

        const fn = () => sucursalDelMes(mes, dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando no se le pasa el parámetro local", () => {
        mes = 01;
        anio = 2019;

        const fn = () => sucursalDelMes(mes, anio);
        expect(fn).to.throw();
    })
    it("El objeto local debería ser igual antes y después de ejecutar la función", () => {
        mes = 01;
        anio = 2019;
        const localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        sucursalDelMes(mes, anio, localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})

describe("renderPorMes()", (dataLocal) => {
    it("Debería devolver un string.", () => {
        dataLocal = local;

        const resultado = renderPorMes(dataLocal);
        expect(resultado).to.be.a("string");
    })
    it("Debería devolver un string con el total de ventas por cada mes.", () => {
        dataLocal = local;

        const resultado = renderPorMes(dataLocal);
        expect(resultado).to.equal('Ventas por mes: \n- Total de Enero 2019: $1250 \n- Total de Febrero 2019: $4420');
    })
    it("Debería devolver un error cuando no se le pasa el parámetro local", () => {
    

        const fn = () => renderPorMes();
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un número", () => {
        dataLocal = 4;

        const fn = () => renderPorMes(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un objeto vacío", () => {
        dataLocal = {};

        const fn = () => renderPorMes(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un string", () => {
        dataLocal = "Harry Potter es mejor que ESDLA por lejos";

        const fn = () => renderPorMes(dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto local debería ser igual antes y después de ejecutar la función", () => {
        const localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        renderPorMes(localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})


describe("renderPorSucursal()", (dataLocal) => {
    it("Debería devolver un string.", () => {
        dataLocal = local;

        const resultado = renderPorSucursal(dataLocal);
        expect(resultado).to.be.a("string");
    })
    it("Debería devolver un string con el total de ventas por sucursal.", () => {
        dataLocal = local;

        const resultado = renderPorSucursal(dataLocal);
        expect(resultado).to.equal('Ventas por sucursal:\n- Total de Centro: $4405\n- Total de Caballito: $1265');
    })
    it("Debería devolver un error cuando no se le pasa el parámetro local", () => {
    

        const fn = () => renderPorSucursal();
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un número", () => {
        dataLocal = 4;

        const fn = () => renderPorSucursal(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un objeto vacío", () => {
        dataLocal = {};

        const fn = () => renderPorSucursal(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un string", () => {
        dataLocal = "Los tests son buenos, los test son bellos, no hay voluntad, olvídate de ello";

        const fn = () => renderPorSucursal(dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto local debería ser igual antes y después de ejecutar la función", () => {
        const localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        renderPorSucursal(localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})

describe("render()", (dataLocal) => {
    it("Debería devolver un string.", () => {
        dataLocal = local;

        const resultado = render(dataLocal);
        expect(resultado).to.be.a("string");
    })
    it("Debería devolver un string con el reporte total del local.", () => {
        dataLocal = local;

        const resultado = render(dataLocal);
        expect(resultado).to.equal('Reporte\n    \n==========================================\n    \nVentas por mes: \n- Total de Enero 2019: $1250 \n- Total de Febrero 2019: $4420\n    \n------------------------------------------\n    \nVentas por sucursal:\n- Total de Centro: $4405\n- Total de Caballito: $1265\n    \n------------------------------------------\n    \nProducto estrella: Motherboard ASUS 1200\n    \n------------------------------------------\n\nVendedora que más ingresos generó: Ada');
    })
    it("Debería devolver un error cuando no se le pasa el parámetro local", () => {
    

        const fn = () => render();
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un número", () => {
        dataLocal = 4;

        const fn = () => render(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un objeto vacío", () => {
        dataLocal = {};

        const fn = () => render(dataLocal);
        expect(fn).to.throw();
    })
    it("Debería devolver un error cuando en el parámetro local se le pasa un string", () => {
        dataLocal = "Jose y Lu hicieron estos tests";

        const fn = () => render(dataLocal);
        expect(fn).to.throw();
    })
    it("El objeto local debería ser igual antes y después de ejecutar la función", () => {
        const localOriginal = local;
        const localCopia = deepcopy(localOriginal);

        render(localOriginal);

        expect(localOriginal).to.deep.eql(localCopia);
    })
})