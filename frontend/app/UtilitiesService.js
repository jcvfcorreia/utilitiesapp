angular.module('UtilitiesService', ['ngResource'])
        .service('Utilities', [
            '$resource',
            function ($resource) {
                return $resource('http://localhost:3000/agua',
                    {

                    },                    
                    {
                        getAll: {
                            method: 'GET',
                            isArray: true
                        }
                    });
            }
        ]);