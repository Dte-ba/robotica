'use strict';

import angular from "angular";
import _ from "lodash";

export default angular
	.module('robotica.social.components.kitCard', [])
	.directive('kitCard', noticiaCard)
	.name;

class NoticiaCardController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog) {
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('kit-card');
		

	
		
		
		this.resource = this.$scope.resource;



		this.editable = this.$scope.editable === true;
		let captions = {
			'kit': 'Kit'
		};

		this.resource.typeCaption = captions[this.resource.type];
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource;

		}
	}

	editResource(){
		this.$state.go(`curador.kit`, { uid: this.resource._id, action: 'edit' });
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
            this.$state.go('curador.kit', {type: 'kit', searh: item.section});
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

            this.Resource = Restangular.one(resource.route, resource._id);

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

function noticiaCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: NoticiaCardController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',
			editable: '=',
			vista: '='
    },
		template: require('./kitCard.html')
	}
}