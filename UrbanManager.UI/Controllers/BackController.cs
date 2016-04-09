using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UrbanManager.UI.Controllers
{
    /// <summary>
    /// 退回
    /// </summary>
    public class BackController : Controller
    {
        // GET: Back
        public ActionResult Index()
        {
            return View();
        }

        // GET: Back/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Back/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Back/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Back/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Back/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Back/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Back/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
