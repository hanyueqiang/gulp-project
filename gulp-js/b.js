const b = "this is b module";
const bObj = {
  b,
};
const bHandle = (obj) => {
  console.log(obj.b);
};
bHandle(bObj);
