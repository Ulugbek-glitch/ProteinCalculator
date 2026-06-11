const SUPABASE_URL = "https://mkqkdmgojxefjctuhlyx.supabase.co";
const SUPABASE_KEY ="sb_publishable_PZ94ZuDl76AEhrIOxEwIZQ_4RihrGyv";

async function saveToSupabase(name, consumed) {
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/protein_logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify({
                name: name,
                consumed: consumed
            })
        });
        console.log("✅ Supabase ga saqlandi!");
    } catch (e) {
        console.log("Supabase xatolik:", e);
    }
}

window.onload = function() {
    document.getElementById('name-input').focus();
}

function saveName() {
    const name = document.getElementById('name-input').value;
    if (name.trim() !== '') {
        localStorage.setItem("userName", name);
        document.getElementById("modal-overlay").style.display = 'none';
    }
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') saveName();
    });
});

document.querySelector(".calculate-button").addEventListener("click", function() {
    let factor;
    let goal = document.querySelector(".goal-option").value;
    if (goal === "Muskul yig'ish") factor = 2.0;
    if (goal === "Tanadagi yog'ni kamaytirish") factor = 2.4;
    if (goal === "Hozirgi ko'rinishni saqlab turish") factor = 1.6;

    let trainDays = document.querySelector(".option-select").value;
    if (trainDays === "0~1") factor += 0;
    if (trainDays === "2~3") factor += 0.05;
    if (trainDays === "3~4") factor += 0.1;
    if (trainDays === "4~5") factor += 0.15;
    if (trainDays === "5~6") factor += 0.2;
    if (trainDays === "Har kuni") factor += 0.25;

    let age = parseInt(document.querySelector(".age-input").value);
    if (age >= 10 && age <= 17) factor += 0.2;
    else if (age >= 18 && age <= 35) factor += 0;
    else if (age >= 36 && age <= 55) factor += 0.1;
    else if (age >= 56 && age <= 99) factor += 0.2;

    let weight = parseFloat(document.querySelector(".kg-input").value);
    let protein = weight * factor;

    localStorage.setItem("protein", protein.toFixed(1));
    document.getElementById('result-text').textContent = protein.toFixed(1) + " gramm";
    document.getElementById('result-overlay').style.display = 'flex';

    // ✅ Supabase ga saqlash
    const name = localStorage.getItem("userName") || "Noma'lum";
    saveToSupabase(name, protein.toFixed(1) + "g");
});