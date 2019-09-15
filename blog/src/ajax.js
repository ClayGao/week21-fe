let url = 'https://jsonplaceholder.typicode.com/posts'


fetch(url, {method: 'get'})
    .then(function(resp) {
        return resp.json()
    })
    .then(function(jsonData){
        cc = jsonData
    })



//export default getData;