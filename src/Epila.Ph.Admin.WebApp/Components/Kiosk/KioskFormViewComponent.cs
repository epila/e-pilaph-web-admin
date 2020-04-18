using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epila.Ph.Core.Domain.Kiosk;
using Epila.Ph.Services.Kiosk;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Components.Kiosk
{
    public class KioskFormViewComponent : ViewComponent
    {
        private readonly IKioskService _kioskService;
        public KioskFormViewComponent(IKioskService kioskService)
        {
            _kioskService = kioskService;
        }
        public async Task<IViewComponentResult> InvokeAsync(int id)
        {
            var kioskRequest = new KioskRequest();
            ViewBag.KIOSK_ID = 23;
            if (id>0)
            {
                var kiosk = await _kioskService.GetByIdAsync(id).ConfigureAwait(false);
                kioskRequest.KioskDescription = kiosk.KioskDescription;
                kioskRequest.KioskName = kiosk.KioskName;
                kioskRequest.UserName = "dennispita";
            }
            return await Task.FromResult<IViewComponentResult>(View("Form", kioskRequest)).ConfigureAwait(false);
        }
    }
}
