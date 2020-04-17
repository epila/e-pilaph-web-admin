using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epila.Ph.Services
{
    public interface IServiceRequest <T, in TE>
    {
        Task<IReadOnlyCollection<T>> GetAllAsync();
        Task<T> GetByIdAsync(object id);
        Task<T> CreateAsync(TE entity);
        Task<T> UpdateAsync(TE entity,object id);
        Task<bool> DeleteAsync(object id);
    }
}
