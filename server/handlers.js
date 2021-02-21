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
    res.status(200).json({ data: oneItem });
  } else {
    res.status(400).json({
      status: 400,
      message: "That item does not exist in the database",
    });
  }
};

const getCompanyById = (req, res) => {
  const id = req.params.id;
  const oneItem = items.find((item) => item._id == id);
  const findCompanyId = oneItem.companyId;
  const findCompany = companies.find((company) => company._id == findCompanyId);
  if (findCompany) {
    res.status(200).json({ data: findCompany });
  } else {
    res.status(400).json({
      status: 400,
      message: "That company does not exist in the database",
    });
  }
};

const getItems = (req, res) => {
  const { sort_by, price, body_location } = req.query;

  //We need to clone the array because we want to keep the original intact and keep our default order.
  // This way of cloning an array is good only with array of JSON data.
  let clonedItems = JSON.parse(JSON.stringify(items));
  //sort and filter the items if needed
  clonedItems = sortAndFilter(clonedItems, sort_by, price, body_location);

  res.status(200).json({ status: 200, message: "success", data: clonedItems });
};

const getCompagnies = (req, res) => {
  res.status(200).json({ status: 200, message: "success", data: companies });
};

const getItemsCategory = (req, res) => {
  const { category } = req.params;
  const { sort_by, price, body_location } = req.query;
  console.log(req.query);

  if (!category)
    return res
      .status(400)
      .json({ status: 400, message: "unknown category", data: { category } });

  //filter the group by category
  let itemsGroup = items.filter((item) => {
    if (item.category)
      return (
        item.category.toLowerCase().replace(/\s/g, "") ===
        category.toLowerCase()
      );
    return false;
  });

  if (itemsGroup.length === 0)
    return res
      .status(400)
      .json({ status: 400, message: "category not found", data: { category } });

  //sort and filter the items if needed
  itemsGroup = sortAndFilter(itemsGroup, sort_by, price, body_location);

  return res
    .status(200)
    .json({ status: 200, message: "success", data: itemsGroup });
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
  console.log(purchase);
  // if (
  //   !givenName ||
  //   !surname ||
  //   !email ||
  //   !phoneNumber ||
  //   !AddressLine1 ||
  //   !City ||
  //   !Province ||
  //   !Country ||
  //   !Postcode ||
  //   !CardNumber ||
  //   !ExpiryDate ||
  //   !CVC
  // ) {
  //   res.status(400).json({
  //     status: "error",
  //     error: "missing-data",
  //   });
  // } else if (CardNumber.length !== 16) {
  //   res.status(400).json({
  //     status: "error",
  //     error: "missing-data",
  //   });
  // } else if (ExpiryDate.length !== 4) {
  //   res.status(400).json({
  //     status: "error",
  //     error: "missing-data",
  //   });
  // } else if (CVC.length !== 3) {
  //   res.status(400).json({
  //     status: "error",
  //     error: "missing-data",
  //   });
  // } else if (!email.includes("@")) {
  //   res.status(400).json({
  //     status: "error",
  //     error: "missing-data",
  //   });
  // } else {
  {
    purchases.push(req.body);
    fs.writeFileSync("./data/purchases.json", JSON.stringify(purchases));
    res.status(200).send({
      status: 200,
      data: purchase,
    });
  }
};

//unused handler for searching
// const getItemBySearch = (req, res) => {
//   const searchString = req.params.searchstring;
//   let clonedItems = JSON.parse(JSON.stringify(items));
//   let searchResults = clonedItems.filter((item, i) => {
//     return item.name.toLowerCase().includes(searchString.toLowerCase());
//   });
//   if (searchResults.length !== 0) {
//     res.status(200).json({ data: searchResults });
//   } else {
//     res.status(400).json({
//       status: 400,
//       message: "No items by that search string",
//     });
//   }
// };

module.exports = {
  getSingleItem,
  getCompanyById,
  getCompagnies,
  getItems,
  //getItemsGroup,
  addPurchase,
  getItemsCategory,
  //getItemBySearch
};
