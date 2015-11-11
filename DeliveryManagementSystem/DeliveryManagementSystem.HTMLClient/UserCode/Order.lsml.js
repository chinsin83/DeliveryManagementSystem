/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.Order.created = function (entity) {
    // Write code here.
    entity.Status = "New";
    entity.OrderTime = new Date();
};