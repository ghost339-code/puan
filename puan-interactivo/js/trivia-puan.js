document.querySelectorAll('.opcion').forEach(function(boton,indice){boton.addEventListener('click',function(){document.getElementById('mensaje').textContent=indice===0?'¡Correcto! Sumaste 10 puntos.':'Respuesta incorrecta.';if(indice===0)sumar(10)})});function sumar(n){localStorage.setItem('puntaje',(Number(localStorage.getItem('puntaje'))||0)+n)}

