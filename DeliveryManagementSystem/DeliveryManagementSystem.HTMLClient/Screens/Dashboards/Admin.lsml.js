/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.Admin.created = function (screen) {
    // Write code here.
    if (myapp.permissions["LightSwitchApplication:CanManageCustomers"]) {
        screen.findContentItem("ShowBrowseCustomers").isEnabled = true;
        screen.findContentItem("ShowBrowseAccounts").isEnabled = true;
        //contentItem.screen.findContentItem("ShowHubDashboard").isVisible = true;
    }
    else {
        screen.findContentItem("ShowBrowseCustomers").isEnabled = false;
        screen.findContentItem("ShowBrowseAccounts").isEnabled = false;
    }
};