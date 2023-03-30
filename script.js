//#region <Declarations>
const factButton = document.querySelector("#factButton");
const factCard = document.querySelector("#factCard");
const factCardText = document.querySelector("#factCardText");
const factCardSetup = document.querySelector("#factCardSetup");
const likedJokesButton = document.querySelector("#likedJokes");
const cardsContainer = document.querySelector("#cardsContainer");


const likeButton = document.querySelector("#like");
const dislikeButton = document.querySelector("#dislike");

const likedJokes = [];
const dislikedJokes = [];

let type = "";
//#endregion
//#region <First Joke Call>
$.ajax({
    type: "GET",
    url : "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit",
    success: function(response){
        console.log("Response type:"+response["type"]);
        if(response["type"] == "single"){
            factCardSetup.innerHTML = "";
            //factCardText.value = "single";
            type = "single";
            console.log("Type saved:"+type)
            factCardText.innerHTML = response["joke"];
            return;
        }

        //factCardText.value = "twopart";
        type = "twopart";
        console.log("Type saved:"+type)
        factCardSetup.innerHTML = response["setup"];
        factCardText.innerHTML = response["delivery"];

    },
    error: function(response){
        alert("Something went wrong, jokes not available atm.");
    }
  });
//#endregion


//#region <New Joke>
let fails = 0;
factButton.addEventListener('click',function(e){
    
    if(fails == 5){
        factCardSetup.innerHTML = "";

            factCardText.innerHTML = "No new jokes for you :(";
        return;
    };
    
    $.ajax({
        type: "GET",
        async:false,
        url : "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit",
        success: function(response){
            
            let skipRest = false;
            $(factCard).hide(300);
            setTimeout(300);

            console.log("Response type:"+response["type"]);
            if(response["type"] == "single"){
                factCardSetup.innerHTML = "";
                //factCardText.value = "single";
                console.log("Type saved:"+type);
                type = "single";
                factCardText.innerHTML = response["joke"];
                
                $(factCard).show(300);
                return;
            }
    
            //factCardText.value = "twopart";
            type = "twopart";
            console.log("Type saved:"+type)
            factCardSetup.innerHTML = response["setup"];
            factCardText.innerHTML = response["delivery"];
            
            $(factCard).show(300);
        },
        error: function(response){
            alert("Something went wrong, jokes not available atm.");
        }
        });

    
     
});
//#endregion
likeButton.addEventListener('click',function(e){
    
    if(type == "single"){
        let x = {};
        x.type = "single";
        x.joke = factCardText.innerHTML;

        likedJokes.push(x);
        console.log(likedJokes);
        return;
    }

    let x = {};
        x.type = "twopart";
        x.setup = factCardSetup.innerHTML;
        x.delivery = factCardText.innerHTML;
    likedJokes.push(x);
    console.log(likedJokes);

});

dislikeButton.addEventListener('click',function(e){
    if(type == "single"){
        let x = {};
        x.type = "single";
        x.joke = factCardText.innerHTML;

        dislikedJokes.push(x);
        console.log(likedJokes);
        return;
    }

    let x = {};
        x.type = "twopart";
        x.setup = factCardSetup.innerHTML;
        x.delivery = factCardText.innerHTML;
    dislikedJokes.push(x);
    console.log(likedJokes);
});

likedJokesButton.addEventListener('click',function(e){
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
      }
    likedJokes.forEach(joke =>{
        const card = document.createElement("div");
        card.className = "card"

        const img = document.createElement("img");
        img.src = "smiley-face-beach-ball-smiley-face-beach-ball-isolated-white-156236219.jpg";
        img.alt = "smiley face";
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardSetup = document.createElement("p");
        cardSetup.className = "card-text";
        const cardText = document.createElement("p");
        cardText.className = "card-text";

        if(joke.type = "single"){
            cardText.innerHTML = joke.joke;
        }else{
            cardText.innerHTML = joke.delivery;
            cardSetup.innerHTML = joke.setup;
        }

        cardBody.appendChild(cardText);
        cardBody.appendChild(cardSetup);

        card.appendChild(img);
        card.appendChild(cardBody);
        cardsContainer.appendChild(card);

    });
});