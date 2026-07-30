document.getElementById('uidForm').addEventListener('submit', function(event) {
    // 1. Prevent default form submit action
    event.preventDefault();

    // 2. Get the UID entered by the user
    const userUid = document.getElementById('uidInput').value.trim();

    // 3. Your target URL
    const targetBaseUrl = 'http://82.41.64.49:2028/free/6b88f91cd81fb7fd';

    // 4. Construct the full URL with the UID parameter
    const fullRedirectUrl = `${targetBaseUrl}?uid=${encodeURIComponent(userUid)}`;

    // 5. Send the user to the destination website
    window.location.href = fullRedirectUrl;
});
