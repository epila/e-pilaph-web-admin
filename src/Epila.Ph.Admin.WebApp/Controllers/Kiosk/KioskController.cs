using System;
using System.Threading.Tasks;
using Epila.Ph.Admin.WebApp.Models.Kiosk;
using Epila.Ph.Core.Domain.Kiosk;
using Epila.Ph.Services.Kiosk;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Controllers.Kiosk
{
    [Route("[controller]/[action]")]
    public class KioskController : Controller
    {
        private readonly  IKioskService _kioskService;

        public KioskController(IKioskService kioskService)
        {
            _kioskService = kioskService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult New()
        {
            return View();
        }

        [Route("{id}")]
        public async Task<IActionResult> Details([FromRoute]int id)
        {
            return await Task.FromResult(ViewComponent("KioskDetail", new {id})).ConfigureAwait(false);
        }

        public async Task<IActionResult> Test()
        {
            //var result = await _kioskService.GetAllAsync().ConfigureAwait(false);
            //var postresult = await _kioskService.UpdateAsync(new KioskRequest
            //{
            //    KioskDescription = "Kiosk Test Desc update",
            //    KioskName = "Kiosk Test Name Update",
            //    UserName = "pita"
            //},2004).ConfigureAwait(false);
            //var delete= await _kioskService.DeleteAsync(2005).ConfigureAwait(false);
            return Json("");
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