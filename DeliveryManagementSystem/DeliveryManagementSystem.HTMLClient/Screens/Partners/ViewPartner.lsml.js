/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewPartner.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Partner.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Partner." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}


myapp.ViewPartner.DateOfBirth_postRender = function (element, contentItem) {
    // Write code here.
    SGDate(element, contentItem);
};
myapp.ViewPartner.StartDate_postRender = function (element, contentItem) {
    // Write code here.
    SGDate(element, contentItem);
};
myapp.ViewPartner.Created_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};
myapp.ViewPartner.Modified_postRender = function (element, contentItem) {
    // Write code here.
    SGDateTime(element, contentItem);
};