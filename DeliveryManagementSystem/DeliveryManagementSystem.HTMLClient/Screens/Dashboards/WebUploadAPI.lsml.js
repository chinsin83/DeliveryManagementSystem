/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.WebUploadAPI.ScreenContent_render = function (element, contentItem) {
    // Write code here.
    $("<input id='myFile' type='file' onChange='WebApiUploadHandler()'/>").appendTo($(element));
};
function WebApiUploadHandler() {
    var x = document.getElementById("myFile");
    if ('files' in x) {
        if (x.files.length == 0) {

        }
        else {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                uploadparameters.BinaryData = e.target.result;

                $.ajax({
                    url: "../../api/File/Upload",
                    type: "POST",
                    data: uploadparameters,
                    processData: false,
                    contentType: false,
                }).done(function (value) {
                    console.log(value);
                }).fail(function (a, b, c) {
                    console.log(a, b, c);
                });
                myapp.cancelChanges();
            }

            var uploadparameters = {
                FileName: x.files[0].name,
                //FileSize: x.files[0].size,
                ReferencedEntitySet: "Orders",
                ReferenceId: 3,
            };


            //reader.readAsDataURL(x.files[0]);
        }
    }
}
myapp.WebUploadAPI.Upload_execute = function (screen) {
    // Write code here.
    var x = document.getElementById("myFile");

    if ('files' in x) {
        if (x.files.length == 0) {

        }
        else {
            var reader = new FileReader();

            reader.onloadend = function (e) {

                console.log(e.target.result);

                uploadparameters.BinaryData = e.target.result;

                $.ajax({
                    url: "../../api/File/Upload",
                    type: "POST",
                    data: uploadparameters,
                    //processData: false,
                    //contentType: "multipart/form-data",
                }).done(function (value) {
                    console.log(value);
                }).fail(function (a, b, c) {
                    console.log(a, b, c);
                });
                myapp.cancelChanges();
            }

            var uploadparameters = {
                FileName: x.files[0].name,
                BinaryData: x.files[0],
                ReferencedEntitySet: screen.ReferencedEntitySet,
                ReferenceId: screen.ReferenceId
            };

            reader.readAsDataURL(x.files[0]);
        }
    }
};