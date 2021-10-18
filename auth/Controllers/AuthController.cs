using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AADIdentity.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = OpenIdConnectDefaults.AuthenticationScheme)]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        public ITokenAcquisition TokenAcquisition { get; }
        public IConfiguration Configuration { get; }

        public AuthController(ITokenAcquisition tokenAcquisition, IConfiguration configuration)
        {
            TokenAcquisition = tokenAcquisition;
            Configuration = configuration;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("name")]
        [AllowAnonymous]
        public IActionResult UserName()
        {
            return Ok(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "name")?.Value);
        }

        [HttpGet("token")]
        public async Task<IActionResult> AcquireToken()
        {
            var token = await TokenAcquisition.GetAccessTokenForUserAsync(new[] { Configuration[Globals.SCOPE_READ_CONFIG] });

            return Ok(token);
        }
    }
}
