
let sistema = new Sistema();
sistema.precargarDatos();
sistema.cerrarSesion();

ocultarLosSection();
document.querySelector("#iniciarSesion").style.display = "block";
document.querySelector("#sectionRegistro").style.display = "block";

//ocultar menus
document.querySelector("#navCliente").style.display = "none";
document.querySelector("#navAdmin").style.display = "none";
document.querySelector("#btnlogin").addEventListener("click", login);
document.querySelector("#btncerrarSesionAdmin").addEventListener("click", logout);
document.querySelector("#btnCerrarSesionCliente").addEventListener("click", logout);
document.querySelector("#btnRegistrar").addEventListener("click", registrarCliente);
document.querySelector("#btnMostrarEventos").addEventListener("click", mostrarConciertosCliente);
document.querySelector("#btnAgregarConcierto").addEventListener("click", agregarConciertoEvento);
document.querySelector("#btnMostrarConciertosAdmin").addEventListener("click", actualizarTablaConciertos);
document.querySelector("#foto").addEventListener("change", actualizarFoto);
document.querySelector("#btnReservar").addEventListener("click", reservar);
document.querySelector("#btnInformeGanancias").addEventListener("click", generarInformeGanancias);



function actualizarSeccionAdmin() {


   actualizarTablaConciertos();// porqiue no se ve cuando vulver a ingresar al sistema
   armarTablaporEstado("aprobada", "#tablaDeAprobadas")
   armarTablaporEstado("pendiente", "#tablaPendientes")
   armarTablaporEstado("cancelada", "#tablaCanceladas")
   armarTablaPendientesAdmin()

}

function acttualizarSeccionCliente() {
   cargarCombo(sistema.obtenerConciertoConEntradas(), "#slcCconciertos");
   cargarTablaDeReservas();
   mostrarConciertosCliente()
   mostrarConciertosEnOfertaCliente();
}

function cargarTablaDeReservas() {
   let lista = sistema.obtenerMisReservas();
   let tabla = ``;
   let totalReservasAprobadas = 0

   for (let i = 0; i < lista.length; i++) {
      let objReserva = lista[i];

      let btnCancelarReserva = ``;
      if (objReserva.estado === "pendiente") {
         btnCancelarReserva = `<button onclick="cancelarReserva(${objReserva.id})">Cancelar</button>`;
      }

      if (objReserva.estado === "aprobada") {
         totalReservasAprobadas += Number(objReserva.montoTotal);
      }

      tabla += `<tr>

         <td>${objReserva.concierto.nombreConcierto}</td>
         <td>$${objReserva.concierto.precioXentrada}</td>
         <td>${objReserva.cantidadEntradas}</td>
         <td>$${objReserva.montoTotal}</td> 
         <td>${objReserva.estado}</td>
         <td>${btnCancelarReserva}</td>
     
         
      </tr>`;
   }

   let clienteActual = sistema.usuarioLogeado;
   let infoSaldo = `
        <div;"><strong>
            Saldo actual: $${clienteActual.saldo}
        </<strong></div> <hr>
        <div><strong>Monto total en reservas aprobadas: $${totalReservasAprobadas}</strong></div>
    `;

   document.querySelector("#tablaConciertosDelCliente").innerHTML = tabla + infoSaldo;
}

function cargarCombo(lista, id) {
   let texto = ``;
   for (let obj of lista) {
      texto += `<option value="${obj.id}"> ${obj.toString()} </option>`;
   }
   document.querySelector(id).innerHTML = texto;
}

function agregarEventosNavs() {
   document
      .querySelector("menuIniciarSecion")
      .addEventListener("click", mostrarSection("iniciarSesion"));
   document
      .querySelector("menuRegistrarse")
      .addEventListener("click", mostrarSection("sectionRegistro"));

   // cliente
   document
      .querySelector("menuExplorarConciertos")
      .addEventListener("click", mostrarSection("explorarConciertos"));

   document
      .querySelector("menuReservarEntradas")
      .addEventListener("click", mostrarSection("reservarConciertos"));
   document
      .querySelector("menuHistorialDeRservas")
      .addEventListener("click", mostrarSection("historialDeReservas"));
   document
      .querySelector("menuConciertosEnOferta")
      .addEventListener("click", mostrarSection("reservarConciertosEnOferta"));

   //admin
   document
      .querySelector("#menuListarYreservar")
      .addEventListener(
         "click",
         mostrarSection("tablaDeConciertosAgregadosxAdmin")
      );
   document
      .querySelector("#menuAgregarCioncierto")
      .addEventListener("click", mostrarSection("formAgregarConciertoYeventos"));
   document
      .querySelector("#menuAdminstrarConciertos")
      .addEventListener("click", mostrarSection("formAgregarConciertoYeventos"));
}

function registrarCliente() {
   let formRegistro = document.querySelector("#formRegistrar");

   if (formRegistro.reportValidity()) {
      let nombreRegistro = document.querySelector("#txtUsuario").value;
      let apellidoRegistro = document.querySelector("#txtApellido").value;
      let txtNombreUsr = document.querySelector("#txtNombreUsr").value;
      let contraRegistro = document.querySelector("#contraRegistro").value;

      if (
         sistema.obtenerCliente(txtNombreUsr, contraRegistro) != null ||
         !sistema.contraseniaValida(contraRegistro)
      ) {
         alert(
            "Datos invalidos."

            // no dar toda la info es perjufdicial recuerde que los requerimientos son : minimo 5 caratceres al menos una mayuscula una minuscula y un numero
         );
      } else {
         alert("registro Exitoso!");
         let objCliente = new Cliente(
            nombreRegistro,
            apellidoRegistro,
            txtNombreUsr,
            contraRegistro
         );
         sistema.listaDeClientes.push(objCliente);
         formRegistro.reset();
         //console.log(nombreRegistro,apellidoRegistro,txtNombreUsr,contraRegistro);
      }
   }
}

function login() {
   let form = document.querySelector("#formularioLogin");
   if (form.reportValidity()) {
      let nombreUsr = document.querySelector("#nombreUsr").value;
      let contra = document.querySelector("#txtcontra").value;
      // console.log(nombreUsr, contra)
      // si el usuario y la contra esta bien debo mostrar la seccion 1 inicial y mostrar la seccion admin
      // usuario = admin y clientes
      if (sistema.realizarLoginAdmin(nombreUsr, contra)) {
         form.reset();
         //ocultar la section de login
         //mostrar la seccion admin con los conciertos pendientes a aprobrar
         // actualizar tabla.
         alert("Ingreso Exitoso!");
         document.querySelector("#navAdmin").style.display = "block";
         document.querySelector("#navPrincipal").style.display = "none";

         document.querySelector("#sectionAdmin").style.display="block"
         document.querySelector("#tablaDeConciertosAgregadosxAdmin").style.display="block"
         
         mostrarSection("sectionAdmin");
         actualizarSeccionAdmin();

      } else if (sistema.realizarLogincliente(nombreUsr, contra)) {
         alert("Ingreso Exitoso!");
         document.querySelector("#navCliente").style.display = "block";
         document.querySelector("#navPrincipal").style.display = "none";
         document.querySelector("#navAdmin").style.display = "none";
         //mostrarSection("btnCerrarSesionCliente");
         mostrarSection("sectionCliente");



         acttualizarSeccionCliente();
      } else {
         alert("Datos invlidos.");
      }
   }
}

function logout() {
   sistema.cerrarSesion(); //determina que no hay nadie logeado
   //muestra el login
   mostrarSection("iniciarSesion");
   let form = document.querySelector("#formularioLogin");
   form.reset();
   document.querySelector("#sectionAdmin").style.display = "none";
   document.querySelector("#tablaDeConciertosAgregadosxAdmin").style.display =
      "none";

   document.querySelector("#navAdmin").style.display = "none";
   document.querySelector("#navCliente").style.display = "none";
   document.querySelector("#navPrincipal").style.display = "block";
}

function mostrarSection(id) {
   ocultarLosSection();
   //llamo a la funcion de abajo que oculta todo y despues te muestra la que le paso por id
   document.querySelector("#" + id).style.display = "block";
}

function ocultarLosSection() {
   // oculto todas las secciones
   let secciones = document.querySelectorAll(".seccion");
   for (let i = 0; i < secciones.length; i++) {
      let seccion = secciones[i];
      seccion.style.display = "none";
   }
}

function mostrarConciertosCliente() {
   let listaConciertosActivos = sistema.obtenerConciertosActivos();
   let texto = `<table id="explorarConciertos">
            <thead>

              <tr>

                <th>Nombre </th>
                <th>precio</th>
                <th>Imagen</th>
                <th>Entradas disponibles</th>
                <th>concierto activo</th>
               <th>Concierto en oferta</th>
              </tr>

            </thead>`;

   for (let i = 0; i < listaConciertosActivos.length; i++) {
      let obj = listaConciertosActivos[i];
      let tagImagen = `<img src="${obj.rutaIMG}" alt="${obj.nombreConcierto}" style="width: 100%; height: auto; max-width: 100px;">`;
      let oferta = "NO";
      if (obj.enOferta) {
         oferta = "SI";
      }

      texto += `<tr>
         <td>${obj.nombreConcierto}</td>
         <td>$${obj.precioXentrada}</td>
         <td>${tagImagen}</td>  
         <td>${obj.cantEntradas}</td>
         <td>${obj.conciertoEstaAactivo()}</td>
         <td>${oferta}</td>

    
              
         
         
      </tr>`;

   }
   document.querySelector("#explorarConciertos").innerHTML = texto;
}

function reservar() {
   let form = document.querySelector("#formReservar");

   if (form.reportValidity()) {
      let cantDeEntradas = Number(document.querySelector("#cantEntradas").value);
      let fecha = document.querySelector("#fecha").value;
      let idConciertodelSlc = document.querySelector("#slcCconciertos").value;

      let resultado = sistema.realizarReserva(
         idConciertodelSlc,
         cantDeEntradas,
         fecha
      );

      if (resultado === 1) {
         alert("✅ Reserva realizada correctamente y pendiente de aprobación.");
         form.reset();
         acttualizarSeccionCliente();

      } else if (resultado === 2) {
         alert(
            "⚠️ ¡Error! Ya tienes una reserva para este concierto. No se permite reservar el mismo evento más de una vez."
         );
      }
   }
}
function cancelarReserva(idReserva) {
   let resultado = sistema.cancelaReservaPorCliente(idReserva);
   if (resultado) {
      alert("Reserva cancelada exitosamente. Las entradas han sido liberadas.");
      acttualizarSeccionCliente();
   } else {
      alert(
         "Error: La reserva no pudo ser cancelada. Revise su estado o que le pertenezca."
      );
   }
}

function agregarConciertoEvento() {
   let form = document.querySelector("#formAgregarConciertoYeventos");
   if (form.reportValidity()) {
      let nombreConcierto = document.querySelector("#txtNombreConcierto").value;
      let precioXentrada = Number(document.querySelector("#precioEntrada").value);
      let cantEntradas = Number(document.querySelector("#cantCupos").value);
      let enOferta = document.querySelector("#slcEnOferta").value;
      let rutaIMG = document.querySelector("#foto").value; //seccion con option para las img genericas que ingresan los admins
      let activo = true;

      let conciertoExistente = sistema.obtenerConcierto(nombreConcierto);

      form.reset();
      console.log(nombreConcierto, precioXentrada, cantEntradas, enOferta);
      if (precioXentrada <= 0 || cantEntradas <= 0 || enOferta === "") {
         alert(
            "El precio y los cupos deben ser numericos y mayores a 0. o ese nombre de concierto ya existe"
         );
      }

      //Si el valor de conciertoExistente no es null, es decir, si existe
      else if (conciertoExistente != null) {
         alert(`El concierto con el nombre "${nombreConcierto}" ya existe.`);
      } else {
         alert("Concierto agregado correctamente!");
         let objConcierto = new Concierto(
            nombreConcierto,
            precioXentrada,
            rutaIMG,
            cantEntradas,
            activo,
            enOferta
         );
         sistema.listaDeConciertos.push(objConcierto);
      }
   }
}

function actualizarTablaConciertos() {
   let lista = sistema.obtenerTodosLosConciertos();
   let tabla = "<thead><tr>";
   tabla += "<th>Nombre</th><th>Precio</th><th>Modificar Precio</th>";
   tabla += "<th>Imagen</th><th>Cupo</th><th>Modificar Cupo</th>";
   tabla += "<th>Estado</th><th>Oferta</th>";
   tabla += "</tr></thead><tbody>";

   for (let i = 0; i < lista.length; i++) {
      let obj = lista[i];

      let img = '<img src="' + obj.rutaIMG + '" style="width:80px">';

      let estadoBtnTexto = "";
      if (obj.activo) {
         estadoBtnTexto = "Pausar";
      } else {
         estadoBtnTexto = "Activar";
      }

      let ofertaBtnTexto = "";
      if (obj.enOferta) {
         ofertaBtnTexto = "Quitar";
      } else {
         ofertaBtnTexto = "Oferta";
      }

      tabla += "<tr>";
      tabla += "<td>" + obj.nombreConcierto + "</td>";
      tabla += "<td>$" + obj.precioXentrada + "</td>";

      tabla += '<td><input type="number" class="input-precio" id="precio-' + obj.id + '" value="' + obj.precioXentrada + '">';
      tabla += '<button class="btn-guardar-precio" id="guardar-precio-' + obj.id + '">Guardar</button></td>';

      tabla += "<td>" + img + "</td>";

      tabla += "<td>" + obj.cantEntradas + "</td>";

      tabla += '<td><input type="number" class="input-cupo" id="cupo-' + obj.id + '" value="' + obj.cantEntradas + '">';
      tabla += '<button class="btn-guardar-cupo" id="guardar-cupo-' + obj.id + '">Guardar</button></td>';

      tabla += "<td><span class='estado'>";
      if (obj.activo) {
         tabla += "Activo";
      } else {
         tabla += "Pausado";
      }
      tabla += "</span> <button class='btn-toggle-estado' id='estado-" + obj.id + "'>" + estadoBtnTexto + "</button></td>";

      tabla += "<td><span class='en-oferta'>";
      if (obj.enOferta) {
         tabla += "SI";
      } else {
         tabla += "NO";
      }
      tabla += "</span> <button class='btn-toggle-oferta' id='oferta-" + obj.id + "'>" + ofertaBtnTexto + "</button></td>";

      tabla += "</tr>";
   }

   tabla += "</tbody>";

   document.querySelector("#tablaDeConciertosAgregadosxAdmin").innerHTML = tabla;

   agregarListenersTabla();
}

function agregarListenersTabla() {
   // Guardar precio
   let botonesPrecio = document.querySelectorAll(".btn-guardar-precio");
   for (let i = 0; i < botonesPrecio.length; i++) {
      botonesPrecio[i].addEventListener("click", function () {
         let id = this.id.split("-")[2];
         guardarPrecio(id);
      });
   }

   // Guardar cupo
   let botonesCupo = document.querySelectorAll(".btn-guardar-cupo");
   for (let i = 0; i < botonesCupo.length; i++) {
      botonesCupo[i].addEventListener("click", function () {
         let id = this.id.split("-")[2];
         guardarCupo(id);
      });
   }

   // Activar/Pausar toggler es el opuesto del que esta
   let botonesEstado = document.querySelectorAll(".btn-toggle-estado");
   for (let i = 0; i < botonesEstado.length; i++) {
      botonesEstado[i].addEventListener("click", function () {
         let id = this.id.split("-")[1];
         ConciertoEstado(id);
      });
   }

   // Oferta/Quitar oferta
   let botonesOferta = document.querySelectorAll(".btn-toggle-oferta");
   for (let i = 0; i < botonesOferta.length; i++) {
      botonesOferta[i].addEventListener("click", function () {
         let id = this.id.split("-")[1];
         estadOferta(id);
      });
   }
}



function guardarPrecio(id) {
   let input = document.querySelector("#precio-" + id);
   let nuevo = Number(input.value);

   if (nuevo < 0 || isNaN(nuevo)) {
      alert("Precio inválido");
      return;
   }

   sistema.modificarPrecio(id, nuevo);
   actualizarTablaConciertos();
}

function guardarCupo(id) {
   let input = document.querySelector("#cupo-" + id);
   let nuevo = Number(input.value);

   if (nuevo < 0 || isNaN(nuevo)) {
      alert("Cupo inválido");
      return;
   }

   sistema.modificarCupos(id, nuevo);
   actualizarTablaConciertos();
}

function ConciertoEstado(id) {
   let concierto = sistema.obtenerConciertoPorID(id);
   if (concierto.activo) {
      sistema.desactivarConcierto(id);
   } else {
      if (!sistema.activarConcierto(id)) {
         alert("No se puede activar: cupo 0");
      }
   }
   actualizarTablaConciertos();
}

function estadOferta(id) {
   let concierto = sistema.obtenerConciertoPorID(id);
   sistema.cambiarEstadoOferta(id, !concierto.enOferta);
   actualizarTablaConciertos();
}




function generarInformeGanancias() {
   let totalGanancia = sistema.calcularGananciaTotal();

   let mensaje = "";


   if (totalGanancia > 0) {
      mensaje = `La Ganancia Total por las reservas aprobadas es de: $${totalGanancia}.`;
   } else {
      mensaje = "Aún no hay reservas aprobadas que generen ganancias.";
   }

   document.querySelector("#resultadoGanancias").innerHTML = mensaje;

   let listaPorConcierto = sistema.obtenerGananciasPorConcierto();

   let tabla = `<table border="1">
                   <tr>
                       <th>Concierto</th>
                       <th>Entradas Vendidas</th>
                       <th>Monto Generado</th>
                   </tr>
               `;

   for (let i = 0; i < listaPorConcierto.length; i++) {
      let item = listaPorConcierto[i];

      tabla += `<tr>
                   <td>${item.nombre}</td>
                   <td>${item.cantidadEntradas}</td>
                   <td>$${item.monto}</td>
                 </tr>`;
   }

   tabla += `</table>`;

   document.querySelector("#tablaGanancias").innerHTML = tabla;
}





function actualizarFoto() {
   console.log("actualizarFoto");
   let rutaFoto = document.querySelector("#foto").value;
   document.querySelector("#imgConciertosGenerica").src = rutaFoto;
}



function armarTablaporEstado(estado, idTabla) {
   let lista = sistema.obtenerReservasPorEstado(estado);

   let tabla = ``;
   for (let i = 0; i < lista.length; i++) {
      let objReserva = lista[i];

      tabla += `<tr>
         
         <td>${objReserva.concierto.nombreConcierto}</td>
         <td>${objReserva.cantidadEntradas}</td>
         <td>${objReserva.estado}</td>
         <td>$${objReserva.montoTotal}</td> 
         <td>$${objReserva.cliente.saldo}</td>
     
         
      </tr>`;
   }


   document.querySelector(idTabla).innerHTML = tabla;

}


function procesarReservaDesdeTabla(idReserva) {
   let resultado = sistema.procesarReserva(idReserva);

   if (resultado === "APROBADA") {

      alert(`✅ Reserva #${idReserva} APROBADA con éxito. Movida a la tabla de Aprobadas.`);

   } else if (resultado === "CANCELADA_SALDO") {

      alert(`❌ Reserva #${idReserva} CANCELADA. Razón: Saldo insuficiente del cliente. Movida a la tabla de Canceladas.`);

   } else if (resultado === "CANCELADA_SIN_CUPOS") {

      alert(`❌ Reserva #${idReserva} CANCELADA. Razón: Concierto inactivo o cupos insuficientes. Movida a la tabla de Canceladas.`);

   }
   actualizarSeccionAdmin();
}

function armarTablaPendientesAdmin() {
   let listaPendientes = sistema.reservaPendientes();
   let tabla = ``;

   for (let i = 0; i < listaPendientes.length; i++) {
      let objReserva = listaPendientes[i];
      let objCliente = objReserva.cliente;

      tabla += `<tr>
           <td>${objReserva.concierto.nombreConcierto}</td>
           <td>${objReserva.cantidadEntradas}</td>
           <td>${objReserva.estado}</td>
           <td>$${objReserva.montoTotal}</td> 
           <td>$${objCliente.saldo}</td>
           <td><button class="btn-procesar-reserva" data-id="${objReserva.id}">PROCESAR</button></td>
       </tr>`;
   }
   document.querySelector("#tablaPendientes").innerHTML = tabla;
   agregarListenersProcesar();
}



function agregarListenersProcesar() {
   let botonesProcesar = document.querySelectorAll(".btn-procesar-reserva");
   for (let i = 0; i < botonesProcesar.length; i++) {
      let boton = botonesProcesar[i];

      boton.addEventListener("click", function (event) {
         // obtiene el valor del atributo data-id del boton  procesar
         let idReserva = event.currentTarget.getAttribute("data-id");
         procesarReservaDesdeTabla(idReserva);
      });
   }
}


function mostrarConciertosEnOfertaCliente() {
   // Obtenemos todos los conciertos activos
   let listaConciertosActivos = sistema.obtenerConciertosActivos();

   // Empezamos la tabla
   let texto = `<h3>Conciertos en Oferta</h3> 
      <table id="tablaConciertosOferta">
       <thead>
           <tr>
               <th>Nombre</th>
               <th>Precio</th>
               <th>Imagen</th>
               <th>Entradas disponibles</th>
               <th>Concierto activo</th>
               <th>Concierto en oferta</th>
           </tr>
       </thead>
       <tbody>`;


   for (let i = 0; i < listaConciertosActivos.length; i++) {
      let obj = listaConciertosActivos[i];


      if (obj.enOferta) {
         let tagImagen = `<img src="${obj.rutaIMG}" alt="${obj.nombreConcierto}" style="width: 100px; height: auto;">`;

         let oferta = "SI";
         let activo = obj.conciertoEstaAactivo();

         texto += `<tr>
               <td>${obj.nombreConcierto}</td>
               <td>$${obj.precioXentrada}</td>
               <td>${tagImagen}</td>
               <td>${obj.cantEntradas}</td>
               <td>${activo}</td>
               <td>${oferta}</td>
           </tr>`;
      }
   }

   texto += "</tbody></table>";

   // Mostramos la tabla en un contenedor específico
   document.querySelector("#seccionConciertosEnOferta").innerHTML = texto;
}