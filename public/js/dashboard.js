const sendData = async (event) => {
    event.preventDefault()
    let blogForm = document.getElementById("blog-form")
    let formData = new FormData(blogForm)
    formData.forEach((value, key) => {
        console.log(value,key)
    })

    const response = await fetch("/api/data/create-blog", {
        method: "POST",
        // headers: { "Content-Type": "application/json"},
        body: formData
    });
    switch (response.status) {
        case 200:
        let blogPost = await response.json()
        console.log(blogPost)
        break;
        default:
        alert("Something went wrong!")
        break;
    }
}
// An event listener on blog post button 
const blogPostButton = document.getElementById("blog-post-button")
blogPostButton.addEventListener("click", sendData)