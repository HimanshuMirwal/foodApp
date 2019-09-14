// 'Best Match': 'best_match',
// 'Highest Rated': 'rating',
// 'Most Reviewed': 'review_count'


function getRecipes() {
    var dish = document.getElementById("dish").value;
    var loc = document.getElementById("location").value;
    if (dish.length <= 3 || loc.length <= 3) {
        alert("Please Enter Some Correct Data.");
    }
    else {
        alert("Please wait! searching your dish.");
        var i = 0;
        const apiKey = 'uQb6ZCfYFjQXldQponTz3_mrJBTBAzP1bPQD9tj2k9kLzmvU4oDyAfT296myPGLr9T_DSLgoEdUKUNK4UGyvBE4Siy59haHWp8PSQwrYuGjx1htOyHAhkTEEEsQEXXYx';
        fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="${dish}"&location="${loc}"`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            document.getElementById("main").innerHTML = "";
            console.log(jsonResponse);
            while (i < 24 && jsonResponse.businesses[i].image_url != "") {

                var main = document.getElementById("main");

                var ChildIncomeDiv = document.createElement("div");
                ChildIncomeDiv.setAttribute("id", "ChildIncomeDiv" + i);
                ChildIncomeDiv.setAttribute("class", "child");
                main.appendChild(ChildIncomeDiv);

                // console.log(jsonResponse.businesses[i].image_url);
                document.getElementById("ChildIncomeDiv" + i).innerHTML = `<img src=${jsonResponse.businesses[i].image_url} height="200px" width="300px" />
                                                                    <br>
                                                                    <h2><i>${jsonResponse.businesses[i].name.substring(0, 15)}</i></h2>
                                                                    <br>
                                                                    <a href=${jsonResponse.businesses[i].url}>
                                                                    <h3>
                                                                    <i>
                                                                    BUY
                                                                    </i>
                                                                    </h3>
                                                                    </a>`;

                ChildIncomeDiv.addEventListener("mouseover", function () {
                    document.getElementById("ChildDivDetails").innerHTML="";
                    document.getElementById("ChildDivDetails").style="";
                    var str = this.id;
                    var res = str.replace(/\D/g, "");
                    console.log(jsonResponse.businesses[res]);
                    document.getElementById("ChildDivDetails").class="ChildDivDetails11";
                    
                    document.getElementById("ChildDivDetails").innerHTML=
                    `<img id="curr_image" src="${jsonResponse.businesses[res].image_url}" height="270px" width="270px"/>
                     <h2>${jsonResponse.businesses[res].name.substring(0, 15)}</h2>
                     <hr>
                 <b><h3>address : <p>${jsonResponse.businesses[res].location.address1}, ${jsonResponse.businesses[res].location.city}, ${jsonResponse.businesses[res].location.zip_code}, ${jsonResponse.businesses[res].location.country}</p></h3></b>
                     <br>
                     <br>
                     <b><h3>rating : <p>${jsonResponse.businesses[res].rating}</p></h3></b>
                    <b><h3>review count: <p>${jsonResponse.businesses[res].review_count}</p></h3></b>
                    <h2><a onclick="remove()">close</a></h2>`;
                });
                i++;
            }
        });
    }
    document.getElementById("dish").value = "";
    document.getElementById("location").value = "";

}

function remove(){
    document.getElementById("ChildDivDetails").innerHTML="";
    document.getElementById("ChildDivDetails").style="";
}