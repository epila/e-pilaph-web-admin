using System;

namespace Epila.Ph.Core
{
    public  class BaseEntity
    {
        //Add common Properties here that will be used for all your entities
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
