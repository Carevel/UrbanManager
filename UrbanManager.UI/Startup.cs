using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(UrbanManager.UI.Startup))]
namespace UrbanManager.UI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
