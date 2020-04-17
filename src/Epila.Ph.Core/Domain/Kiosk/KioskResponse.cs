using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Epila.Ph.Core.Domain.Kiosk
{
    public  class KioskResponse
    {
        [JsonPropertyName("message")]
        public string  Message { get; set; }
        [JsonPropertyName("isError")]
        public bool IsError { get; set; }
        [JsonPropertyName("result")]
        public IReadOnlyCollection<Kiosk> Result { get; set; }
    }
}
