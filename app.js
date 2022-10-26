
let itemsPerPage = 8;
let currentPage = 1;
var pagenumberx = [];
let collectionName = []
let userName = []


/* Query Selectors */
const mainx = document.querySelector(".mainx")
const wholeFrameDiv = document.querySelector(".whole-frame-div")
const frameDivError = document.querySelector(".frame-div")
const pagenum = document.querySelector(".pagenum")
const pageinfox = document.querySelector(".pageinfo")

/* URLS */
const srcOfImg = "https://ipfs.wecan.dev/ipfs/"
const urlatomic = "https://wax.api.atomicassets.io"

// MAIN FUNCTION FOR FETTCHING NFT
const runfun = () => {

    pagenum.innerHTML = "";
    mainx.innerHTML = "";
    // Make a request for a user with a given ID
    axios.get(`${urlatomic}/atomicassets/v1/assets?collection_name=${collectionName}&schema_name=&template_id=&owner=${userName}&page=1&limit=100&order=desc&sort=asset_id`)
        .then(function (response) {

            mainx.innerHTML = "";

            if (!response.data.data || response.data.data.length === 0) {
                // const emptyDataError = new Error();
                // // emptyDataError.statusCode = 500;
                frameDivError.innerHTML = "";
                pagenum.innerHTML = "";
                pageinfox.innerHTML = "";
                let alertDiv = document.createElement("div")
                alertDiv.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show")
                let strongAlert = document.createElement("strong")
                let strongAlertText = document.createTextNode(`${collectionName} and ${userName} are seems to be invalid.`)
                strongAlert.appendChild(strongAlertText) //
                alertDiv.append(strongAlert) //

                let alertButton = document.createElement("button")
                alertButton.setAttribute("type", "button")
                alertButton.classList.add("btn-close")
                alertButton.setAttribute("data-bs-dismiss", "alert")
                alertButton.setAttribute("aria-label", "Close")
                alertButton.setAttribute("onClick", "window.location.reload()")

                alertDiv.appendChild(alertButton) //

                let br1 = document.createElement("br")
                br1.append(alertDiv) //

                frameDivError.appendChild(alertDiv) //

                // stropping the code
                throw emptyDataError;
            }


            // handle success
            let allnfts = response.data.data

            let frameDivX = document.querySelector(".frame-divx")
            frameDivX.innerHTML = ""
            frameDivX.innerHTML += `    <div class="most-popular-div">
            <span class="pop1">Most</span><span class="popular-span"> Popular</span>`

            function numPages(cardsArray) {
                // returns the number of pages
                return Math.ceil(cardsArray.length / itemsPerPage)
            }

            // reference to total pages
            const pages = numPages(allnfts)

            const pageinfo = document.querySelector(".frame-div")
            pageinfo.innerHTML = "";
            let brx = document.createElement("br")
            pageinfo.appendChild(brx)
            let darkboss = document.createElement("div")
            darkboss.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show", "text-center")
            let totalPageText = document.createTextNode(`Total num of pages: ` + pages + ` of User: ${userName} in ${collectionName}`)


            let alertButton = document.createElement("button")
            alertButton.setAttribute("type", "button")
            alertButton.classList.add("btn-close")
            alertButton.setAttribute("data-bs-dismiss", "alert")
            alertButton.setAttribute("aria-label", "Close")
            alertButton.setAttribute("onClick", "location.reload()")
            darkboss.appendChild(alertButton) //

            darkboss.appendChild(totalPageText) //
            pageinfo.appendChild(darkboss) //


            function changePage(page) {

                // make sure page is in bounds 
                if (page < 1) page = 1
                if (page > pages) page = pages

                // clear output containing element
                mainx.innerHTML = ""


                /* TODO: PAGE NUMBER */

                // forloop if current page is lessthan or equal to then add 1+
                for (let i = 1; i <= currentPage; i++) {
                    pagenumberx.push(i);
                }
                pagenum.innerHTML = "";
                let lastPage = pagenumberx.findLast((e) => e > 0);
                let frameDivO = document.createElement("div")
                frameDivO.classList.add("frame-divo")

                let h4PageNo = document.createElement("h4")
                h4PageNo.classList.add("page-12000-h4")
                let h4PageTextNode = document.createTextNode(`Page: ${lastPage}`)
                h4PageNo.appendChild(h4PageTextNode) //
                frameDivO.appendChild(h4PageNo) //

                pagenum.appendChild(frameDivO) ////

                /* TODO: END HERE */



                // for each item within the range of the current page
                for (let i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < allnfts.length; i++) {

                    // append the html to the element
                    /*        HTML CODE FROM HERE        */
                    let n = allnfts[i]

                    // /* MAIN APPEND CODE START */
                    let nftFameDiv = document.createElement("div")
                    nftFameDiv.classList.add("nft-frame-div")

                    let imgNftDiv = document.createElement("div")
                    imgNftDiv.classList.add("image-nft-div")
                    nftFameDiv.appendChild(imgNftDiv) //

                    let nftImg = document.createElement("img")
                    nftImg.classList.add("anonymous-mode-nft-1")
                    // nftImg.width = "300"
                    // nftImg.height = "370"
                    nftImg.src = srcOfImg + n.data.img
                    imgNftDiv.appendChild(nftImg) //

                    let textDiv = document.createElement("div")
                    textDiv.classList.add("text-div")
                    imgNftDiv.appendChild(textDiv) //

                    let h3Text = document.createElement("h3")
                    h3Text.classList.add("name-h3")
                    let h3TextNode = document.createTextNode(n.data.name)
                    h3Text.appendChild(h3TextNode) //
                    textDiv.appendChild(h3Text) //

                    let paraText = document.createElement("p")
                    paraText.classList.add("p")
                    let paraTextNode = document.createTextNode(n.asset_id)
                    paraText.appendChild(paraTextNode)
                    textDiv.appendChild(paraText) //

                    mainx.appendChild(nftFameDiv) ////



                }
            }


            // running chage Page function
            changePage(1)

            // running Pagination html using this function
            paginationfun()

            /// PAGINATION FUNCTION NEXT
            let next = document.querySelector("#next")

            const nextz = () => {
                if (currentPage < pages) changePage(++currentPage)
                scrollhere()
            }

            next.addEventListener("click", nextz)

            /// PAGINATION FUNCTION PREV
            let prev = document.querySelector("#prev")

            const prevz = () => {
                if (currentPage > 1) changePage(--currentPage)
                scrollhere()
            }

            prev.addEventListener("click", prevz)

            let loadingfunremove = document.querySelector(".loadingfun")
            loadingfunremove.innerHTML = "";

        })

        .catch(function (error) {
            // handle error
        })

}


// FUNCTION TO VALIDATE IF INPUT EMPTY OR NOT
let validate = () => {
    if (document.getElementById("collection").value == "") {
        alert("Collection Name cannot be Empty");
        location.reload();
    }
    if (document.getElementById("walletid").value == "") {
        alert("WaxWallet Name cannot be Empty");
        location.reload();
    }
}


// BUTTON WITH INPUT AND SPLICE INTO ARRAY
let buttonz = document.querySelector("#search")
let walletid = document.querySelector("#walletid")
let collectionid = document.querySelector("#collection")


const pushUsername = () => {
    validate()
    let loadafun = document.querySelector(".loadingfun")
    loadafun.innerHTML += `<div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span></div>`
    wholeFrameDiv.innerText = "";
    pagenum.innerHTML = "";
    userName.splice(0, 1, walletid.value);
    // walletid.value = ""
    collectionName.splice(0, 1, collectionid.value);
    // collectionid.value = ""
    runfun()
}

// Event Listener to run function on click
buttonz.addEventListener("click", pushUsername)


const scrollhere = () => {
    const element = document.getElementById("scrollhere");
    element.scrollIntoView();
}

let paginationfun = () => {

    /*  PAGINATION BUTTON  */

    let footerDiv = document.createElement("footer")
    footerDiv.classList.add("pagination-footer")

    let buttonPrev = document.createElement("button")
    buttonPrev.classList.add("prev-button", "prev-div")
    buttonPrev.setAttribute("id", "prev")
    let buttonPrevText = document.createTextNode("Prev")
    buttonPrev.appendChild(buttonPrevText) //
    footerDiv.appendChild(buttonPrev) //

    let buttonNext = document.createElement("button")
    buttonNext.classList.add("prev-button", "prev-div")
    buttonNext.setAttribute("id", "next")
    let buttonNextText = document.createTextNode("Next")
    buttonNext.appendChild(buttonNextText) //
    footerDiv.appendChild(buttonNext) //

    wholeFrameDiv.appendChild(footerDiv) ////

    /* CODE END */

}









