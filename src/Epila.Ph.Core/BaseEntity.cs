using System;
using System.Text.Json.Serialization;

namespace Epila.Ph.Core
{
    public  class BaseEntity
    {
        //Add common Properties here that will be used for all your entities
        [JsonPropertyName("createdBy")]
        public string CreatedBy { get; set; }
        [JsonPropertyName("updatedBy")]
        public string UpdatedBy { get; set; }
        [JsonPropertyName("createdDate")]
        public DateTime CreatedDate { get; set; }
        [JsonPropertyName("updatedDate")]
        public DateTime UpdatedDate { get; set; }
    }
}
