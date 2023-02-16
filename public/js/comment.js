let commentBtn = document.getElementById('comment-btn')

commentBtn.addEventListener('click', () => {
    let id = commentBtn.getAttribute('data-blog-id')
    let commentDiv = document.getElementById('comment-div')
    if (commentBtn.textContent === "Comment") {
        commentDiv.hidden = false
        commentBtn.textContent = 'Cancel'
    } else if (commentBtn.textContent === "Cancel") {
        commentDiv.hidden = true
        commentBtn.textContent = 'Comment'
    }
})
    

let saveBtn = document.getElementById('save-comment')
saveBtn.addEventListener('click', () => {
    let commentText = document.getElementById('comment-text').value
    let id = commentBtn.getAttribute('data-blog-id') 
    let body = {
        post_id: id,
        text: commentText
    }
    console.log(body)
    try {
        let response = fetch('/api/data/add-comment', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (err) {

    }

})