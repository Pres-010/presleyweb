// Grab form and status elements
const referralForm = document.getElementById('referralForm');
const refCountElem = document.getElementById('referralCount');
const rewardMessage = document.getElementById('rewardMessage');

// Load existing clients from LocalStorage (CMS key)
let clients = JSON.parse(localStorage.getItem('clients')) || [];

// Function to calculate and display referral count for a given referrer
function updateReferralCount(referrerName){
    const count = clients.filter(c => c.referral === referrerName).length;
    refCountElem.textContent = count;

    if(count >= 3){
        rewardMessage.textContent = "🎉 Congratulations! You've earned 1 FREE month!";
        rewardMessage.style.color = "lightgreen";
    } else {
        rewardMessage.textContent = "";
    }
}

// Preload referral count if referrer previously submitted referrals
referralForm.addEventListener('input', () => {
    const referrer = document.getElementById('referrerName').value.trim();
    if(referrer) updateReferralCount(referrer);
});

// Handle referral form submission
referralForm.addEventListener('submit', e => {
    e.preventDefault();

    const referrerName = document.getElementById('referrerName').value.trim();
    const referrerEmail = document.getElementById('referrerEmail').value.trim();
    const referredBusiness = document.getElementById('referredBusiness').value.trim();

    if(!referrerName || !referrerEmail || !referredBusiness){
        alert("Please fill in all fields.");
        return;
    }

    // Add referred client to CMS LocalStorage
    clients.push({
        name: referredBusiness,
        email: referrerEmail,
        company: referredBusiness,
        referral: referrerName
    });

    localStorage.setItem('clients', JSON.stringify(clients));

    // Update count and reward message
    updateReferralCount(referrerName);

    // Reset form
    referralForm.reset();
});
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };

    let messages = JSON.parse(localStorage.getItem("bluwaveMessages")) || [];

    messages.push(newMessage);

    localStorage.setItem("bluwaveMessages", JSON.stringify(messages));

    alert("Message sent successfully!");

    this.reset();
});