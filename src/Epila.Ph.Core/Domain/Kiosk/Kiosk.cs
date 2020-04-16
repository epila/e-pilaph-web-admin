namespace Epila.Ph.Core.Domain.Kiosk
{
    public class Kiosk : BaseEntity
    {
        public int  Id { get; set; }
        public string KioskName { get; set; }
        public string KioskDescription { get; set; }
    }
}
