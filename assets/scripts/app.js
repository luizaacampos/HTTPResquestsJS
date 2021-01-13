const listElement = document.querySelector('.posts')
const postTemplate = document.getElementById('single-post')
const form = document.querySelector('#new-post form')
const fetchButton = document.querySelector('#available-posts button')
const postList = document.querySelector('ul')

function sendHttpResquest(method, url, data) {
    //*XMLHttpRequest*
    //const promise = new Promise((resolve, reject) => {
        //const xhr = new XMLHttpRequest()

        //xhr.open(method, url)

        //xhr.responseType = 'json'

        //xhr.onload = function() {
            //if (xhr.status >= 200 && xhr.status < 300) {
            //resolve(xhr.response)
            //} else {
                //reject(new Error('something went wrong!'))
            //}
            //const listOfPosts = JSON.parse(xhr.response)
        //xhr.onerror = function() {
            //reject( new Error('Failed to send request!'))
    //}

        //xhr.send(JSON.stringify(data))
        //*fetch*
        return fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json' 
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
            return response.json()
            } else {
                return response.json().then(errData => {
                throw new Error('something went wrong! - server-side.')
                })
            }
        }).catch(error => {
            console.log(error)
            throw new Error('something went wrong!')
        })
    //})
  
    //return promise
}

//functionfetchPosts() {
    //sendHttpResquest('GET', 'https://jsonplaceholder.typicode.com/posts').then(responseData => {
        //const listOfPosts = xhr.response
            //for (const post of listOfPosts) {
                //const postEl = document.importNode(postTemplate.content, true)
                //postEl.querySelector('h2').textContent = post.title.toUpperCase()
                //postEl.querySelector('p').textContent = post.body
                //listElement.append(postEl)
            //}
    //})
//}

async function fetchPosts() {
    try {
        //const responseData = await sendHttpResquest(
            //'GET',
            //'https://jsonplaceholder.typicode.com/posts'
        //)
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        )
        //const listOfPosts = responseData
        const listOfPosts = response.data
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true)
            postEl.querySelector('h2').textContent = post.title.toUpperCase()
            postEl.querySelector('p').textContent = post.body
            postEl.querySelector('li').id = post.id
            listElement.append(postEl)
        } 
    } catch (error) {
        alert(error.message)
        console.log(error.response)
    }    
}

async function createPost(title, content) {
    const userId = Math.random()
    const post = {
        title: title,
        body: content,
        userId: userId
    }

    //sendHttpResquest('POST', 'https://jsonplaceholder.typicode.com/posts', post)
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
    console.log(response)

}

fetchButton.addEventListener('click', fetchPosts)
form.addEventListener('submit', event => {
    event.preventDefault()
    const enteredTitle = event.currentTarget.querySelector('#title').value
    const enteredContent = event.currentTarget.querySelector('#content').value

    createPost(enteredTitle, enteredContent)
})

postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id
        //sendHttpResquest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`)
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
})






