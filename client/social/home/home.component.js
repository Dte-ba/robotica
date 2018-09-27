'use strict';

import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http, Restangular, $mdDialog, $stateParams, ngMeta,$state,$location) {
    super({$element});
    this.$http = $http;
    this.$q = $q;
    this.Restangular = Restangular;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.Publisheds = this.Restangular.all('publishedOrientacionPedagogica');
    this.Publishedskits = this.Restangular.all('publishedkits');
    this.$state = $state;
    this.page = 0;
    this.limit = 20;
    this.$location=$location;
    //this.viewResource = ($event, resource) => { 
    //  this.viewResource_($event, resource);
    //};

    this.sectionName = this.$stateParams.seccion || 'home';
    let sections = {
      'home': {
        caption:  '<h1><span class="font-primary-regular">Un entorno</span><br/> de educación accesible</h1> <p>para compartir prácticas de enseñanza inclusivas pensadas desde la diversidad</p>',
        image: '/assets/img/banner/index_image.png',
        title: 'Bienvenido',
        description: 'Robotica es un entorno de educación accesible para compartir prácticas de enseñanza inclusivas pensadas desde la diversidad',
      },
      'propuestas': {
        caption:  '<h1><span class="font-primary-regular">Propuestas</span><br/>pedagógicas</h1> <p>Dinámicas, flexibles y transversales. Para diseñar tu clase  integrando  nuevas experiencias de aprendizaje.</p>',
        image: '/assets/img/banner/propuesta_image.png',
        title: 'Propuestas pedagógicas',
        description: 'Propuestas pedagógicas Dinámicas, flexibles y transversales.<br />Para diseñar tu clase  integrando  nuevas experiencias de aprendizaje.',
        type: 'propuesta'
      },
      'actividades': {
        caption:  '<h1>_Actividades <br />accesibles</h1> <p>Diseñadas  para  participar , interactuar y aprender  en el aula  inclusiva.</p>',
        image: '/assets/img/banner/actividades_image.png',
        title: 'Actividades accesibles',
        description: 'Actividades accesibles diseñadas  para  participar, interactuar y aprender  en el aula  inclusiva.',
        type: 'actividad'
      },
      'herramientas': {
        caption:  '<h1>Herramientas_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        image: '/assets/img/banner/herramientas_image.png',
        title: 'Herramientas',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'herramientas'
      },
      'orientaciones': {
        caption:  '<h1>_Orientaciones</h1> <p>Con tutoriales, documentos y sitios de interés  que sirven de apoyo a tus prácticas de enseñanza.</p>',
        image: '/assets/img/banner/orientaciones_image.png',
        title: 'Orientaciones',
        description: 'Orientaciones con tutoriales y documentación que sirven de apoyo para tus prácticas.',
        type: 'orientacion'
      },
      'mediateca': {
        caption: '<h1>Mediateca_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'Mediateca',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'mediateca'
      },
      'noticias': {
        caption: '<h1>Noticias_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'Noticias',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'noticias'
      },
      'calendario': {
        caption: '<h1>Calendario_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'Calendario',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'calendario'
      },
      'sabiasQue': {
        caption: '<h1>Sabias Que_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'sabiasQue',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'sabiasQue'
      },
      'loquehacemos': {
        caption: '<h1>lo que hacemos_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'loquehacemos',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'loquehacemos'
      },
      'novedades': {
        caption: '<h1>Novedades_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'novedades',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'novedades'
      },
      'documentos': {
        caption:  '<h1>Documentos_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'documentos',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'documentos'
      },
      'kits': {
        caption:  '<h1>Kits_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'kits',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'kits'
      }


  };
    this.section = sections[this.sectionName];
    ngMeta.setTitle(this.section.title);
    ngMeta.setTag('description', this.section.description);


    this.puntaje = 5;
  }

  slides = [
    {
      titulo: "Robótica en las escuelas",
      texto:"Propuestas pedagógicas pensadas en clave del diseño curricular de la Provincia de Buenos Aires favoreciendo los procesos de aprendizaje colaborativo",       
      url: "/assets/img/banner/slider_1.jpg", 
      
      
    },
    {
      titulo: "Aprender a Programar",
      texto:"Permite desarrollar la capacidad de previsión, la comprobación de resultados, la optimización de recursos y la toma de decisiones",      
      url: "/assets/img/banner/slider_2.jpg",
    },
    {
      titulo: "Incorporar", 
      titulo2:"Pensamiento computacional",
      texto:"Dentro del campo educativo, propone la implementación de actividades creativas y colaborativas, para el desarrollo de la capacidad de resolución de problemas",    
      url: "/assets/img/banner/slider_3.jpg",
    }
  ]; 

 /* fetchData(){
    let def = this.$q.defer();

    this.page++;
    let resources = this.Api.all('publisheds');
    resources
        .getList({
          page: this.page, 
          limit: this.limit,
          type: this.section ? this.section.type : undefined
        })
        .then(data => {
          let captions = {
            'propuesta': 'Propuesta pedagógica',
            'actividad': 'Actividad accesible',
            'herramientas': 'Herramienta',
            'orientacion': 'Orientación',
            'noticias': 'Noticias',
            'calendario': 'Calendario',
          };
          let total = data.$total;
          data = _.map(data, p =>{
            p.typeCaption = captions[p.type];
            return p;
          });
          
          let res = {
            count: total,
            items: data,
            page: this.page,
            limit: this.limit
          };
  
          def.resolve(res);
        })

    return def.promise;
  }*/

  ircomoempezar(valor){


    this.$location.url("/comoEmpezar?tab="+valor);

  }


  fetchData(){
    let def = this.$q.defer();
    this.page++;
    let q;
    if (this.searchText){
        q = this.searchText
    }

    this.Publisheds
        .getList({
            page: 1, 
            limit: 3,
            type: 'orientacionpedagogica',
            publicaHome: true
        })
        .then(data => {
            let total = data.$total;
      
            let res = {
                count: total,
                items: data,
                page: this.page,
                limit: this.limit
            };

            def.resolve(res);
        })

    return def.promise;
}

fetchDataKit(){
  let def = this.$q.defer();
  this.page++;
  let q;
  if (this.searchText){
      q = this.searchText
  }

  this.Publishedskits
      .getList({
          page: 1, 
          limit: 3,
          type: 'kit'
      })
      .then(data => {
          let total = data.$total;
    
          let res = {
              count: total,
              items: data,
              page: this.page,
              limit: this.limit
          };

          def.resolve(res);
      })

  return def.promise;
}


/*viewOrientacionPedagogica_($event, resource){

    if (!this.$mdDialog)
        return;

		this.$mdDialog.show({
      template: require('../components/orientacionpedagogicaView/orientacionpedagogicaView.html'),
      parent: angular.element(document.body),
      targetEvent: $event,
			clickOutsideToClose: true,
      fullscreen: true, // Only for -xs, -sm breakpoints.
      locals: {
        resource: resource
      },
      controller: DialogController,
      controllerAs: '$ctrl'
    })
    .then((data) => {
      console.log(data);
    }, () => {
      
    })
    .catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press')) {
        throw res;
      }
    });

    function DialogController($scope, $mdDialog, resource, Restangular, $timeout) {
      'ngInject';
      this.loading = true;

      this.Resource = Restangular.one('publisheds', resource._id);
      
      this.closeDialog = function() {
        $mdDialog.hide();
      }

      this.Resource
        .get()
        .then(data => {

          let captions = {
            'propuesta': 'Propuesta pedagógica',
            'actividad': 'Actividad accesible',
            'herramientas': 'Herramienta',
            'orientacion': 'Orientación',
            'mediateca': 'Mediateca',
            'noticias': 'Noticias',
            'calendario': 'Calendario'
          };

          data.links = _.map(data.links, p =>{
            p.typeCaption = captions[p.type];
            return p;
          });

          this.resource = data;
          this.loading = false;
          $timeout(() => {
            $scope.$apply();
          });
        })
        .catch(err => {
          throw err;
        });
    }
  }*/
}
