using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Epila.Ph.Core.Domain.Kiosk;

namespace Epila.Ph.Services.Kiosk
{
    public class KioskService : HttpClientBase, IKioskService
    {
        public KioskService(HttpClient ePilaHttpClient) : base(ePilaHttpClient)
        {
        }

        public async Task<IEnumerable<Core.Domain.Kiosk.Kiosk>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Core.Domain.Kiosk.Kiosk> GetByIdAsync(object id)
        {
            throw new NotImplementedException();
        }

        public async Task<Core.Domain.Kiosk.Kiosk> CreateAsync(KioskRequest entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Core.Domain.Kiosk.Kiosk> UpdateAsync(KioskRequest entity, object id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAsync(object id)
        {
            throw new NotImplementedException();
        }
    }
}
