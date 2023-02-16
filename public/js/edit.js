let saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", async () => {
    let id = saveBtn.getAttribute("data-post-id");
    let title = document.getElementById("text-title").value.trim();
    let description = document.getElementById("text-description").value.trim();
    let body = {
        id: id,
        title: title,
        description: description,
    };
    console.log(body)
    try {
        let response = await fetch('/api/update-blog', {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (response.ok) {
            //TODO: Redirect back to dashboard
            location.href = '/dashboard';
        }
    } catch (error) {
        console.log(error)
    }
});
