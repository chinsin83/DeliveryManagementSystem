
namespace LightSwitchApplication.Poco
{
    public class FileUploadResponseParameters
    {
        public string UploadStatus { get; set; }
        public string FileSize { get; set; }
        public string ReferencedEntitySet { get; set; }
        public int? ReferenceId { get; set; }
    }
}