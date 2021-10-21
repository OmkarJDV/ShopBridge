# ShopBridge
ShopBridge code for thinkbridge

The below project is part of a coding assignment for thinkbridge.
The objective of the project is to create an API application that a Product Admin can use to List the items in the inventory, Add an item to the inventory, Remove items from the inventory and Update an existing item in the inventory.

The ItemsController file attached in the project is the file that contains the definitions of the API Methods.
The Items.html is an HTML page that utilizes these API definitions and makes the calls to the API controller.
The Items.js file is the JavaScript file that is used by the Items.html file to make the API calls.
The SQLScript.txt file contains the script to create the database, table Items that contains the items(inventory) and also to add basic test items to the inventory.
The Admin.html and Admin.js files are HTML and JavaScript files respectively that are created to be added in a new project and to show the Cross Origin Resource Sharing aspect.
The ItemsDataAccess folder contains the files necessary to create a connection to the Database using the Entity Framework and contains the DbContext class.

To begin the application, user can navigate to the 'Domain'/Items.html page. Here the inventory is populated to the user.
User can perform the Add operation by adding the relevant details in the textboxes provided.
User can Delete an item by clicking the Delete from inventory button against the item.
User can Update an item by clicking the Update Inventory button against the item and then enter the corresponding data correctly.
Basic front end has been created for the application using HTML, CSS, Bootstrap,JQuery and JavaScript.
