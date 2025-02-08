let a = 0;
let b = 2;
let seletedcard = []
let didntshowarr = []
let finalarr = []
let k = 1;

async function getimgs() {
    let a = await fetch("http://127.0.0.1:3000/imgs/")
    // console.log(a);

    let response = await a.text();
    // console.log('The response in json is ', await a.json());

    console.log("This is response", response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)
    let images = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.includes("imgs/")) {
            images.push(element.href.split("/imgs/")[1])
        }
    }
    return images;
}

function showingimgs(images, a, b) {
    console.log('THe length is ', images.length);
    if (images.length % 2 != 0 && images.length!=1) {
        if (didntshowarr.includes(images[images.length - 1])) {
            console.log('INcluded');
        }
        else {
            didntshowarr.push(images[images.length - 1])
        }
        console.log('The didnotshow array is ', didntshowarr);
    }
    let cardlist = document.querySelector(".cardlist")
    cardlist.innerHTML = ""
    for (i = a; i < b; i++) {
        let name = images[i].replaceAll("%20", " ").split("!")[0];
        let paragraphtext = images[i].replaceAll("%20", " ").split("!")[1];
        let pdata = paragraphtext.split("$")[0]
        cardlist.innerHTML = cardlist.innerHTML + `<div class="card borderradius">
            <img src = imgs/${images[i]} class="borderradius" alt="">
            <h3>${name}</h3>
            <p>${pdata}</p>
            <a href="Info/${name}.json">Information about ${name}</a>
            </div>`
    }
}

function gettingcards() {
    let cards = Array.from(document.querySelector(".cardlist").getElementsByTagName("div"))
    return cards;
}

function imgmain(images) {
    console.log(images)
    showingimgs(images, 0, 2)
    seletedcard = []
    let a = 0;
    let b = 2;
    replacingcards(images, a, b);
}

function mosthandsome(images, a, b) {
    let heading = document.querySelector(".heading")
    heading.innerHTML = ""
    for (i = a; i < b; i++) {
        let name = images[i].replaceAll("%20", " ").split("!")[0];
        heading.innerHTML = heading.innerHTML + `<h2>The most handsome is ${name}</h2>`
    }
}
function replacingcards(images, a, b) {
    gettingcards().forEach(element => {
        element.addEventListener("click", (e) => {
            console.log("First event listened")
            console.log(element)
            console.log(images);
            
            // console.log(e.srcElement.src.split("3000/")[1])
            // seletedcard.push(e.srcElement.src)
            seletedcard.push(e.srcElement.src.split("/imgs/")[1])
            console.log(seletedcard)
            element.style.backgroundColor = "gray"
            // console.log(images.length)
            console.log('THe value of b is ', b);

            if (b <= images.length) {
                showingimgs(images, a += 2, b += 2)
            }
            console.log("These are getting cards", gettingcards());
            console.log("The next value of b is ", b)
            console.log(images.length)
        })
    })
    console.log("Actual Getting Cards", gettingcards())
    gettingcards().forEach(element => {
        element.addEventListener("click", () => {
            if (b <= images.length) {
                console.log("Hey this is")
                replacingcards(images, a, b);
                console.log("The selectedcard is ", seletedcard)
            }
            else {
                if (seletedcard.length >= 2) {
                    console.log("the length of selectedcard array is ", seletedcard.length)
                    imgmain(seletedcard)
                }
                else {
                    console.log("the length of selectedcard array is ", seletedcard.length)
                    console.log('The didnostshow arr ', didntshowarr);

                    console.log('The length of didnotshowarr ', didntshowarr.length);
                    console.log('the selected card in last is ', seletedcard);
                    if (didntshowarr.concat(seletedcard).length >= 2) {
                        for(let i = 0;i<didntshowarr.concat(seletedcard).length;i++){
                            for(let j = i+1;j<didntshowarr.concat(seletedcard).length;j++){
                                if( didntshowarr.concat(seletedcard)[i] != didntshowarr.concat(seletedcard)[j]){
                                    finalarr.push(didntshowarr.concat(seletedcard)[i]);
                                    break;
                                }
                            }
                        }
                            showingimgs(finalarr.concat(seletedcard), 0, 2)
                        console.log('inside the finalarr of 2');
                        console.log('The seleted card is ', seletedcard);
                        console.log('The didntshowarr is ', didntshowarr);
                        console.log(didntshowarr.concat(seletedcard));
                        
                        if(didntshowarr.concat(seletedcard).length %2 !=0){
                            console.log('selected arr becomes empty');
                            seletedcard = []
                        }
                        console.log('The final arr is ', finalarr);
                        
                        console.log('The selected card after empty is is ', seletedcard);
                        replacingcards(finalarr.concat(seletedcard), 0, 2);
                        seletedcard = []
                        didntshowarr = []
                        finalarr = []
                    }
                    else if (didntshowarr.concat(seletedcard).length == 1) {
                        console.log('inside the finalarr of 1');
                        mosthandsome(didntshowarr.concat(seletedcard), 0, 1)
                        showingimgs(didntshowarr.concat(seletedcard), 0, 1)
                    }
                }
            }
        })
    })
}

async function main() {
    let images = await getimgs();
    console.log(images)
    showingimgs(images, a, b);
    gettingcards().forEach(element => {
        element.addEventListener("click", (e) => {
            console.log(element)
            seletedcard.push(e.srcElement.src.split("imgs/")[1])
            element.style.backgroundColor = "gray"
            showingimgs(images, a += 2, b += 2)
            replacingcards(images, a, b);
        })
    })

}
main();