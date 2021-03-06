/**
 * A controller responsible for handling the Request History.
 */
clientApp.controller('HistoryCtrl', function($scope, $rootScope, $modal, history, toaster, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.numberOfEntries = 0;

	//Listen for an event indicating that the history should be loaded.
	$scope.$on("loadHistory", function(event, args) {
		$scope.displayedCollection = null;
		$scope.loadData();
	});

	//Retrieve all previous requests.
	$scope.loadData = function() {
		history.get(function(values) {
			//Update the UI.
			$scope.numberOfEntries = values.length;
			$scope.rowCollection = values;
			$scope.displayedCollection = [].concat($scope.rowCollection);
			$scope.$apply();
		});
	};

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index > -1) {
			//Remove it from the UI.
			$scope.rowCollection.splice(index, 1);
			$scope.numberOfEntries = $scope.rowCollection.length;

			//Delete the entry.
			history.delete(row.key, function() {
				toaster.success("", "The selected request has been deleted.");
				$scope.$apply();
			});
		}
	};

	//Populate the form with the request details of the specified row.
	$scope.apply = function(row) {
		$rootScope.$broadcast('applyFavorite', {
			'url': row.request, 'method': row.method,
			'payload': row.payload, 'headers': history.convertRequestHeaders(row.headers)});
		$rootScope.loadTab('main');
	};

	//Open a modal dialog to view more details about the selected item.
	$scope.openRowModal = function(row) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/historyModal.html',
			controller: 'HistoryModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				record: row
			}
		});

		//Apply the selected request.
		modalInstance.result.then(function() {
			$scope.apply(row);
		});
	};
});


/**
 * Simple modal controller for displaying more details about a specific history record.
 */
clientApp.controller('HistoryModalInstanceCtrl', function ($scope, $modalInstance, record, utils, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;

	//Add the history object to the scope so it can be used in the modal.
	$scope.history = angular.copy(record);
	$scope.history.response = utils.stringify($scope.history.response);
	$scope.history.maxSize = GENERAL_CONSTANTS.MAX_OBJECT_SIZE;

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.alerts = [{type: 'success', msg: "Successfully copied to the Clipboard."}];
		utils.copyToClipboard(text);
	};

	$scope.apply = function() {
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.countHeaders = function(headers) {
		var numHeaders = 0;
		if (angular.isObject(headers)) {
			numHeaders = Object.keys(headers).length;
		}
		return numHeaders;
	};
});
