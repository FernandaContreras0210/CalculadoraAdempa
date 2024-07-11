"use strict";
let veeva = {};

function loadConfig() {
   return fetch('js/config.json')
      .then(response => response.json())
      .then(data => {
         veeva = data;
      })
      .catch(error => {
         console.error('Error al cargar la configuración:', error);
      });
}

function jumpToSlide(slide) {
   slide === '02' ? localStorage.setItem('instrucciones', true) : localStorage.removeItem('instrucciones');
   if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
      document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
   } else {
      document.location = `/CalculadoraAdempa/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
   }
}

function validarForm() {
   console.log('Validacion pendiente');
   jumpToSlide('06');
}

document.addEventListener('DOMContentLoaded', function () {
   loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
   });
});