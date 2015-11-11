/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewOrdersByCustomer.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Order.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Order." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewOrdersByCustomer.OrderTime_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrdersByCustomer.PreferredDeliveryDate_postRender = function (element, contentItem) {
    // Write code here.
    SGDate(element, contentItem);
};