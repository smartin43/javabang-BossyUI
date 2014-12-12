/**
* bossy.dropdown is a widget that allows the user to utilize an already functional dropdown
* The user MUST create a "config" object - This object and its data members will be used to serialize all the data necessary for the dropdown creation
*
* Data members part of the config object are "src", "title", "selected", "template"
* The user MUST pass the "src" - the location of the json data that will populate the list
* The user MUST pass a "title" - the data member of the object that the user wants to populate the list with and order the dropdown with
* The user WILL be able to access "selected" - the object currently selected in the dropdown; this will be an empty object; DO NOT SERIALIZE
* The user CAN provide a "template" - to change the look of the dropdown, otherwise a default template will be utilized
* @since        1.0
* @author 		Alen Maragoul
* @author 		Shelby Martin
* @author 		Patrick Barnum
*/

/**
* @see 		EXAMPLE FOR DROPDOWN CREATION
*
* @see 		angular.module('testModule', ['bossy.dropdown'])
* @see 			.controller('testController', ['$scope', function($scope) {	
* @see 			$scope.config = {
* @see 				src: 'states.json',
* @see 				title: 'name',
* @see 				select: {},
* @see 				template: 'testTemplate10.html'
* @see 			};
* @see 		}])
*/

angular.module('bossy.dropdown', [])
	.run(function($templateCache){
        $templateCache.put('bossy-dropdown.html', '<div><select ng-options="item[dropdown.title] for item in dropdown.items | orderBy: dropdown.title" ng-model="selectedItem" ng-change="dropdown.updateSelectedItem(selectedItem)"><option value="" ng-hide="selectedItem">Please select one...</option></select></div>');	
    })
	.directive('bossyDropdown', function($http, $compile) {
		return {
			/** 
			 * @param config   config object passed by the user
			 * @param select    returns object that is currently selected in dropdown
			 * @param items     array of items that populate the dropdown
			 */
			restrict: 'EA',
			scope: {
				config: "=",
				select: "=",
				items: "="
			},
			templateUrl: '',
			link: function(scope, element, attrs) {
				/** 
				*	@param customTemplate 	Template specified by user; else use default template
				*/
				var customTemplate;

				//Checks if user is defining a url or inner html
				//If it is a url, the template must be located in a local directory or added to the DOM via ng-include
				if(scope.dropdown.template[0] !== '<')
					customTemplate = $compile('<ng-include src="dropdown.template"></ng-include>')(scope);
				else
					customTemplate = $compile(scope.dropdown.template)(scope);
				
				//Injects template
				element.replaceWith(customTemplate);
			},
			controller: function($scope) {
				var thisDropdown = this;
				/** 
				* @param title 	member data that user wants dropdown ordered by
				*/
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];

				/**
				*@param src		location of json data that will populate dropdown; either local or remote
				*/
				//Retrieve json containing objects to populate the dropdown.
				if($scope.config.src) {
					//Checks that config.src is a JSON file.
					if($scope.config.src.substr($scope.config.src.length-5, $scope.config.src.length) == '.json') {
						$http.get($scope.config.src)
							.success(function(data) {
								thisDropdown.items = data;
								//Checks validity of the title field as it applies to the JSON.
								if(!thisDropdown.items[0].hasOwnProperty(thisDropdown.title))
									console.error("ERROR: $scope.config.title: \'" + $scope.config.title + "\'' is not a member of the loaded JSON data. Please specify a valid \'title\' to list.");
								//Attaches retrieved items to $scope.items for additional functionality.
								if($scope.items)
									$scope.items = thisDropdown.items;
							})
							.error(function(data) {
								console.error("ERROR: Fail to load JSON data from the path: \'" + $scope.config.src + "\'");
							});
					}
					//Logs an error to identify that a json file was not loaded.
					else {
						console.error( "ERROR: \'$scope.config.src\': \'" + $scope.config.src + "\' is not a valid JSON file.");
					}
					//Function called to update select in the template.
					thisDropdown.updateSelectedItem = function(selectedItem) {
						//Single select object tied to the config object.
						if($scope.config.select)
							$scope.config.select = selectedItem;
						//User can collect and utilize multiple select objects with the same config object if passing in a distinct select param.
						if($scope.select)
							$scope.select = selectedItem;
					};
					//Determine if custom template Url has been defined.
					if($scope.config.template)
						thisDropdown.template = $scope.config.template;
					else {
						thisDropdown.template = 'bossy-dropdown.html';
					}
				}
				//Logs an error if 'src' has not been defined.
				else {
					console.error( "ERROR: \'$scope.config.src\' has not been specified within the \'config\' object. Please pass in a valid path to a JSON file.");
				};
			},
			controllerAs: 'dropdown'
		};
	})
