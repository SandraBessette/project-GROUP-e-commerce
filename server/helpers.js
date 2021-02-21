const compareAscPrice = (a, b) =>{  
    return parseFloat(a.price.replace(/[$,]/g,"")) - parseFloat(b.price.replace(/[$,]/g,""));
  };
  
  const compareDescPrice = (a, b) =>{
    return parseFloat(b.price.replace(/[$,]/g,"")) - parseFloat(a.price.replace(/[$,]/g,""));
  };
  
  const sortAndFilter = (itemsArray, sortBy, priceFilter, bodyLocationFilter, bodyLocationObject) =>{   
    
    if (priceFilter) {
      const gte = priceFilter.gte ? priceFilter.gte : 0;
      const lte = priceFilter.lte ? priceFilter.lte : Number.MAX_SAFE_INTEGER;
      itemsArray = itemsArray.filter((item)=>{  
          return parseFloat(item.price.replace(/[$,]/g,"")) >= gte &&  parseFloat(item.price.replace(/[$,]/g,"")) < lte; 
        });
    }
    
    if (bodyLocationFilter) {  
      const validBodyLocationFilter = bodyLocationFilter.filter((bodyLocation)=>{      
        return bodyLocationObject[bodyLocation] !== undefined;
      });
      
      if (validBodyLocationFilter.length !== 0) { 
        itemsArray = itemsArray.filter((item)=>{  
            if (item.body_location)       
              return validBodyLocationFilter.includes(item.body_location.toLowerCase());
            else false;        
        });
      }
    }

    if (sortBy === '+price') {
      itemsArray.sort(compareAscPrice);      
    }

    if (sortBy === '-price') {
      itemsArray.sort(compareDescPrice);      
    }
    return itemsArray;  
  };

  module.exports = {
    sortAndFilter,
    compareAscPrice,
    compareDescPrice,   
   
  };
  