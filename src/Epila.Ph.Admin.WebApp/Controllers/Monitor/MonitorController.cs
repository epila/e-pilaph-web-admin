using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Epila.Ph.Admin.WebApp.Controllers.Monitor
{
    public class MonitorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}