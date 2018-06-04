'use strict';
import angular from 'angular';
import $ from 'jquery';

class HeaderComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams, $rootScope, Auth) {
    this.selected = '';
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this.Auth = Auth;
    this.isDisabled = false;
    this.noCache = true;
    this.selectedItem;
    this.searchText =  $stateParams.search || '';

    this.menuNavBar = [
      {
        section: 'comoEmpezar',  caption: 'Como empezar?', action:'social.comoEmpezar'
      },
      {
        section: 'orientacionesPedagogicas',  caption: 'Orientaciones Pedagógicas', action:'social.orientacionesPedagogicas'
      },
      {
        section: 'kits',  caption: 'Kits', action:'?seccion=kits'
      },
      {
        section: 'noticias',  caption: 'Noticias', action:'social.noticias'
      },
      {
        section: 'institucional',  caption: 'Institucional',
        "nodes": [
          {
            section: 'quienesSomos',  caption: 'Que es Robótica', action:'social.institucional'
          },
         
        ]
      }
    
      
    ];

    this.arraySectionsName = [];
  
    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
      this.searchText =  $stateParams.search || '';
      if (!toParams.seccion){
        this.selected = '';
      }
    });

    
    this.getUser();
    this.handleClickOnWindow();
  }

  handleClickOnWindow() {
    $(window).click(() => {
      
    });
  }

  getUser(){
    this.Auth
      .getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        throw err;
      });
  }

  toggleProfile($event){
    this.showingDropdown = !this.showingDropdown;
    $event.stopPropagation();
  }

  logout(){
    this.Auth.logout();
    this.$state.go('app.login');
  }

  $onInit(){
    this.selected = this.$stateParams.seccion;
    for (var j = 0; j < this.menuNavBar.length; j++) {
      this.arraySectionsName.push(this.menuNavBar[j].section);
    }
  }
  
  selectedItemChange(item){

  }

  querySearch(searchText){
    return [];
  }

  searchTextChange(searchText){
    this.$rootScope.$emit('filterHomeChange', searchText);
  }

  itemClicked(item) {
    if (!item.nodes) {
        if (this.selected === item.section){
            return;
        }
        this.$state.go('.', { seccion: item.section });
        this.selected = item.section;
    }
  }
}

export default angular.module('robotica.social.socialHeader', [])
  .component('socialHeader', {
    template: require('./header.html'),
    controller: HeaderComponent
  })
  .name;
