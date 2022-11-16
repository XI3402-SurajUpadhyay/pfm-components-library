export const formatSunburstResponse = (data: any) => {
  let obj: any = {
    name: data.categoryName.substring(0,11) + '..',
  };
  if (data.totalAmount) {
    obj.value = data.totalAmount;
  }
  if (data.subCategories && data.subCategories.length) {

    obj.children = [];
   
    data.subCategories.map((category: any) => {
        obj.children.push( formatSunburstResponse(category))
    })
  }
  return obj;
};
