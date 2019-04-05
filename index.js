
const amazon = require('./amazon');

(async () => {
  
  await amazon.initialize();

  let details = await amazon.getProductDetails('https://www.amazon.com/Apple-MK482LL-27-Inch-Quad-Core-Refurbished/dp/B01N4HJ8MU');
  debugger
 // await browser.close();
  
})();