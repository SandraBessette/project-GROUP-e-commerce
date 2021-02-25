const items = require("./data/items");
const companies = require("./data/companies");
const purchases = require("./data/purchases");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { sortAndFilter } = require("./helpers");



const getSingleItem = (req, res) => {
  const id = req.params.id;

  const oneItem = items.find((item) => item._id == id);

  if (oneItem) {
    res.status(200).json({ status: 200, message: "success", data: oneItem });
  } else {
    res.status(404).json({
      status: 404,
      message: "That item does not exist in the database",
    });
  }
};

const getCompanyById = (req, res) => {
  const id = req.params.id;
  const oneItem = items.find((item) => item._id == id);
  if (!oneItem) {
    return (res.status(404).json({
            status: 404,
            message: "That company does not exist in the database",
          }));
  }
  const findCompanyId = oneItem.companyId;
  const findCompany = companies.find((company) => company._id == findCompanyId);
  if (findCompany) {
    res.status(200).json({ status: 200, message: "success", data: findCompany });
  } else {
    res.status(404).json({
      status: 404,
      message: "That company does not exist in the database",
    });
  }
};


const getItems = (req, res) => {    
  const { sort_by, price, body_location } = req.query;  
 
  //determine valid body location
  let bodyLocationObject = {};
  items.forEach(item => {
    if (item.body_location)
      bodyLocationObject[item.body_location.toLowerCase()] = true;
  });

   //We need to clone the array because we want to keep the original intact and keep our default order. 
  let clonedItems = JSON.parse(JSON.stringify(items)); 
  //sort and filter the items if needed   
  clonedItems = sortAndFilter(clonedItems, sort_by, price, body_location, bodyLocationObject); 
  
  res.status(200).json({ status: 200, message: "success", data: {items: clonedItems, bodyLocation: bodyLocationObject }});

}

const getCompagnies = (req, res) => {
  res.status(200).json({ status: 200, message: "success", data: companies });
};

const getItemsCategory = (req, res) => {

    const { category } = req.params;   
    const { sort_by, price, body_location } = req.query; 
    console.log(req.query);
   
    if ( !category)
      return res.status(400).json({ status: 400, message: "unknown category", data: {category} });

   //filter the group by category
    let itemsGroup = items.filter((item)=>{    
          if (item.category)    
            return item.category.toLowerCase().replace(/\s/g, "") === category.toLowerCase();  
          return false;     
    });

    if (itemsGroup.length === 0)
      return res.status(404).json({ status: 404, message: "category not found", data: {category} });

    //determine valid body location for a category
    let bodyLocationObject = {};  
    itemsGroup.forEach(item => {   
      if (item.body_location)
        bodyLocationObject[item.body_location.toLowerCase()] = true;
    });

    //sort and filter the items if needed
    itemsGroup = sortAndFilter(itemsGroup, sort_by, price, body_location, bodyLocationObject);   
    
    return res.status(200).json({ status: 200, message: "success", data: {items: itemsGroup , bodyLocation: bodyLocationObject }});  

    

};

// add a purchase "/purchase"
const addPurchase = (req, res) => {
  const newId = uuidv4();

  const {
    givenName,
    surname,
    email,
    phoneNumber,
    addressLine1,
    city,
    province,
    country,
    postcode,
    cN,
    eD,
    nB,
    newItems,
  } = req.body;
  const purchase = {
    id: newId,
    givenName,
    surname,
    email,
    phoneNumber,
    addressLine1,
    city,
    province,
    country,
    postcode,
    cN,
    eD,
    nB,
    newItems,
  };
  

    const itemsArray = [...purchase.newItems];
    itemsArray.forEach(myFunction);

    function myFunction(item, index, arr) {
      arr[index] = item.numInStock < item.quantity ? item.name : "";
    }
    const value = "";
    errorArray = itemsArray.filter((item) => item !== value);
 
    console.log(errorArray);

    if (errorArray.length > 0) {
      res.status(400).json({
        status: "error",
        error:
          "This quantity of stock is not available for the following items - - \r\n" +
          itemsArray +
          " \r\n - - Please reduce the quantity and try again.",
      });
    } else {     
        purchases.push(purchase);
        fs.writeFileSync("./data/purchases.json", JSON.stringify(purchases)); 
        purchase.newItems.forEach((itemPurchase)=>{
          items.forEach((item, index)=>{        
            if (item._id === itemPurchase._id){              
              items[index].numInStock -= itemPurchase.quantity;              
            }
          })
        });
        res.status(201).send({
          status: 201,
          data: purchase,
        });
    } 

};


module.exports = {
  getSingleItem,
  getCompanyById,
  getCompagnies,
  getItems,
  addPurchase,
  getItemsCategory,
};
