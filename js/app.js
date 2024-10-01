// Constructor 

function Prestamo(cantidad, interes, plazo) {
     this.cantidad = cantidad;
     this.interes = interes;
     this.plazo = plazo;
}

Prestamo.prototype.calcularInteres = function(){
     let cantidad = this.cantidad;
     let interes = this.interes;
     let plazo = this.plazo;

     let total = cantidad * interes / 100 * plazo;
     return total;
}


function vista() {}

vista.prototype.mostrarAlerta = function () {
     
}

vista.prototype.mostrarResultado = function(monto, interes){

     const resultado = document.querySelector('#resultado');
     const div = document.createElement('div');
     const total = parseInt(monto) + parseInt(interes);
     
     div.setAttribute('id', 'resultado');


     div.classList.add('bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
     div.innerHTML = `
          <p class="header">Resultado</p>
          <p>La cantidad solicitada es: ${monto}</p>
          <p>El interes: ${interes}</p>
          <p>El total a pagar es: ${total}</p>

     `;

     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';
     setTimeout( () =>  {
          spinner.style.display = 'none';
          resultado.appendChild(div);
     }, 3000);


}

vista.prototype.mostrarAlerta = function(mensaje, tipo) {
     const div = document.createElement('div');

     if(tipo === 'error') {
          div.classList.add('mensaje', 'error');
          // tailwindcss

          div.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center'); 
     } else {
          div.classList.add('mensaje', 'correcto');
          // tailwindcss
          div.classList.add('bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
     }
     div.innerHTML = `${mensaje}`;
     form.insertBefore(div, document.querySelector('.form-group'));

     setTimeout(() => {
          document.querySelector('.mensaje').remove();
     }, 3000);
}

vista = new vista();
const form = document.querySelector('#loan-calculator');

form.addEventListener('submit', e => {
     e.preventDefault();

     // variables

     const cantidad = document.querySelector('#loan-amount').value
     const interes = document.querySelector('#interest-rate').value
     const plazo = document.querySelector('#loan-term').value

     // review text area no empty

     if(cantidad==='' || interes==='' || plazo ===''){
          vista.mostrarAlerta('Todos los campos son necesarios', 'error')
     }
     else{
          const resultados = document.querySelector('#resultado div');
          if(resultados !=null ){
               resultados.remove();
          }

          const prestamo = new Prestamo(cantidad, interes, plazo);
          const total = prestamo.calcularInteres();
          vista.mostrarAlerta('Calculando...', 'correcto');
          vista.mostrarResultado(cantidad, total);

     }
});





