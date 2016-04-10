using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UrbanManager.Caching.Services;

namespace UrbanManager.Caching.Helpers
{
    public class DefaultCacheServices : ICacheService
    {
        public void Clear()
        {
            throw new NotImplementedException();
        }

        public object GetObject<T>(string key)
        {
            throw new NotImplementedException();
        }

        public void Put<T>(string key, T value)
        {
            throw new NotImplementedException();
        }

        public void Put<T>(string key, T value, TimeSpan validFor)
        {
            throw new NotImplementedException();
        }

        public void Remove(string key)
        {
            throw new NotImplementedException();
        }
    }
}
