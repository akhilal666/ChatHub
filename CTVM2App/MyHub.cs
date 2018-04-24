using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace CTVM2App
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        [HubMethodName("announceToEverybody")]
        public void Announce(string message,string type)
        {
            if (type=="string")
            {

            Clients.All.Announce(message,type);
            }
            else if (type == "image")
            {

                Clients.All.Announce(message, type);
            }
            }

        public DateTime GetServerDateTime()
        {
            return DateTime.Now;
        }
    }
}