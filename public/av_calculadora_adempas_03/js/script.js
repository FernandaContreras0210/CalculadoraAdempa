"use strict";
let veeva = {};
let slideTres = {
   loadConfig: function() {
      return fetch('js/config.json')
         .then(response => response.json())
         .then(data => {
            veeva = data;
         })
         .catch(error => {
            console.error('Error al cargar la configuración:', error);
         });
   },
   uploadDocuments: function(enlaces) {
      let containerBotonesHTML = document.getElementById('container');
      enlaces.forEach((enlace, index) => {
         let btn = `
         <div class="btn-enlaces animate-fade-in-up delay-${index+1} animate-duration-slower">
            <div></div>
            <button onclick="javascript:slideTres.jumToDoc('${enlace.zipName}', '${enlace.presentationCode}')"
               style="background-color: ${enlace.color}">
               <h5>${enlace.docName}</h5>
            </button>
         </div>`;
         containerBotonesHTML.insertAdjacentHTML('beforeend', btn);
      });
   },
   jumptoSlide: function(slide) {
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   },
   jumToDoc: function(doc, zip) {
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${doc}.zip,${zip})`;
      } else {
         alert(`Estas abriendo el documento: ${doc}.zip, presentación: ${zip}`);
      }
   }
}

document.addEventListener('DOMContentLoaded', function () {
   slideTres.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideTres.uploadDocuments(veeva.enlaces);
   });
});