using System.Text.Json.Serialization;

namespace Epila.Ph.Core.Domain.Kiosk
{
    public class Kiosk : BaseEntity
    {
        [JsonPropertyName("id")]
        public int  Id { get; set; }
        [JsonPropertyName("kioskName")]
        public string KioskName { get; set; }
        [JsonPropertyName("kioskDescription")]
        public string KioskDescription { get; set; }
    }
}
