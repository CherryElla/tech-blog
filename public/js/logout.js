const logout = async () => {
    const respose = await fetch("/api/users/logout",{
        method: "POST",
        headers: { "Content-Type": "application/json"}
    });
    if (respose.ok) {
        document.location.replace("/login");
    } else {
        alert(respose.statusText)
    }
};

document.querySelector("#logout").addEventListener("click", logout)