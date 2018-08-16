'use strict';

import angular from "angular";
import _ from "lodash";

export default angular
	.module('robotica.social.components.propuestaTalleresCard', [])
	.directive('propuestatallerCard', propuestaTalleresCard)
	.name;

class PropuestaTallerCardController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('propuestaTalleres-card');

        this.captions = {
            'propuestatalleres': 'Propuesta Talleres'
        };
		this.resource = this.$scope.resource;



        let captionsAreas = {
            'Cs. Naturales' : 'naturales',
            'Matemática' : 'Matemática',
            'Prácticas del Lenguajes' : 'lengua'
        };

        this.iconsAreas = _.map(this.resource.area, p =>{
            return captionsAreas[p.type];         
        });



		this.editable = this.$scope.editable === true;
		

		this.resource.typeCaption = this.captions[this.resource.type];
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource;

		}
	}

	editResource(){
		this.$state.go('curador.propuestataller', { uid: this.resource._id, action: 'edit' });
    }
    

    showConfirm(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm =this.$mdDialog.confirm()
              .title('Eliminar?')
              .textContent('Esta seguro que desea eliminar este taller?')
              .ariaLabel('')
              .targetEvent(ev)
              .ok('Si!')
              .cancel('No');
              confirm.resource= this.resource;
              confirm.$state= this.$state;
        this.$mdDialog.show(confirm).then(function() {
            confirm.resource
            .remove()
            .then( data => {
                confirm.$state.go('curador.dashboardpropuestataller', {}, {reload: true});
            })
            .catch( err => {
                throw err;
            });
        }, function() {
         
        });
      };




      getFieldClass(entry){
        if (entry == "Cs. Naturales")
            return "iconPed-naturales step";
        if (entry == "Matemática")
            return "iconPed-matematica step";
        if (entry == "Práctica del Lenguaje")
            return "iconPed-lengua step";            



        return  "iconPed-"+entry +" step";

        }

      


	deleteResource(){
        this.resource
            .remove()
            .then( data => {
                this.$state.go(this.$state.current, {}, {reload: true});
            })
            .catch( err => {
                throw err;
            });


	}

    clickedAction(item) {
        let types = /^(pendiente|aprobado|rechazado)$/ig;
		if (types.test(item.section)) {
            this.$state.go('curador.propuestataller', {type: 'propuestataller', searh: item.section});
		} else {
            this.$state.go('curador.new', { type: item.section });
		}
	}

    viewResource($event, resource, modoVista){

        if (!this.$mdDialog)
            return;

        if (!modoVista || modoVista === 'curador')
            return;

        this.$mdDialog.show({
            template: require('../modalView/modalView.html'),
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
            //this.$scope = $scope;
            this.loading = true;

            this.Resource = Restangular.one('publishedpropuestaTaller', resource._id);

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
    }

}

function propuestaTalleresCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: PropuestaTallerCardController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',
			editable: '=',
			vista: '='
    },
		template: require('./propuestaTalleresCard.html')
	}
}