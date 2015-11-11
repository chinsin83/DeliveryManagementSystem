using LightSwitchApplication.Poco;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Details;
namespace LightSwitchApplication
{
     public class FileController : LightSwitchApiControllerbase
     {
        [HttpGet]
         public HttpResponseMessage Download(int id)
         {
             MediaTypeHeaderValue _mediaType = MediaTypeHeaderValue.Parse("application/octet-stream");
             try
             {
                 using (var ctx = this.Context)
                 {
                     var myFileStoreEntry = ctx.DataWorkspace.ApplicationData.FileStores_SingleOrDefault(id);

                    if (myFileStoreEntry == null)
                     {
                         throw new HttpResponseException(HttpStatusCode.NotFound);
                     }

                    else
                     {
                         byte[] myBytes = myFileStoreEntry.FileBinaryContent;
                         string fileName = myFileStoreEntry.FileMetaData.FileName;
                         MemoryStream memStream = new MemoryStream(myBytes);
                         HttpResponseMessage fullResponse = Request.CreateResponse(HttpStatusCode.OK);
                         fullResponse.Content = new StreamContent(memStream);
                         fullResponse.Content.Headers.ContentType = _mediaType;
                         fullResponse.Content.Headers.ContentDisposition 
                             = new ContentDispositionHeaderValue("fileName") { FileName = fileName };
                         return fullResponse;
                     }

                }
             }
             catch
             {
                 throw new HttpResponseException(HttpStatusCode.NotFound);
             }

        }

        [HttpPost]
        public HttpResponseMessage Upload(FileUploadRequestParameters requestParameters)
        {
            FileUploadResponseParameters responseParameters = new FileUploadResponseParameters();
            using (var ctx = this.Context) //make sure to always put the context in a using !!!
            {
                var fileMetaData = ctx.DataWorkspace.ApplicationData.FileMetaDatas.AddNew();
                IEntitySet entitySet = ctx.DataWorkspace.ApplicationData.Details.Properties[requestParameters.ReferencedEntitySet].Value as IEntitySet;
                if (entitySet != null)
                {
                    string entityTypeName = entitySet.Details.EntityType.Name;
                    ICreateQueryMethod query = ctx.DataWorkspace.ApplicationData.Details.Methods[entitySet.Details.Name + "_SingleOrDefault"] as ICreateQueryMethod;
                    if (query != null)
                    {
                        object[] keySegment = new object[] { requestParameters.ReferenceId };
                        ICreateQueryMethodInvocation invocation = query.CreateInvocation(keySegment);
                        var myvalue = invocation.Execute() as IEntityObject;
                        fileMetaData.Details.Properties[entityTypeName].Value = myvalue;
                        fileMetaData.FileName = requestParameters.FileName;
                        fileMetaData.UploadDateTime = DateTime.Now;
                        fileMetaData.FileStore = new FileStore();
                        fileMetaData.FileStore.FileBinaryContent = requestParameters.BinaryData;
                        ctx.DataWorkspace.ApplicationData.SaveChanges();

                        responseParameters.UploadStatus = "ok";
                        responseParameters.FileSize = ConvertBytesToMegabytes(fileMetaData.FileStore.FileBinaryContent.LongCount()).ToString("0.00") + " MB";
                        responseParameters.ReferencedEntitySet = requestParameters.ReferencedEntitySet;
                        responseParameters.ReferenceId = requestParameters.ReferenceId;
                        return Request.CreateResponse<FileUploadResponseParameters>(HttpStatusCode.Accepted, responseParameters);
                    }
                    else
                    {
                        throw new HttpResponseException(HttpStatusCode.NotFound);
                    }

                }
                else
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
            }
        }

        private double ConvertBytesToMegabytes(long bytes)
        {
            return (bytes / 1024f) / 1024f;
        }

     }
}