using System;
using System.Collections.Generic;
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
        private readonly IKioskService _kioskService;

        public KioskController(IKioskService kioskService)
        {
            _kioskService = kioskService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> FilterList()
        {
            return await Task.FromResult(ViewComponent("KioskList")).ConfigureAwait(false);
        }

        [Route("{id}")]
        public async Task<IActionResult> GetForm([FromRoute] int id)
        {
            return await Task.FromResult(ViewComponent("KioskForm", new { id })).ConfigureAwait(false);
        }

        [HttpDelete]
        [Route("{ids}")]
        public async Task<IActionResult> Delete(string ids)
        {
            var selectedKioskId = ids.Split(',');
            var successDeleted = new List<int>();
            foreach (var id in selectedKioskId)
            {
                var result = await _kioskService.DeleteAsync(int.Parse(id)).ConfigureAwait(false);
                if (result)
                {
                    successDeleted.Add(int.Parse(id));
                }
            }
            return Ok(new { ids = string.Join(',',successDeleted)});
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Save(KioskRequest kiosk, int id)
        {
            try
            {
                Core.Domain.Kiosk.Kiosk result;
                if (id > 0)
                {
                    result = await _kioskService.UpdateAsync(kiosk, id).ConfigureAwait(false);
                }
                else
                {
                    result = await _kioskService.CreateAsync(kiosk).ConfigureAwait(false);
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(new {kiosk,error=e.Message});
            }
           
        }

        [Route("{id}")]
        public async Task<IActionResult> Details([FromRoute]int id)
        {
            return await Task.FromResult(ViewComponent("KioskDetail", new { id })).ConfigureAwait(false);
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

        public IActionResult New()
        {
            return View();
        }

    }
    public class DeleteKioskParam
    {
        public List<int> Ints { get; set; }
    }
}