/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditOrder.SearchStartAddress_render = function (element, contentItem) {
    // Write code here.
    initAutoComplete(element, "StartAddress", "Search Pickup Location", function (lat, lng, address) {
        contentItem.screen.Order.StartLatitude = "" + lat;
        contentItem.screen.Order.StartLongitude = "" + lng;
        contentItem.screen.Order.StartAddress = address;
    });
};
myapp.AddEditOrder.SearchDestinationAddress_render = function (element, contentItem) {
    // Write code here.
    initAutoComplete(element, "DestinationAddress", "Search Destination", function (lat, lng, address) {
        contentItem.screen.Order.DestinationLatitude = "" + lat;
        contentItem.screen.Order.DestinationLongitude = "" + lng;
        contentItem.screen.Order.DestinationAddress = address;
    });
};
myapp.AddEditOrder.Status_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditOrder.OrderNumber_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditOrder.StartAddress_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditOrder.DestinationAddress_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditOrder.Account_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditOrder.CalculateTrip_execute = function (screen) {
    // Write code here.
    if (screen.Order.StartAddress == null || screen.Order.StartAddress == 'undefined') {
        msls.showMessageBox("Please key in start")
    }

    CalculateDistanceBetween2Places(screen.Order.StartAddress, screen.Order.StartLatitude, screen.Order.StartLongitude, screen.Order.DestinationAddress, screen.Order.DestinationLatitude, screen.Order.DestinationLongitude, function (value) {
        console.log(value);
        screen.Order.Distance = value.distance;
        screen.Order.EstimatedDuration = value.duration;
    });
};
myapp.AddEditOrder.CalculateDeliveryCharge_execute = function (screen) {
    // Write code here.
    screen.Order.Account.getDeliveryCharge().done(function (value) {
        screen.Order.DeliveryCharge = value;
    });
};
myapp.AddEditOrder.UseAsStartAddress_execute = function (screen) {
    // Write code here.
    screen.Order.Account.getAddress().done(function (value) {
        screen.Order.StartAddress = value;
    });
    screen.Order.Account.getLatitude().done(function (value) {
        screen.Order.StartLatitude = value;
    });
    screen.Order.Account.getLongitude().done(function (value) {
        screen.Order.StartLongitude = value;
    });
};
myapp.AddEditOrder.UseAsDestinationAddress_execute = function (screen) {
    // Write code here.
    screen.Order.Account.getAddress().done(function (value) {
        screen.Order.DestinationAddress = value;
    });
    screen.Order.Account.getLatitude().done(function (value) {
        screen.Order.DestinationLatitude = value;
    });
    screen.Order.Account.getLongitude().done(function (value) {
        screen.Order.DestinationLongitude = value;
    });
};
myapp.AddEditOrder.Calculate2_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Account", function (value) {
        if (value == null || value == "undefined") {
            contentItem.isEnabled = false;
        }
        else {
            contentItem.isEnabled = true;
        }
    });
};
myapp.AddEditOrder.UseAsStartAddress_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Account", function (value) {
        if (value == null || value == "undefined") {
            contentItem.isEnabled = false;
        }
        else {
            contentItem.isEnabled = true;
        }
    });
};
myapp.AddEditOrder.UseAsDestinationAddress_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Account", function (value) {
        if (value == null || value == "undefined") {
            contentItem.isEnabled = false;
        }
        else {
            contentItem.isEnabled = true;
        }
    });
};