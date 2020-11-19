console.log('%c HI', 'color: hotpink')
/* 
BASIC STEPS FOR OUR DELIVERABLES GOING FORWARD
1. When X event happens
2. Do Y Fetch
3. Slap Z on the DOM
*/

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// DOM Elements
const container = document.querySelector("#dog-image-container")
const breedsContainer = document.querySelector("#dog-breeds")
const dropdown = document.querySelector("select#breed-dropdown")


// Event Listeners
dropdown.addEventListener("change", event => {
    const breedLetter = event.target.value
    const breedLis = breedsContainer.querySelectorAll("li")
    breedLis.forEach(li => {
        if (li.textContent[0] === breedLetter) {
            li.style.display = ""
        } else {
            li.style.display = "none"
        }
    })
})

breedsContainer.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
        event.target.style.color = "hotpink"
    } 
})

// Fetch code
const getDogBreeds = () => {
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedsArray = Object.keys(data.message)

            breedsArray.forEach(renderOneBreed)
        })
}

const getDogImages = () => {
    fetch(imgUrl)
        .then(response => response.json()) //this is a callback function
        .then(data => {
            data.message.forEach(renderOneImage)
        })
}

// Rendering Logic
const renderOneBreed = breed => {
    const li = document.createElement("li")
    li.textContent = breed
    // li.addEventListener("click", event => {
    //     li.style.color = "hotpink"
    // }) example of adding the event listener to the li instead of using event delegation. 
    breedsContainer.append(li)
}

const renderOneImage = urlString => {
    const img = document.createElement("img")
    img.src = urlString
    container.append(img)
}

//Initialize!
getDogImages()
getDogBreeds()

