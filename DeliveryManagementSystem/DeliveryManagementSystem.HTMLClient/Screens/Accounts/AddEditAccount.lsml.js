/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditAccount.AccountName_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditAccount.AccountCode_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditAccount.Address_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().css('color', 'red'); $(element).parent().find("label")[0].innerHTML += " *"
};
myapp.AddEditAccount.SearchAddress_render = function (element, contentItem) {
    // Write code here.
    var mydiv = $("<input id='Address' placeholder='Search' onFocus='geolocate(autocomplete)' type='text' autocomplete='off'/>").appendTo($(element));

    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById("Address")),
        {
            types: ['geocode'],
            componentRestrictions: { country: 'SG' }
        });

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (place != 'undefined' && place != null) {
            contentItem.screen.Account.Latitude = "" + place.geometry.location.lat();
            contentItem.screen.Account.Longitude = "" + place.geometry.location.lng();
            contentItem.screen.Account.Address = place.formatted_address;
        }
    });
};
myapp.AddEditAccount.CompanyName_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Account.Customer", function (value) {
        if (value != 'undefined' && value != null) {
            value.getCompanyName().done(function (value2) {
                contentItem.value = value2;
            });
        }
    });
};
myapp.AddEditAccount.CompanyRegistrationNumber_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Account.Customer", function (value) {
        if (value != 'undefined' && value != null) {
            value.getCompanyRegistrationNumber().done(function (value2) {
                contentItem.value = value2;
            });
        }
    });
};