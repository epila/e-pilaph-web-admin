using System.Threading.Tasks;
using Epila.Ph.Services.Kiosk;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Components.Kiosk
{
    public class KioskDetailViewComponent : ViewComponent
    {
        public readonly IKioskService KioskService;

        public KioskDetailViewComponent(IKioskService kioskService)
        {
            KioskService = kioskService;
        }

        public async Task<IViewComponentResult> InvokeAsync(int id)
        {
            var kioskDetail = await KioskService.GetByIdAsync(id).ConfigureAwait(false);
            return await Task.FromResult<IViewComponentResult>(View("Default",kioskDetail)).ConfigureAwait(false);
        }
    }
}
