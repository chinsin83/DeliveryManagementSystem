/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.Main.created = function (screen) {
    // Write code here.
    $.getJSON("/Perms/UserPermissions/", function (data) {
        myapp.permissions = data;

        console.log(myapp.permissions);
        
        if (myapp.permissions["LightSwitchApplication:CanViewAdminDashboard"]) {
            screen.findContentItem("ShowAdmin").isEnabled = true;
        }
        else {
            screen.findContentItem("ShowAdmin").isEnabled = false;
        }
        //ShowAdmin
    });

};