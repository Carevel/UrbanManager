using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UrbanManager.Domain.Entities;

namespace UrbanManager.Domain.Services
{
    public interface IPowerManagerDomainService
    {
        void AssignPower(User user, Role role);
    }
}
