let maxSlotVal = 4; 
let rollEmptySlots = false;

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");

const slot4 = document.getElementById("slot4");
const slot5 = document.getElementById("slot5");
const slot6 = document.getElementById("slot6");

const slot7 = document.getElementById("slot7");
const slot8 = document.getElementById("slot8");
const slot9 = document.getElementById("slot9");

const rollButton = document.getElementById("rollButton");
const resultText = document.getElementById("resultText");

function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

let readyToRoll = true;

rollButton.onclick = async function()
{
    if(readyToRoll)
    {
        readyToRoll = false;

        slot1Val = Math.floor(Math.random() * maxSlotVal) + 1;
        //await slotAnimate(slot1);
        await multiAnimate(slot1, slot4, slot7);
        changeTile(slot1, slot1Val);

        await delay(200);

        slot2Val = Math.floor(Math.random() * maxSlotVal) + 1;
        //await slotAnimate(slot2);
        await multiAnimate(slot2, slot5, slot8);
        changeTile(slot2, slot2Val);

        await delay(200);

        slot3Val = Math.floor(Math.random() * maxSlotVal) + 1;
        //await slotAnimate(slot3);
        await multiAnimate(slot3, slot6, slot9);
        changeTile(slot3, slot3Val);

        if(slot1Val == slot2Val && slot2Val == slot3Val)
        {
            resultText.textContent = `You win.`;
        }
        else
        {
            resultText.textContent = `You didn't win.`;
        }

        readyToRoll = true;
    }
}

async function multiAnimate(target1, target2, target3)
{
    // this waits for each promise to complete
    await Promise.all([
    slotAnimate(target1),
    slotAnimate(target2),
    slotAnimate(target3)
    ]);
}

async function slotAnimate(outputSlot)
{
    outputSlot.src = "assets/slot-empty.png"

    await delay(200);

    outputSlot.src = "assets/slot-empty_1.png"

    await delay(200);

    outputSlot.src = "assets/slot-empty_2.png"

    await delay(200);

    outputSlot.src = "assets/slot-empty_3.png"

    await delay(200);
    
    outputSlot.src = "assets/slot-empty.png"

}

function changeTile(outputSlot, value)
{
    switch(value)
    {
        case 0:
            outputSlot.src = "assets/slot-empty.png"
            break;

        case 1:
            outputSlot.src = "assets/slot-lemon.png"
            break;

        case 2:
            outputSlot.src = "assets/slot-apple.png"
            break;

        case 3:
            outputSlot.src = "assets/slot-bar.png"
            break;

        case 4:
            outputSlot.src = "assets/slot-seven.png"
            break;
    }
}

