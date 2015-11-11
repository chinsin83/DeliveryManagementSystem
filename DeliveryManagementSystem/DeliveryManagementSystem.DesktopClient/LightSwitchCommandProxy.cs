using Microsoft.LightSwitch.Client;
using Microsoft.LightSwitch.Threading;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Threading;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LightSwitchApplication
{
    public static class LightSwitchCommandProxy
    {
        public static void StartWebApiCommand<T>(this IScreenObject screen, string commandrelativePath,
            object data, Action<Exception, T> callback)
        {
            Uri baseAddress = null;
            baseAddress = GetBaseAddress();

            var webRequest = WebRequest.Create(new Uri(baseAddress, commandrelativePath));
            webRequest.Method = "POST";
            webRequest.ContentType = "application/json";

            webRequest.BeginGetRequestStream(iar =>
            {
                var requestStream = webRequest.EndGetRequestStream(iar);

                SerializeObject(data, requestStream);

                webRequest.BeginGetResponse(iar2 =>
                {
                    WebResponse webResponse;
                    try
                    {
                        webResponse = webRequest.EndGetResponse(iar2);
                    }
                    catch (Exception ex)
                    {
                        screen.Details.Dispatcher.BeginInvoke(() =>
                        {
                            callback(ex, default(T));
                        });
                        return;
                    }
                    var result = Deserialize<T>(new StreamReader(webResponse.GetResponseStream()));

                    screen.Details.Dispatcher.BeginInvoke(() =>
                    {
                        callback(null, result);
                    });
                }, null);
            }, null);
        }
        //for a get
        public static void StartWebApiRequest<T>(this IScreenObject screen, string requestRelativePath,
    Action<Exception, T> callback)
        {
            Uri serviceUri = new Uri(GetBaseAddress(), requestRelativePath);

            WebRequest.RegisterPrefix("http://",
                      System.Net.Browser.WebRequestCreator.BrowserHttp);
            WebRequest.RegisterPrefix("https://",
                       System.Net.Browser.WebRequestCreator.BrowserHttp);
            //out of browser does not work here !
            WebRequest webRequest = WebRequest.Create(serviceUri);
            webRequest.UseDefaultCredentials = true;
            webRequest.Method = "GET";
            webRequest.BeginGetResponse(iar2 =>
                 {
                     WebResponse webResponse;
                     try
                     {
                         webResponse = webRequest.EndGetResponse(iar2);
                     }
                     catch (Exception ex)
                     {
                         screen.Details.Dispatcher.BeginInvoke(() =>
                         {
                             callback(ex, default(T));
                         });
                         return;
                     }
                     var result = Deserialize<T>(new StreamReader(webResponse.GetResponseStream()));

                     screen.Details.Dispatcher.BeginInvoke(() =>
                     {
                         callback(null, result);
                     });
                 }, null);

        }

        public static Uri GetBaseAddress()
        {
            Uri baseAddress = null;
            Dispatchers.Main.Invoke(() =>
            {
                baseAddress = new Uri(new Uri(System.Windows.Application.Current.Host.Source.AbsoluteUri), "../../");

            });
            return baseAddress;
        }
        private static void SerializeObject(object data, Stream stream)
        {
            var serializer = new JsonSerializer();
            var sw = new StreamWriter(stream);
            serializer.Serialize(sw, data);
            sw.Flush();
            sw.Close();
        }

        private static T Deserialize<T>(TextReader reader)
        {
            var serializer = new JsonSerializer();
            return serializer.Deserialize<T>(new JsonTextReader(reader));
        }
    }
}
