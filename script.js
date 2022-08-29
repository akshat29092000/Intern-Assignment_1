const Data = [
    {
        "id": 1,
        "name": "food card",
        "description": "This card is used for spending on Food merchants",
        "final_price": 21,
        "original_price": 10,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/orange_card.png",
        "inCart": 0
    },
    {
        "id": 2,
        "name": "travel card",
        "description": "This card is used for spending on Travel and hotel bookings",
        "final_price": 20,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_card.png",
        "inCart": 0
    },
    {
        "id": 3,
        "name": "epic card",
        "description": "Use this card and get benefits on every transaction",
        "final_price": 30,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/golden_card.png",
        "inCart": 0
    },
    {
        "id": 4,
        "name": "happay premium card",
        "description": "Use this card and get benefits on every transaction",
        "final_price": 40,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/black_card.png",
        "inCart": 0
    }
];


    (function () {
        for (let item of Data) {
            const cardContainer = document.getElementById('cardContainer');
            const itemContainer = document.createElement('div');
            itemContainer.classList.add("itemContainer");

            const imgtag = document.createElement('img');
            imgtag.src = item?.img_url;
            imgtag.style.width = '100%';
            itemContainer.appendChild(imgtag);

            const cardDetails = document.createElement('div');
            cardDetails.classList.add("cardDetails");

            const cardName = document.createElement('div');
            cardName.textContent = item?.name.split("-").join(" ").toLocaleLowerCase();
            cardDetails.appendChild(cardName);

            const cardAmt = document.createElement('div');
            cardAmt.textContent = `$${item?.final_price}`;
            cardDetails.appendChild(cardAmt);

            itemContainer.appendChild(cardDetails);

            const cardDesc = document.createElement('p');
            cardDesc.setAttribute('class','card-desc');
            cardDesc.textContent = item?.description;
            itemContainer.appendChild(cardDesc);
            const valueInCart = JSON.parse(localStorage.getItem("productsInCart"))?.[item?.name]?.inCart;

            const buttonContainer  = document.createElement("div");
            const addElement = document.createElement("button");
            const removeElement = document.createElement("button");
            const addToCardBtn = document.createElement("div");
            addElement.setAttribute("id", `add_${item?.name}`);
            removeElement.setAttribute("id", `remove_${item?.name}`);
            addToCardBtn.setAttribute("id", `button-${item?.name}`);
            addToCardBtn.classList.add("addToCardBtn");
            addToCardBtn.textContent = valueInCart || "Add To Cart";

            addElement.textContent = "+";
            removeElement.textContent = "-";
            buttonContainer.setAttribute("class","button-container");
            removeElement.setAttribute("class","border-r");
            addElement.setAttribute("class","border-l");
            buttonContainer.appendChild(removeElement);
            buttonContainer.appendChild(addToCardBtn);
            buttonContainer.appendChild(addElement);


            itemContainer.appendChild(buttonContainer);

            cardContainer.appendChild(itemContainer);

        }
    }
)
();



function toggleLeftBar() {
    const navBar = document.getElementsByTagName('nav')[0];
    const rightIcon = document.getElementsByClassName('rightIcon')[0];
    const leftIcon = document.getElementsByClassName('leftIcon')[0];

    const itemContainer = document.getElementsByClassName('itemContainer');
    let navBarStyle = navBar?.style;

    // for(let item of itemContainer){
    //     item.style.marginLeft = navBarStyle?.width === '10%' ? '15%' : '3%';
    // }
    if (navBarStyle?.width == '15%') {
        navBarStyle.width = '30%';
        rightIcon.style.display = 'none';
        leftIcon.style.display = 'block';
    }
    else {
        navBarStyle.width = '15%';
        rightIcon.style.display = 'block';
        leftIcon.style.display = 'none';
    }

}


let carts = document.getElementsByClassName("addToCardBtn");

const containerEle = document.getElementById("cardContainer");

containerEle.addEventListener("click", (event) => {
  const targetElement = event.target.id;
  const [action, card] = targetElement.split("_");
  let cards = JSON.parse(localStorage.getItem("productsInCart"));
  const currentCard = cards?.[card];

  const currentProduct = Data.find((el) => el.name === card);
  const buttonEle = document.getElementById(`button-${card}`);
  const currentCardCartValue = currentCard?.inCart || 0;
  let totalCartValue = +localStorage.getItem("totalCartValue") || 0;

  if (action === "remove" && currentCardCartValue > 0) {
    cards = {
      ...cards,
      [card]: {
        ...currentProduct,
        inCart: currentCardCartValue - 1,
      },
    };

    totalCartValue = totalCartValue - 1;

    buttonEle.textContent = currentCardCartValue - 1;
  } else if (action === "add") {
    cards = {
      ...cards,
      [card]: {
        ...currentProduct,
        inCart: currentCardCartValue + 1,
      },
    };
    totalCartValue = totalCartValue + 1;
    buttonEle.textContent = currentCardCartValue + 1;
  }

  document.querySelector(".cart span").textContent = totalCartValue;

  localStorage.setItem("productsInCart", JSON.stringify(cards));
  localStorage.setItem("totalCartValue", totalCartValue);
});



 function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('totalCartValue');
        if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
        }
    }
    onLoadCartNumbers();


// let addToCardBtn = document.querySelectorAll('.addToCardBtn')

// for (let i = 0; i < addToCardBtn.length; i++) {
//     addToCardBtn[i].addEventListener('click', () => {
//         cartNumbers(Data[i]);
//         totalCost(Data[i]);
//     })
// }


// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     if(productNumbers){
//     document.querySelector('.cart span').textContent = productNumbers;
//     }
// }

// function cartNumbers(Data) {
//     // console.log(Data);
//     let productNumbers = localStorage.getItem('cartNumbers');
//     productNumbers = parseInt(productNumbers);
//     if (productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers + 1);
//         document.querySelector('.cart span').textContent = productNumbers + 1;
//     }
//     else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.cart span').textContent = 1;
//     }
//     setItems(Data);
// }

// function setItems(Data) {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     if (cartItems != null) {
//         if (cartItems[Data.name] == undefined) {
//             cartItems = {
//                 ...cartItems,
//                 [Data.name]: Data
//             }
//         }
//         cartItems[Data.name].inCart += 1;
//     }
//     else {
//         Data.inCart = 1;
//         cartItems = {
//             [Data.name]: Data
//         }
//     }
//     localStorage.setItem("productsInCart", JSON.stringify(cartItems));

// }

// function totalCost(Data) {
//     let cartCost = localStorage.getItem('totalCost');

//     if (cartCost != null) {
//         cartCost = parseInt(cartCost);
//         localStorage.setItem("totalCost", cartCost + Data.final_price);
//     }
//     else{
//         localStorage.setItem("totalCost", Data.final_price);
//     }
// }
// onLoadCartNumbers();




