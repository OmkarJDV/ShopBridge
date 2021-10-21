using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ItemsDataAccess;

namespace ShopBridge.Controllers
{
    public class ItemsController : ApiController
    {
        //Get method that does not accept a parameter and displays entire list
        public IEnumerable<Item> Get()
        {
        
            using(ShopBridgeEntities entities = new ShopBridgeEntities())
            {
                return entities.Items.ToList();
            }
        }

        [HttpGet]
        //Get method that accepts a parameter and displays data corresponding to that parameter.
        //Decorated with Http Get Attribute
        public HttpResponseMessage GetItemByID(int id )
        {

                using (ShopBridgeEntities entities = new ShopBridgeEntities())
                {
                   var entity = entities.Items.FirstOrDefault(i => i.id == id);
                    if (entity !=null)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Item with Id = " + id.ToString() + " not found");
                    }
                }
            
            
        }

        //Post method to add a new item to the existing data
        public HttpResponseMessage Post ([FromBody]Item item)
        {
            try
            {

                using (ShopBridgeEntities entities = new ShopBridgeEntities())
                {
                    entities.Items.Add(item);
                    entities.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, item);
                    message.Headers.Location = new Uri(Request.RequestUri +item.id.ToString());
                    return message;
                }
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
            }
        }

        //Delete method to delete an existing item
        public HttpResponseMessage Delete( int id)
        {

            try
            {
                using (ShopBridgeEntities entities = new ShopBridgeEntities())
                {
                    var entity = entities.Items.FirstOrDefault(i => i.id == id);

                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Item with id = " + id.ToString() + " not found");
                    }
                    else
                    {
                        entities.Items.Remove(entity);
                        entities.SaveChanges();

                        return Request.CreateResponse(HttpStatusCode.OK, "Item Deleted Successfully");

                    }
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);

            }
        }

        //Put method to Update an existing item from the inventory

        public HttpResponseMessage Put(int id, [FromBody] Item item)
        {
            try
            {
                using (ShopBridgeEntities entities = new ShopBridgeEntities())
                {
                    var entity = entities.Items.FirstOrDefault(i => i.id == id);
                    if (entity != null)
                    {
                        entity.Name = item.Name;
                        entity.Price = item.Price;
                        entity.Description = item.Description;
                        entity.Stock_Availability = item.Stock_Availability;
                        entities.SaveChanges();

                        return Request.CreateResponse(HttpStatusCode.OK, "Item with id = " + id.ToString() + " updated successfully");
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Item with id = " + id.ToString() + " not found");
                    }
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
            }

        }


        }
    }

