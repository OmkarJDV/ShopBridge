const { data } = require("jquery");


function addItem() {
    var Item = {};

    if ($('#prodName').val() == "") {
        alert("Enter Item Name! ");
        return false;
    }
    else {
        Item.Name = $('#prodName').val();
    }
    if ($('#prodDesc').val() == "") {
        alert("Enter Item Description! ");
        return false;
    }
    else {
        Item.Description = $('#prodDesc').val();
    }
    if ($('#prodPrice').val() == "") {
        alert("Enter Item Price! ");
        return false;
    }
    else {
        Item.Price = $('#prodPrice').val();
    }
    if ($('#prodAvail').val() == "") {
        alert("Enter Item Availability! ");
        return false;
    }
    else {
        Item.Stock_Availability = $('#prodAvail').val();
    }

    //Item.Name = $('#prodName').val();
    //Item.Description = $('#prodDesc').val();
    //Item.Price = $('#prodPrice').val();
    //Item.Stock_Availability = $('#prodAvail').val();

    $.ajax({
        type: 'POST',
        url: '/api/items',
        data: JSON.stringify(Item),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            showInventory();
            clearFields();
        }


    });
}
function clearFields() {
    $('#prodName').val('');
    $('#prodDesc').val('');
    $('#prodPrice').val('');
    $('#prodAvail').val('');
    document.getElementById('prodNameNew').type = 'hidden';
    document.getElementById('prodDescNew').type = 'hidden';
    document.getElementById('prodPriceNew').type = 'hidden';
    document.getElementById('prodAvailNew').type = 'hidden';
    document.getElementById('prodId').type = 'hidden';
    var buttonUpdate = document.getElementById('updateButton');
    buttonUpdate.style = "display:none";
}
function showInventory() {
        $.ajax({
            type: 'GET',
            url: 'api/items',
            dataType: 'json',
            success: function (data) {
                
                if (data) {
                    
                    $('#tblItemBody').html('');
                    var row = '';

                    for (let i = 0; i < data.length; i++) {
                        row = row + "<tr>"
                            + "<td>" + data[i].Name + "</td>"
                            + "<td>" + data[i].Description + "</td>"
                            + "<td>" + data[i].Price + "</td>"
                            + "<td>" + data[i].Stock_Availability + "</td>"
                            + "<td> <button style='background-color:red;' onclick = 'itemDelete(" + data[i].id + ")'> Delete from inventory</button></td>"
                            + "<td> <button onclick = 'activateButton(" + data[i].id + ")'> Update inventory</button></td> "
                            + "</tr>";
                    }
                    $('#tblItemBody').append(row);

                }
            }
        });
}

function activateButton(id) {

    $('#prodId').val(id);

    var oldId = document.getElementById('prodId');
    oldId.type = 'text';
    var name = document.getElementById('prodNameNew');
    name.type = 'text';
    var desc = document.getElementById('prodDescNew');
    desc.type = 'text';
    var price = document.getElementById('prodPriceNew');
    price.type = 'number';
    var stock = document.getElementById('prodAvailNew');
    stock.type = 'number';
    var buttonUpdate = document.getElementById('updateButton');
    buttonUpdate.style = "display:normal";

}
    

    

function itemUpdate() {
    itemObj = {};
    itemObj.id = $('#prodId').val();

    if ($('#prodNameNew').val() == "") {
        alert("Enter Updated Item Name! ");
        return false;
    }
    else {
        itemObj.Name = $('#prodNameNew').val();
    }
    if ($('#prodDescNew').val() == "") {
        alert("Enter Updated Item Description! ");
        return false;
    }
    else {
        itemObj.Description = $('#prodDescNew').val();
    }
    if ($('#prodPriceNew').val() == "") {
        alert("Enter Updated Item Price! ");
        return false;
    }
    else {
        itemObj.Price = $('#prodPriceNew').val();
    }
    if ($('#prodAvailNew').val() == "") {
        alert("Enter Updated Item Availability! ");
        return false;
    }
    else {
        itemObj.Stock_Availability = $('#prodAvailNew').val();
    }
    $.ajax({
        type: 'PUT',
        url: '/api/items/' + itemObj.id,
        data: JSON.stringify(itemObj),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            alert('Product Updated Successfully!');
            showInventory();
            clearFields();
        }


    });}

function itemDelete(id) {
    $.ajax({
        type: 'DELETE',
        url: 'api/items/' + id,
        dataType: 'json',
        success: function (data) {
            alert("Item Deleted!");
            showInventory();
            
        }
    });
}