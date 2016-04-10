using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrbanManager.Caching.Services
{
    public interface ICacheService
    {
        object GetObject<T>(string key);
        void Put<T>(string key, T value);
        void Put<T>(string key, T value, TimeSpan validFor);
        void Remove(string key);
        void Clear();
    }
}
