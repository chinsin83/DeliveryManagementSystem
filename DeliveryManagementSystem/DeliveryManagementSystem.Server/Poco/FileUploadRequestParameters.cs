

namespace LightSwitchApplication.Poco
{
    public class FileUploadRequestParameters
    {
        public string FileName { get; set; }
        public byte[] BinaryData { get; set; }
        public string ReferencedEntitySet { get; set; }
        public int ReferenceId { get; set; }
    }
    
}