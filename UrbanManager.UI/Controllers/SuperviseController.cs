using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UrbanManager.UI.Controllers
{
    /// <summary>
    /// 督办
    /// </summary>
    public class SuperviseController : Controller
    {
        // GET: Supervise
        public ActionResult Index()
        {
            return View();
        }

        // GET: Supervise/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Supervise/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Supervise/Create
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

        // GET: Supervise/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Supervise/Edit/5
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

        // GET: Supervise/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Supervise/Delete/5
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
