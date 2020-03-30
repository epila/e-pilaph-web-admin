using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Components.Kiosk
{
    public class KioskClinicTemplateViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            return await Task.FromResult<IViewComponentResult>(View("Default")).ConfigureAwait(false);
        }
    }
}
