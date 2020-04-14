using System;
using System.Threading.Tasks;
using Epila.Ph.Admin.WebApp.Models.Kiosk;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Controllers.Kiosk
{
    [Route("[controller]/[action]")]
    public class KioskController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult New()
        {
            return View();
        }

        [Route("{template}")]
        public async Task<IActionResult> Template([FromRoute] KioskTemplateEnum template)
        {
            ViewBag.TEMPLATE = template;
            switch (template)
            {
                case KioskTemplateEnum.Custom:
                    break;
                case KioskTemplateEnum.Clinic:
                    break;
                case KioskTemplateEnum.Hotel:
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(template), template, null);
            }
            return await Task.FromResult<IActionResult>(View());
        }
    }
}