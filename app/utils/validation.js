

const validate = (value, rules) => {
    let isValid = true;
  
    for (let rule in rules) {
      switch (rule) {
        case "isEmail":
          isValid = isValid && validateEmail(value);
          break;
        case "isName":
          isValid = isValid && validateName(value);
          break;
        case "minLength":
          isValid = isValid && validateLength(value, rules[rule]);
          break;
        case "eth":
            isValid = isValid && validateETHAddresses(value, rules[rule]);
            break;
        case "minValue":
            isValid = isValid && validateMinvalue(Number(value), Number(rules[rule]));
          break;
        case "maxValue":
          isValid = isValid && validateMaxvalue(Number(value), Number(rules[rule]));
          break;
        default:
          isValid = true;
      }
    }
  
    return isValid;
  };
  
  const validateETHAddresses = address => {
    return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
  }

  const validateEmail = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      val.trim()
    );
  };
  
  const validateName = val => {
    return /^([a-zA-Z0-9 _-]+)$/.test(val.trim());
  };
  
  const validateLength = (val, length) => {
    return val.trim().length >= length;
  };
  const validateMinvalue = (val, min) => {
    return val >= min ? true : false;
  };
  const validateMaxvalue = (val, max) => {
    return val <= max ? true : false;
  };
  export default validate;
  