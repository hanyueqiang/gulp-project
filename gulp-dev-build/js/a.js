const a = "this is a module";
const aObj = {
  a,
};
const aHandle = (obj) => {
  console.log(obj.a);
};
aHandle(aObj);
