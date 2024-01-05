const cards = [];

// let mainDiv = document.getElementById("my-table");

function onSubmit(e) {
  var inp_Name = inputName.value;
  var inp_Website = inputUrl.value;
  var inp_Email = inputEmail.value;
  var inp_img = inputImg.value;
  let inp_Gender = "";

  // console.log(inp_img);

  if (document.getElementById("female").checked) {
    inp_Gender = "Female";
  } else {
    inp_Gender = "Male";
  }

  var skill = [];
  var checkBoxQuery = document.querySelectorAll(
    'input[id="inlineCheckbox1"]:checked'
  );
  checkBoxQuery.forEach((element) => {
    // console.log(element.value);
    skill.push(element.value);
  });

  const inputData = {
    name: inp_Name,
    gender: inp_Gender,
    email: inp_Email,
    url: inp_Website,
    img: inp_img,
    skills: skill,
  };

  const errors = validate(inputData);

  //   console.log("Errors: ", errors);

  if (Object.keys(errors).length > 0) {
    alert(JSON.stringify(errors, null, 2)); //show invalid if input is incorrect
  } else {
    cards.push(inputData); //else push inputData object in cards array
    const fadeIn = "fade-in"; //for fadeIn effect

    let newCard = `
          <div class="my-card-content ${fadeIn}">
          <div class="my-card-content-desc">
            <p id="input-name" style="font-size: large; font-weight: 500">
              ${inp_Name}
            </p>
            <p>${inp_Gender}</p>
            <p id="input-email">${inp_Email}</p>
            <a
              href="${inp_Website}"
              target="_blank"
              id="input-url"
              >${inp_Website}</a
            >
            <p id="input-skill">${skill}</p>
          </div>
          <div class="my-card-content-img ">
              <img src=${inp_img} alt="Image" width="100px" height="100px">
          </div>
        </div>
          `;

    mainDiv.innerHTML += newCard;

    // console.log("newCard", newCard);

    const cardElement = document.getElementsByClassName("my-card-content"); // getting cardElement

    //to halt the animation process we used setTimeout
    setTimeout(() => {
      Array.prototype.forEach.call(cardElement, (element) => {
        // console.log("ITEM", element);
        element.classList.remove(fadeIn);
      });
    }, 500);

    onClear();
  }
}

function onClear() {
  inputName.value = "";
  inputEmail.value = "";
  inputUrl.value = "";
  inputImg.value = "";

  for (var i = 0; i < 3; i++) {
    inlineCheckbox1[i].checked = false;
  }
}

function validate(values) {
  let errors = {}; //error object
  //regex for validation
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  var urlReg = /^(ftp|http|https):\/\/[^ "]+$/;
  var imgReg = /^(?:(?:(?:ftp|http)s?):\/\/)?[^ "]+$/;

  if (values.name.length <= 0) {
    errors.name = "This field cannot be empty";
  }

  if (values.email.length <= 0) {
    errors.email = "This field cannot be empty";
  } else if (!emailReg.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (values.url.length <= 0) {
    errors.url = "This field cannot be empty";
  } else if (!values.url.match(urlReg)) {
    errors.url = "Invalid Url";
  }

  if (values.img.length <= 0) {
    errors.img = "This field cannot be empty";
  } else if (!values.img.match(imgReg)) {
    errors.img = "Invalid Url";
  }

  if (values.skills.length <= 0) {
    errors.skills = "Please select atleast one skill";
  }

  return errors;
}
