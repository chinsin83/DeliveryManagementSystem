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

namespace LightSwitchApplication
{
    public partial class OrdersListDetail
    {
        partial void Upload_Execute()
        {
            // Write your code here.
            this.Application.ShowWebApiUpload("Orders", this.Orders.SelectedItem.Id);
        }

        partial void Download_Execute()
        {
            // Write your code here.
            int fileStoreId = ProofOfDeliveries.SelectedItem.Id;
            Dispatchers.Main.Invoke(() =>
            {
                Uri baseAddress = new Uri(new Uri(System.Windows.Application.Current.Host.Source.AbsoluteUri), "../../"); //works both in debug and deployed !
                string url = string.Format(@"{0}api/File/Download?Id={1}", baseAddress.AbsoluteUri, fileStoreId);
                HtmlPage.Window.Navigate(new Uri(url), "_blank");
            });
        }
    }
}
