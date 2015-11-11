/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditOrdersByCustomer.StartAddress_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Account", function (value) {
        if (value != 'undefined' && value != null) {
            value.getAddress().done(function (value2) {
                contentItem.value = value2;
            });
            value.getLatitude().done(function (value2) {
                contentItem.screen.Order.StartLatitude = value2;
            });
            value.getLongitude().done(function (value2) {
                contentItem.screen.Order.StartLongitude = value2;
            });
        }
    });
};