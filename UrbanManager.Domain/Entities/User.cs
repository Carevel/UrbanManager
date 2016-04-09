using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrbanManager.Domain.Entities
{
    public class User
    {
        public string userCardId { get; set; }
        public string userName { get; set; }
        public string deptCode { get; set; }
        public string deptName { get; set; }
        public string deptType { get; set; }
        public string authorizeHeShi { get; set; }
        public string authorizeHeCha { get; set; }
        public string deptLv { get; set; }
        public string platformId { get; set; }
        public string platformName { get; set; }
        public string streetCode { get; set; }
        public string postion { get; set; }
        public string upCode { get; set; }
        public string identification { get; set; }
        public string homePage { get; set; }
    }
}
