using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LightSwitchApplication
{
    public abstract class LightSwitchApiControllerbase : ApiController
    {
        private ServerApplicationContext _context;

        public ServerApplicationContext Context
        {
            get
            {
                return _context;
            }
        }

        public ServerApplicationContext GetContext()
        {

            return _context;
        }

        public LightSwitchApiControllerbase()
        {
            _context = ServerApplicationContext.Current;
            if (_context == null)
            {
                _context = ServerApplicationContext.CreateContext();
            }
        }

    }
}
