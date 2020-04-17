using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epila.Ph.Services.Kiosk;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Components.Kiosk
{
    public class KioskClinicTemplateViewComponent : ViewComponent
    {
        public readonly IKioskService KioskService;

        public KioskClinicTemplateViewComponent(IKioskService kioskService)
        {
            KioskService = kioskService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var kioskList = await KioskService.GetAllAsync().ConfigureAwait(false);
            return await Task.FromResult<IViewComponentResult>(View("Default",kioskList)).ConfigureAwait(false);
        }
    }
}
