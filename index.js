// const faceImgCount = 4; // how many different img tiles to choose from - for random number generator
const rollEmptySlots = false; // whether or not empty slots can appear during a roll. affects odds
const lineSpeed = .2; // how many seconds it takes for line to move down one space
const facesPerSpin = 5; // how many positions a line moves during each roll

// old slots that were unique - might not need again
// const slot1 = document.getElementById("slot1");
// const slot2 = document.getElementById("slot2");
// const slot3 = document.getElementById("slot3");

// const slot4 = document.getElementById("slot4");
// const slot5 = document.getElementById("slot5");
// const slot6 = document.getElementById("slot6");

// const slot7 = document.getElementById("slot7");
// const slot8 = document.getElementById("slot8");
// const slot9 = document.getElementById("slot9");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const lines = [line1, line2, line3];

const faceImgs = ["assets/slot-empty.png", 
                  "assets/slot-lemon.png", 
                  "assets/slot-apple.png", 
                  "assets/slot-bar.png",
                  "assets/slot-seven.png",
                  "assets/placeholder.png"]

const lineFaces = [ [], [], [] ];

const rollButton = document.getElementById("rollButton");
const resultText = document.getElementById("resultText");

// get face height from css
const faceHeight = document.querySelector('.slotCol').getBoundingClientRect().height / 3;

let readyToRoll = true;

function preloadImages(urlArray)
{
    for(let i = 0; i < urlArray.length; i++)
    {
        let url = urlArray[i];
        new Image().src = url;
    }
}

async function main()
{
    preloadImages(faceImgs);

    //---------- initialize lines ----------//

    // fires for each line 
    for(let l = 0; l < lines.length; l++)
    {
        // fires for each face
        for(let f = 0; f < 5; f++)
        {
            // create new img and add to array
            const img = document.createElement("img");
            img.className = "slotFace";
            changeFace(img, 0);
            lineFaces[l].push(img);
            
            lines[l].prepend(img);
        }
    }


}

function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

rollButton.onclick = async function()
{
    if(readyToRoll)
    {
        readyToRoll = false;
        spinLines();
        readyToRoll = true;
    }
}

async function spinLines()
{
    // per-line loop
    for(let l = 0; l < lines.length; l++)
    {
        // per-face loop
        for(let f = 0; f < facesPerSpin; f++)
        {
            const img = document.createElement("img");
            img.className = "slotFace";
            changeFace(img, f);
            lineFaces[l].push(img);

            console.log(`face loop flag (2): ${f}`);
            
            lines[l].prepend(img);

            // initial offset
            lines[l].style.transition = 'transform 0s linear';
            lines[l].style.transform = `translateY(${-faceHeight}px)`;
            lines[l].offsetHeight;
        
            // move line down one space
            lines[l].style.transition = `transform ${lineSpeed}s linear`;
            lines[l].style.transform = `translateY(0px)`;

            await waitForTransition(lines[l]);

            lineFaces[l].shift().remove();
        }
    }
}

function changeFace(outputSlot, value)
{
    outputSlot.src = `${faceImgs[value]}`;
}

function waitForTransition(element)
{
    return new Promise(resolve => // creates new Promise object; resolve is a function that finishes the Promise
    { 
        const handler = () => // this function runs when transition ends
        {
            element.removeEventListener('transitionend', handler); // removes the listener, allowing it to be fired again 
            resolve(); // transition is done, so execution resumes at method call
        };
        element.addEventListener('transitionend', handler);
    });
}

main();