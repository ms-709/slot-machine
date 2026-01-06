// TO-DO:
// 1) point system based on tile values
// 2) money system
// 3) new sprites
// 4) animated arrows

// how many different img tiles to choose from - for random number generator
// this number counts empty slots if rollEmptySlots is true
const faceImgCount = 4; 

// whether or not empty slots can appear during a roll. affects odds
const rollEmptySlots = false; 

// how many seconds it takes for line to move down one space
const lineSpeed = .1; 

// how much linespeed is multiplied by after each slot move
const lineSpeedMultiplier = 1.1;

// how many positions a line moves during each roll
const facesPerSpin = 15;

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

        document.getElementById("resultText").textContent = "Rolling...";
        await spinLines();
        displayResults();

        readyToRoll = true;
    }
}

async function spinLines()
{
    // per-line loop
    for(let l = 0; l < lines.length; l++)
    {
        let dynamicLineSpeed = lineSpeed;

        // per-face loop
        for(let f = 0; f < facesPerSpin; f++)
        {
            const img = document.createElement("img");
            img.className = "slotFace";

            // choose face based off RNG
            let randNum = Math.floor(Math.random() * faceImgCount) + 1;
            changeFace(img, randNum);
            lineFaces[l].push(img);
            
            lines[l].prepend(img);

            // initial offset
            lines[l].style.transition = 'transform 0s linear';
            lines[l].style.transform = `translateY(${-faceHeight}px)`;
            lines[l].offsetHeight;
        
            // move line down one space
            if(f == 0)
            {
                lines[l].style.transition = `transform ${dynamicLineSpeed}s ease-in`;
            }
            else if(f < facesPerSpin-1)
            {
                lines[l].style.transition = `transform ${dynamicLineSpeed}s linear`;
            }
            else
            {
                lines[l].style.transition = `transform ${dynamicLineSpeed}s ease-out`;
            }
                
            lines[l].style.transform = `translateY(0px)`;

            await waitForTransition(lines[l]);

            lineFaces[l].shift().remove();

            dynamicLineSpeed *= lineSpeedMultiplier;
        }
    }
}

function changeFace(outputSlot, value)
{
    outputSlot.src = `${faceImgs[value]}`;
}

function displayResults()
{
    // lineFaces[l][3] is the winning row
    if(lineFaces[0][3].src == lineFaces[1][3].src && lineFaces[0][3].src == lineFaces[2][3].src)
    {
        document.getElementById("resultText").textContent = "You win!";
    }
    else
    {
        document.getElementById("resultText").textContent = "You lose.";
    }

    // for(let l = 0; l < lines.length; l++)
    // {
    //     for(let f = 0; f < facesPerSpin; f++)
    //     {
    //         console.log(`l: ${l}, f: ${f}; ${lineFaces[l][f].src}`);
    //     }
    // }
    
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