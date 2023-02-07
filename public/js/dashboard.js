const sendData = async () => {
    let blogForm = document.getElementById("blog-form")
    let formData = new FormData(blogForm)

    const response = await fetch("/api/users/post", {
        method: "POST",
        // headers: { "Content-Type": "application/json"}
        body: formData
    });
    switch (response.status) {
        case 200:
        let blogPost = await response.json()
        break;
        default:
        alert("Something went wrong!")
        break;
    }
}
// An event listener on blog post button 
const blogPostButton = document.getElementById("blog-post-button")
blogPostButton.addEventListener("click", sendData)