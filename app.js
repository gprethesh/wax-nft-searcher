
let itemsPerPage = 8;
let currentPage = 1;
var pagenumberx = [];
let collectionName = []
let userName = []



/* QUERY SELECTORS */
const mainx = document.querySelector(".mainx")
const wholeFrameDiv = document.querySelector(".whole-frame-div")
const frameDivError = document.querySelector(".frame-div")
const pagenum = document.querySelector(".pagenum")
const pageinfox = document.querySelector(".pageinfo")

/* URLS */
const srcOfImg = "https://ipfs.wecan.dev/ipfs/"
const urlatomic = "https://wax.api.atomicassets.io"
const srcOfvid = "https://atomichub-ipfs.com/ipfs/"

// MAIN FUNCTION FOR FETTCHING NFT
const runfun = () => {

    pagenum.innerHTML = "";
    mainx.innerHTML = "";

    // MAKE A REQUEST FOR A USER WITH A GIVEN ID
    axios.get(`${urlatomic}/atomicassets/v1/assets?collection_name=${collectionName}&schema_name=&template_id=&owner=${userName}&page=1&limit=100&order=desc&sort=asset_id`)
        .then(function (response) {
            
            // CLEARING EVERYTHING IN MAINX DIV
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

                // STROPPING THE CODE IF ERROR
                throw emptyDataError;
            }


            // HANDLE SUCCESS IF NO ERROR FOUND
            let allnfts = response.data.data

            let frameDivX = document.querySelector(".frame-divx")
            frameDivX.innerHTML = ""
            frameDivX.innerHTML += `    <div class="most-popular-div">
            <span class="pop1">Most</span><span class="popular-span"> Popular</span>`

            // FUNCTION TO GET TOTAL NUMBER OF PAGES
            function numPages(cardsArray) {
                // RETURNS THE NUMBER OF PAGES
                return Math.ceil(cardsArray.length / itemsPerPage)
            }

            // REFERENCE TO TOTAL PAGES
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

                // MAKE SURE PAGE IS IN BOUNDS 
                if (page < 1) page = 1
                if (page > pages) page = pages

                // CLEAR OUTPUT CONTAINING ELEMENT
                mainx.innerHTML = ""


                /* PAGE NUMBER */

                // FORLOOP IF CURRENT PAGE IS LESSTHAN OR EQUAL TO THEN ADD 1+
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

                /* END HERE */



                // FOR EACH ITEM WITHIN THE RANGE OF THE CURRENT PAGE
                for (let i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < allnfts.length; i++) {

                    let n = allnfts[i]

                    // ADDING ISEXIST PROPERTY FOR API OBJECT
                    let isExist = "video" in n.data;


                    // /* MAIN APPEND CODE START */
                    let nftFameDiv = document.createElement("div")
                    nftFameDiv.classList.add("nft-frame-div")

                    let imgNftDiv = document.createElement("div")
                    imgNftDiv.classList.add("image-nft-div")
                    nftFameDiv.appendChild(imgNftDiv) //

                    // CHECKING IF NFT IS A IMAGE OR VIDEO
                    if (isExist) {

                        let video = document.createElement("video")
                        video.width = "200"
                        video.height = "260"
                        video.setAttribute("controls", "controls")
                        let csource = document.createElement("source")
                        csource.src = srcOfvid + n.data.video
                        csource.setAttribute("type", "video/mp4")
                        video.appendChild(csource) //
                        imgNftDiv.appendChild(video) //
                    } else {

                        let nftImg = document.createElement("img")
                        nftImg.classList.add("anonymous-mode-nft-1")
                        nftImg.width = "200"
                        nftImg.height = "260"
                        nftImg.src = srcOfImg + n.data.img
                        imgNftDiv.appendChild(nftImg) //
                    }

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


            // RUNNING CHAGE PAGE FUNCTION
            changePage(1)

            // RUNNING PAGINATION HTML USING THIS FUNCTION
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
            // HANDLE ERROR
        })

}



// QUERYSELECTORS
let buttonz = document.querySelector("#search")
let walletid = document.querySelector("#walletid")
let collectionid = document.querySelector("#collection")
let trackz = document.querySelector(".frame-divox")



// BUTTON WITH INPUT AND SPLICE INTO ARRAY
const pushUsername = () => {
    trackz.innerHTML = "";
    buttonz.innerHTML = "";
    buttonz.innerHTML += `<div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span></div>`
    wholeFrameDiv.innerText = "";
    pagenum.innerHTML = "";
    buttonz.setAttribute("disabled", "true")
    userName.splice(0, 1, walletid.value);
    // walletid.value = "" // IF YOU WANT TO REMOVE INPUT VALUE AFTER EXECUTING
    collectionName.splice(0, 1, collectionid.value);
    // RUNNING MAIN FUNCTION TO FETCH API DATA
    runfun()
    // RUNNING CHECK FUNCTION ON DOM TO FIND OUT IF TEXT INPUT AREA IS AVALIABLE OR NOT
    checkfun()
    
}

// FUNCTION TO CHECK AND HANDLE STATES IF INPUT IS BLANK
const stateHandle = () => {
    if (document.querySelector("#walletid").value === "" || document.querySelector("#collection").value === "") {
        buttonz.setAttribute("disabled", "true") //button remains disabled
        buttonz.classList.remove("frame-button", "search-div")
        buttonz.classList.add("frame-buttonx", "search-div")
    } else {
        buttonz.removeAttribute("disabled", "true")
        buttonz.classList.remove("frame-buttonx", "search-div")
        buttonz.classList.add("frame-button", "search-div")
    }
};

// EVENTLISTENERS FOR INPUT AREA AND BUTTON
walletid.addEventListener("change", stateHandle);
collectionid.addEventListener("change", stateHandle);
buttonz.addEventListener("pointerover",stateHandle)


// FUNCTION TO CHECK IF INPUT TEXT AREA OF SEARCH IS VISBLE IN DOM OR NOT
let checkfun = () => {
    if(document.querySelector("#walletid") && document.querySelector("#collection") ){
        stateHandle()
    }
}

window.addEventListener("load", checkfun)

// EVENT LISTENER TO RUN FUNCTION ON CLICK
buttonz.addEventListener("click", pushUsername)



// FUNCTION FOR SCROLLING UP
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
