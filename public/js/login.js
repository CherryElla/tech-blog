async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector("#email-input").value.trim();
    const password = document.querySelector("#password-input").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            // console.log(await response.json());
            alert("Failed login");
        }
    }
}

document
    .getElementById("login-form")
    .addEventListener("submit", loginFormHandler);
