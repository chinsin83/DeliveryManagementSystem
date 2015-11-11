/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewCustomer.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Customer.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Customer." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

