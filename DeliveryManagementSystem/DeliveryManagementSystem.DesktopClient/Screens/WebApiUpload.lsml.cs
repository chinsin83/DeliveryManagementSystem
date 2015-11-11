using System;
using System.Linq;
using System.IO;
using System.IO.IsolatedStorage;
using System.Collections.Generic;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Framework.Client;
using Microsoft.LightSwitch.Presentation;
using Microsoft.LightSwitch.Presentation.Extensions;
using System.Windows.Browser;
using Microsoft.LightSwitch.Threading;
using LightSwitchApplication.Poco;
using System.Windows.Media;
using System.Windows.Controls;
using System.Windows.Media.Animation;
using System.Windows;
using System.Windows.Data;
using Microsoft.VisualStudio.ExtensibilityHosting;
using Microsoft.LightSwitch.Sdk.Proxy;
using System.Windows.Markup;
namespace LightSwitchApplication
{
    public partial class WebApiUpload
    {
        //ingredients:
        //The viewmodel needs a string property "SelectedFileName" which is NOT a parameter and is NOT required
        //the property is bound to  a Label control on the screen.
        //next to the label a custom control ( a simple system.windows.controls.button) is placed.
        //The viewmdodel needs a boolean property "IsBusy" which is NOT a parameter and is NOT required
        //the property is bound to  a custom control on the screen (the busy indicator)
        //add next to the button the busyindicator control (necessary files are in referenced assemblies folder.
        //system.windows.controls.toolkit.dll –>system.windows.controls.busyindicator
        partial void WebApiUpload_Created()
        {
            IsBusy = false;
            SelectedFileName = "Please select a file";
            var fileDialogCustomControl = this.FindControl("ReadLocalFileContentButton");
            fileDialogCustomControl.ControlAvailable += (s, e) =>
            {
                Button button = e.Control as Button;
                button.Content = "…";
                button.Click -= FileDialogButton_Click;
                button.Click += FileDialogButton_Click;
            };

            var busyProxy = this.FindControl("FileBusyIndicator");
            //the sole fact that the busyindicator is bound to the IsBusy viewmodel property is not enough (this is just setting up the datacontext of the custom control
            //we must still arrange that  the "IsBusyProperty" dependency property of the business indicator is "linked" to the value property of the custom control.
            busyProxy.ControlAvailable += ((s, e) =>
            {
                var busyIndicator = e.Control as BusyIndicator;
                var b = new Binding("Value");
                b.Mode = BindingMode.TwoWay;
                busyIndicator.SetBinding(BusyIndicator.IsBusyProperty, b);
            });
        }

        private void FileDialogButton_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            Button button = sender as Button;
            OpenFileDialog openFileDialog = new OpenFileDialog();

            string fileName = string.Empty;
            byte[] binaryData = null;

            if (openFileDialog.ShowDialog() == false)
            {
                SelectedFileName = string.Empty;
            }

            else
            {
                SelectedFileName = "Handling the file upload. Please wait….";
                IsBusy = true;
                try
                {
                    using (FileStream fileStream = openFileDialog.File.OpenRead())
                    {
                        fileName = openFileDialog.File.Name;
                        using (BinaryReader streamReader = new BinaryReader(fileStream))
                        {
                            binaryData = streamReader.ReadBytes((int)fileStream.Length);
                        }
                        fileStream.Close();
                    }
                }

                catch (IOException)
                {
                    this.Details.Dispatcher.BeginInvoke(() =>
                    {
                        this.ShowMessageBox("IO error…");
                        SelectedFileName = "An error occured";
                        IsBusy = false;
                    });
                }
            }
            //again as an example we attach the file to the first customer
            if (binaryData != null)
                this.StartWebApiCommand<FileUploadResponseParameters>("api/File/Upload",
                    new FileUploadRequestParameters { BinaryData = binaryData, FileName = fileName, ReferenceId = ReferenceId, ReferencedEntitySet = ReferencedEntitySet },
                    (error, responseParams) =>
                    {
                        IsBusy = false;
                        SelectedFileName = fileName;

                        if (error != null || responseParams.UploadStatus != "ok")
                        SelectedFileName = "Something went wrong…";
                    });

        }
        partial void DownloadLatestFile_Execute()
        {
            var dataService = this.Application.CreateDataWorkspace().ApplicationData;
            int fileStoreId = dataService.FileStores.OrderByDescending(f => f.Id).First().Id; //as an example we retrieve the latest upload.
            //for retrieving the file, we use the FileController’s Download method with as query parameter the id of the FileStore record
            Dispatchers.Main.Invoke(() =>
            {
                Uri baseAddress = new Uri(new Uri(System.Windows.Application.Current.Host.Source.AbsoluteUri), "../../"); //works both in debug and deployed !
                string url = string.Format(@"{0}api/File/Download?Id={1}", baseAddress.AbsoluteUri, fileStoreId);
                HtmlPage.Window.Navigate(new Uri(url), "_blank");
            });

        }
    }
}