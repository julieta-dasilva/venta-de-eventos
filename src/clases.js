
class Sistema {
  constructor() {
    this.listaAdministradores = [];
    this.listaDeClientes = [];
    this.listaDeConciertos = [];
    this.usuarioLogeado = null; //obj vacio === "" se guarda el usurario logeado. usuario = a cliente o admin
    this.listaDeReservas = [];
  }

  //agregar
  //obtetnerTodaLalista
  //existe
  //obtenerPorID

  precargarDatos() {
    // precarga de admins nombreUsr, contra orden del contructor.

    this.listaAdministradores.push(new Administrador("a", "a1"));
    this.listaAdministradores.push(new Administrador("Admin1", "Jperez01"));
    this.listaAdministradores.push(new Administrador("Admin2", "Pepito2"));
    this.listaAdministradores.push(new Administrador("Admin3", "jds123"));
    this.listaAdministradores.push(new Administrador("Admin4", "Pepito4"));
    this.listaAdministradores.push(new Administrador("Admin5", "Pepito5"));

    // precarga de 5 clientes nombre apellido nombreUsr contra id

    // revisar la tabla y el ordem de los conciertos porque no se ven bien .

    this.listaDeClientes.push(
      new Cliente("veronica", "rodriguez", "vero123", "V12345")
    );
    this.listaDeClientes.push(new Cliente("veroeica", "rodqwiguez", "v", "v1"));
    this.listaDeClientes.push(
      new Cliente("alba", "camargo", "alba2025", "a12345")
    );
    this.listaDeClientes.push(
      new Cliente("veronicaa", "rodriguezz", "vero33", "1234")
    );
    this.listaDeClientes.push(
      new Cliente("juan Pablo", "rodriguez", "victor04", "juanpi1234")
    );
    this.listaDeClientes.push(
      new Cliente("pepe", "rodriguez", "pepe05", "contrasenia")
    );
    this.listaDeClientes.push(
      new Cliente("romina", "rodriguez", "roro2020", "contrasenia")
    );
    this.listaDeClientes.push(
      new Cliente("Paula", "Fernandez", "pau01", "contrasenia")
    );
    this.listaDeClientes.push(
      new Cliente("camila", "lopez", "lolcap202", "contrasenia")
    );
    this.listaDeClientes.push(
      new Cliente("tamara", "idalgo", "tami99", "contrasenia")
    );
    this.listaDeClientes.push(
      new Cliente("facundo", "rodriguez", "facu33", "contrasenia")
    );

    //precarga de  10 conciertos  minimo 5 eran nombreEvento, precioXentrada, img, cupos activo

    //nombreConcierto, precioXentrada, rutaIMG, cantEntradas, activo, cocniertoEnOferta

    this.listaDeConciertos.push(
      new Concierto("QUEEN", 2000, "img/QUEEN.PNG", 0, "true", "si")
    );
    this.listaDeConciertos.push(
      new Concierto("MADONA", 2000, "img/madona.jpg", 100, "false", "activo")
    );

    this.listaDeConciertos.push(
      new Concierto("PRINCE", 2000, "img/prince.jpg", 0, "true", "si")
    );
    this.listaDeConciertos.push(
      new Concierto("ELTON JHON", 6000, "img/Elton-John.jpg", 100, "true", "si")
    );
    this.listaDeConciertos.push(
      new Concierto("ABBA", 2500, "img/ABBA.jpg", 100, "true", "si")
    );
    this.listaDeConciertos.push(new Concierto("ROLLING STONES", 5000, "img/rolling.png", 100, "true", "si"));
    this.listaDeConciertos.push(
      new Concierto("LED ZEPPELIN", 6000, "img/zeppelin.jpg", 100, "true", "si")
    );
    this.listaDeConciertos.push(
      new Concierto("SURVIVOR", 4000, "img/suvivorband.webp", 100, "true", "si")
    );
    this.listaDeConciertos.push(
      new Concierto("KISS", 4000, "img/kiss.jpg", 100, "true", "si")
    );
    this.listaDeConciertos.push(
      new Concierto("ACDC", 4000, "img/ACDC.JPG", 100, "true", "si")
    );

    //precarga de reservas correctas 
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[1], this.listaDeConciertos[0], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[1], this.listaDeConciertos[4], 2, "cancelada"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[5], this.listaDeConciertos[5], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[1], this.listaDeConciertos[7], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[3], this.listaDeConciertos[3], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[1], this.listaDeConciertos[4], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[2], this.listaDeConciertos[6], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[1], this.listaDeConciertos[3], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[8], this.listaDeConciertos[6], 2, "pendiente"));
    this.listaDeReservas.push(new Reserva(this.listaDeClientes[2], this.listaDeConciertos[2], 2, "pendiente"));
   // this.listaDeReservas.push(new Reserva(this.listaDeClientes[3], this.listaDeConciertos[5], 2, "aprobada"));

  }

  //propiedades del contructor del cliente propiedad this.nombre
  agregarUsuario(nombre, UnaContra) {
    let obj = new Cliente(nombre, UnaContra);
    this.listaDeClientes.push(obj);
  }

  contraseniaValida(contrasenia) {
    let valida = false;
    if (contrasenia.length >= 5) {
      let contMinusculas = 0;
      let contMayusculas = 0;
      let contNumeros = 0;
      for (let i = 0; i < contrasenia.length; i++) {
        let c = contrasenia[i];
        if (!isNaN(c)) {
          contNumeros++;
        } else if (c === c.toUpperCase()) {
          contMayusculas++;
        } else if (c === c.toLowerCase()) {
          contMinusculas++;
        }
      }
      if (contMinusculas >= 1 && contMayusculas >= 1 && contNumeros >= 1) {
        valida = true;
      }
    }
    return valida;
  }

  obtenerCliente(nombreUsr, contraRegistro) {
    let objCliente = null;

    for (let i = 0; i < this.listaDeClientes.length; i++) {
      let c = this.listaDeClientes[i];
      if (
        c.nombreUsrCliente.toLowerCase() === nombreUsr.toLowerCase() &&
        c.contrasenia === contraRegistro
      ) {
        objCliente = c;
        break;
      }
    }

    return objCliente;
  }

  existeCliente(nombre, nombreUsrCliente, contrasenia) {
    let existe = false;
    for (let i = 0; i < this.listaDeClientes.length && !existe; i++) {
      let obj = this.listaDeClientes[i];
      if (
        obj.nombre === nombre ||
        obj.nombreUsrCliente === nombreUsrCliente ||
        obj.contrasenia === contrasenia
      ) {
        existe = true;
      }
    }
    return existe;
  }

  realizarLogincliente(nombreUsrCliente, contrasenia) {
    let existe = false;
    for (let i = 0; i < this.listaDeClientes.length && !existe; i++) {
      let obj = this.listaDeClientes[i];
      if (
        obj.nombreUsrCliente === nombreUsrCliente &&
        obj.contrasenia === contrasenia
      ) {
        existe = true;
        this.usuarioLogeado = obj;
      }
    }
    return existe;
  }
  realizarLoginAdmin(nombreUsr, contra) {
    let existe = false;
    for (let i = 0; i < this.listaAdministradores.length && !existe; i++) {
      let obj = this.listaAdministradores[i];
      if (obj.nombreUsr === nombreUsr && obj.contra === contra) {
        existe = true;
        this.usuarioLogeado = obj;
      }
    }

    return existe;
  }

  obtenerTodosLosConciertos() {
    return this.listaDeConciertos;
  }

  obtenerConciertoPorID(id) {
    let resp = null;
    for (let i = 0; i < this.listaDeConciertos.length && resp === null; i++) {
      let obj = this.listaDeConciertos[i];
      if (obj.id === id) {
        resp = obj;
      }
    }
    return resp;
  }

  obtenerConciertosNoActivos() {
    let listaConciertosNoActivos = [];
    for (let i = 0; i < this.listaDeConciertos.length; i++) {
      let obj = this.listaDeConciertos[i];
      if (!obj.activo) {
        //obj.activo == true
        listaConciertosNoActivos.push(obj);
      }
    }
    return listaConciertosNoActivos;
  }

  obtenerConciertosActivos() {
    let lista = [];
    for (let i = 0; i < this.listaDeConciertos.length; i++) {
      let obj = this.listaDeConciertos[i];


      if (obj.activo && obj.cantEntradas > 0) {
        lista.push(obj);
      }
    }
    return lista;
  }


  activarConcierto(id) {
    let objConcierto = this.obtenerConciertoPorID(id); // objconcierto
    if (objConcierto.cantEntradas <= 0) {
      return false;
    }

    objConcierto.activo = true;
    return true;
  }

  desactivarConcierto(id) {
    let objConcierto = this.obtenerConciertoPorID(id); //me da el objeto    CONCIERTO
    objConcierto.activo = false;
  }

  modificarCupos(idConcierto, nuevaCantidad) {
    let objConcierto = this.obtenerConciertoPorID(idConcierto);

    if (objConcierto) {
      objConcierto.cantEntradas = Number(nuevaCantidad);

      if (objConcierto.cantEntradas <= 0) {
        objConcierto.activo = false;
      }

      return true;
    }
    return false
  }



  modificarPrecio(idConcierto, nuevoPrecio) {
    let objConcierto = this.obtenerConciertoPorID(idConcierto);

    if (objConcierto) {
      // Aseguramos que sea un número válido y no negativo
      let precioNum = Number(nuevoPrecio);
      if (precioNum >= 0) {
        objConcierto.precioXentrada = precioNum;
        return true;
      }
    }
    return false;
  }


  cambiarEstadoOferta(idConcierto, nuevoEstadoBooleano) {
    let objConcierto = this.obtenerConciertoPorID(idConcierto);
    if (objConcierto) {
      objConcierto.enOferta = nuevoEstadoBooleano;
      return true;
    }
    return false;
  }





  obtenerConcierto(nombre) {
    let objConcierto = null;
    for (let i = 0; i < this.listaDeConciertos.length; i++) {
      let c = this.listaDeConciertos[i]; // este es el obj que estoy recorriendo de la lista concierto.

      if (c.nombreConcierto.toLowerCase() === nombre.toLowerCase()) {
        objConcierto = c;
        break;
      }
    }
    return objConcierto;
  }

  obtenerConciertoConEntradas() {
    let lista = [];
    for (let i = 0; i < this.listaDeConciertos.length; i++) {
      let objCcentradas = this.listaDeConciertos[i];
      if (objCcentradas.cantEntradas > 0) {
        lista.push(objCcentradas);
      }
    }
    return lista;
  }
  // creacion del obj reserva "pendiente"
  realizarReserva(idConciertodelSlc, cantDeEntradas) {
    let objConcierto = this.obtenerConciertoPorID(idConciertodelSlc);

    if (this.validarReserva(idConciertodelSlc)) {
      return 2;
    }

   

    let objReserva = new Reserva(
      this.usuarioLogeado,
      objConcierto,
      cantDeEntradas,
      "pendiente"
    );

    this.listaDeReservas.push(objReserva);

    return 1;
  }

  obtenerReservaPorID(id) {
    for (let res of this.listaDeReservas) {
      if (res.id === Number(id)) return res;
    }
    return null;
  }



  procesarReserva(idReserva) {
    let objReserva = this.obtenerReservaPorID(idReserva);

    if (!objReserva || objReserva.estado !== "pendiente") {
      return "ERROR_ESTADO";
    }

    let objConcierto = objReserva.concierto;
    let objCliente = objReserva.cliente;
    let cantEntradas = objReserva.cantidadEntradas;


    let montoFinal = objReserva.montoTotal; // Monto sin descuento
    let descuentoAplicado = false;
    if (cantEntradas >= 4) {
      montoFinal = montoFinal * 0.90;
      descuentoAplicado = true;
    }
    if (objConcierto.cantEntradas < cantEntradas || !objConcierto.activo) {

      this.cancelarReserva(objReserva, "CANCELADA_SIN_CUPOS");
      return "CANCELADA_SIN_CUPOS";
    }


    if (objCliente.saldo < montoFinal) {

      this.cancelarReserva(objReserva, "CANCELADA_SALDO");
      return "CANCELADA_SALDO";
    }
    objCliente.saldo -= montoFinal;

    objConcierto.cantEntradas -= cantEntradas;
    if (objConcierto.cantEntradas <= 0) {
      objConcierto.activo = false; // Pausar si queda sin cupos
    }

    objReserva.montoTotal = montoFinal;
    objReserva.estado = "aprobada";
    return "APROBADA";
  }




  validarReserva(idConcierto) {
    let idCliente = this.usuarioLogeado.id;

    for (let objReserva of this.listaDeReservas) {
      if (objReserva.cliente.id === idCliente && objReserva.concierto.id === idConcierto) {
        let estado = objReserva.estado
        if (estado === "pendiente" || estado === "aprobada") {
          return true
          
        }

      }

    }
    return false;
  }


  cancelarReserva(objReserva) {
    objReserva.concierto.cantEntradas += objReserva.cantidadEntradas;
    objReserva.estado = "cancelada"; 
  }


  obtenerMisReservas() {
    let lista = [];
    for (let objReserva of this.listaDeReservas) {
      if (objReserva.cliente.id === this.usuarioLogeado.id) {
        lista.push(objReserva);
      }
    }
    return lista;
  }


  obtenerReservasPorEstado(estado) {
    let listaFiltrada = [];

    for (let i of this.listaDeReservas) {
      let estadoLowerCase = i.estado.toLowerCase();
      let estadoBuscado = estado.toLowerCase();
      if (estadoLowerCase === estadoBuscado) {
        listaFiltrada.push(i);

      }
      
    }
   
    return listaFiltrada;
  }


  //metodo para armar la tabla de reservas pendiente  seccion admin lista de reservas
  reservaPendientes() {
    let pendientes = [];
    for (let i = 0; i < this.listaDeReservas.length; i++) {
      let estaReserva = this.listaDeReservas[i];

      if (estaReserva.estado === "pendiente") {
        pendientes.push(estaReserva);
      }
    }
    return pendientes;
  }


  cancelaReservaPorCliente(idReservas) {
    let reservaACancelar = null;
    
    for (let i = 0; i < this.listaDeReservas.length && reservaACancelar===null; i++) {
      if (this.listaDeReservas[i].id === Number(idReservas)) {
        reservaACancelar = this.listaDeReservas[i];
     
      }
    }
    //si la reserva existe y es del usuario logueado
    if (!reservaACancelar || reservaACancelar.cliente.id !== this.usuarioLogeado.id) {
      return false;
    }

    if (reservaACancelar.estado !== "pendiente") {
      return false
    }
    reservaACancelar.estado = "Cancelada por Cliente";
    reservaACancelar.concierto.cantEntradas += reservaACancelar.cantidadEntradas

    return true;
  }




  calcularGananciaTotal() {
    let gananciaTotal = 0;

    for (let i = 0; i < this.listaDeReservas.length; i++) {
      let objReserva = this.listaDeReservas[i];

      if (objReserva.estado.toLowerCase() === "aprobada") {


        gananciaTotal += Number(objReserva.montoTotal);
      }
    }
    return gananciaTotal;
  }

  obtenerGananciasPorConcierto() {
    let resultados = {};

    for (let i = 0; i < this.listaDeReservas.length; i++) {
        let r = this.listaDeReservas[i];

        if (r.estado.toLowerCase() === "aprobada") {

            let nombre = r.concierto.nombreConcierto;

            if (!resultados[nombre]) {
                resultados[nombre] = {
                    nombre: nombre,
                    cantidadEntradas: 0,
                    monto: 0
                };
            }

            resultados[nombre].cantidadEntradas += Number(r.cantidadEntradas);
            resultados[nombre].monto += Number(r.montoTotal); // YA INCLUYE DESCUENTO
        }
    }

    return Object.values(resultados);
}





  cerrarSesion() {
    this.usuarioLogeado = null;
  }
}

let idAdmin = 0;
class Administrador {
  constructor(nombreUsr, contra) {
    this.nombreUsr = nombreUsr;
    this.contra = contra;
    this.idAdmin = idAdmin++;
  }
}

let idClientes = 0;
class Cliente {
  constructor(nombre, apellido, nombreUsrCliente, contrasenia) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreUsrCliente = nombreUsrCliente;
    this.id = idClientes++; //id autoincremental para los clientes
    this.contrasenia = contrasenia;
    this.saldo = 10000; // saldo de cada cliente inicial en $10.000
  }
  debitarSaldo(monto) {
    if (this.saldo >= monto) {
      this.saldo -= monto;
      return true; // exito
    }
    return false; // Saldo insuficiente
  }
}

let idConciertos = 0;
class Concierto {
  constructor(nombreConcierto, precioXentrada, rutaIMG, cantEntradas, activo,
    cocniertoEnOferta) {
    this.nombreConcierto = nombreConcierto;
    this.precioXentrada = precioXentrada;
    this.rutaIMG = rutaIMG;
    this.cantEntradas = cantEntradas;
    this.activo = activo; //booleano de si esta activo o no el concierto
    this.enOferta = cocniertoEnOferta;

    this.id = 'CON_ID_' + idConciertos++;
  }

  // metodo para que en la tabla que ve el cliente los conciertos le apareza  activos o no dependiendo si tienen cupos
  conciertoEstaAactivo() {

    if (this.activo && this.cantEntradas > 0) {
      return "HABILITADO";
    }

    return "PAUSADO";
  }
  descontarCupos(cantidad) {
    if (this.cantEntradas >= cantidad) {
      this.cantEntradas -= cantidad;

      // Si queda sin cupos, se pasa a estado “pausado”.
      if (this.cantEntradas <= 0) {
        this.activo = false;
      }
      return true; // Descuento exitoso
    }
    return false; // No hay cupos suficientes
  }




  toString() {
    return `${this.nombreConcierto} - $${this.precioXentrada} - Entradas disponibles: ${this.cantEntradas}`;
  }
}

let idReservas = 0;
class Reserva {
  constructor(cliente, concierto, cantidadEntradas, estado) {
    this.cliente = cliente; // obj
    this.concierto = concierto; //obj
    this.cantidadEntradas = cantidadEntradas;

    this.id = idReservas++;
    this.montoTotal = concierto.precioXentrada * cantidadEntradas;
    this.estado = estado;
  }


}
