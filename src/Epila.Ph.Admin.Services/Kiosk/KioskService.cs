using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Epila.Ph.Core.Constants;
using Epila.Ph.Core.Domain.Kiosk;
using AutoWrapper.Server;
namespace Epila.Ph.Services.Kiosk
{
    public class KioskService : HttpClientBase, IKioskService
    {
        public KioskService(HttpClient ePilaHttpClient) : base(ePilaHttpClient)
        {
        }

        public async Task<IReadOnlyCollection<Core.Domain.Kiosk.Kiosk>> GetAllAsync()
        {
            using var response = await EPilaHttpClient.GetAsync("")
                .ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            await using var responseStream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false);
            var result = await JsonSerializer.DeserializeAsync<KioskResponse>(responseStream);
            return result.Result;
        }

        public async Task<Core.Domain.Kiosk.Kiosk> GetByIdAsync(object id)
        {
            using var response = await EPilaHttpClient.GetAsync($"{id}")
                .ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
             var jsonString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            var result = Unwrapper.Unwrap<Core.Domain.Kiosk.Kiosk>(jsonString);
            return result;
        }

        public async Task<Core.Domain.Kiosk.Kiosk> CreateAsync(KioskRequest entity)
        {
            HttpContent content = new StringContent(JsonSerializer.Serialize(entity), Encoding.UTF8, HttpContentMediaTypes.JSON);
            using var response = await EPilaHttpClient.PostAsync("", content)
                .ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            var jsonString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            var result = Unwrapper.Unwrap<Core.Domain.Kiosk.Kiosk>(jsonString);
            return result;
        }

        public async Task<Core.Domain.Kiosk.Kiosk> UpdateAsync(KioskRequest entity, object id)
        {
            HttpContent content = new StringContent(JsonSerializer.Serialize(entity), Encoding.UTF8, HttpContentMediaTypes.JSON);
            using var response = await EPilaHttpClient.PutAsync($"{id}", content)
                .ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            var jsonString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            var result = Unwrapper.Unwrap<Core.Domain.Kiosk.Kiosk>(jsonString);
            return result;
        }

        public async Task<bool> DeleteAsync(object id)
        {
            using var response = await EPilaHttpClient.DeleteAsync($"{id}")
                .ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            var jsonString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            var result = Unwrapper.Unwrap<bool>(jsonString);
            return result;
        }
    }
}
