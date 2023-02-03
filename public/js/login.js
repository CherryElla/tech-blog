const loginFormHandler = async (event) => {
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
            console.log(await response.json());
            alert("Failed login");
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (name && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to sign up.");
        }
    }
};

document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler)