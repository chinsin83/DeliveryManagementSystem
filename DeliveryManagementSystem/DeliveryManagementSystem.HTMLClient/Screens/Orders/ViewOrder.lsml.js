/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewOrder.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Order.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Order." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}
myapp.ViewOrder.OrderTime_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.Created_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.Modified_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.PreferredDeliveryDate_postRender = function (element, contentItem) {
    // Write code here.
    SGDate(element, contentItem);
};
myapp.ViewOrder.AcknowledgedTime_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.DeliveryStartTime_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.DeliveryEndTime_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.Id_render = function (element, contentItem) {
    // Write code here.
    var hyperlink = $("<a href='../../api/File/Download?Id=" + contentItem.value + "' target='_blank' >Download</a>").appendTo($(element));
};
myapp.ViewOrder.AddProof_execute = function (screen) {
    // Write code here.
    myapp.showWebUploadAPI("Orders", screen.Order.Id);
};
myapp.ViewOrder.UploadDateTime_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewOrder.RefreshProofOfDeliveries_execute = function (screen) {
    // Write code here.
    screen.ProofOfDeliveries.refresh();
};