


// EMAIL VALIDATION
const emailValidation = async (email) => {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

//CSV FILE EACH ROW DATA VALIDATION
const csvValidation = async (data) => {
  try {
    // CHECK IF EMAIL FIELDS IS EMPTY OR NOT
    if (!data.email) {
      return {
        status: false,
        message: "email field is empty"
      };
    }
    // CHECK IF EMAIL FIELDS IS VALID OR NOT
    if (await emailValidation(data.email) === false) {
      return {
        status: false,
        message: "invalid email format"
      };
    }
    // CHECK IF NEWSLETTER NAME FIELDS IS EMPTY OR NOT
    if (!data.name) {
      return {
        status: false,
        message: "name field is empty"
      };
    }
    // IF ALL ABOVE FIEDS ARE NOT EMPTY THEN SEND STATUS TRUE
    return {
      status: true,
      message: "Validation success"
    };

  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  csvValidation
};

