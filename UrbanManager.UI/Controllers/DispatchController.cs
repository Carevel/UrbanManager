using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UrbanManager.UI.Controllers
{
    /// <summary>
    /// 派遣
    /// </summary>
    public class DispatchController : Controller
    {
        // GET: Dispatch
        public ActionResult Index()
        {
            return View();
        }

        // GET: Dispatch/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Dispatch/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Dispatch/Create
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

        // GET: Dispatch/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Dispatch/Edit/5
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

        // GET: Dispatch/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Dispatch/Delete/5
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
