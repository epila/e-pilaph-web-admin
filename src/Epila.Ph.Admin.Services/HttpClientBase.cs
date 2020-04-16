using System.Net.Http;

namespace Epila.Ph.Services
{
    public class HttpClientBase
    {
        protected readonly HttpClient EPilaHttpClient;

        public HttpClientBase(HttpClient ePilaHttpClient)
        {
            EPilaHttpClient = ePilaHttpClient;
        }
    }
}
