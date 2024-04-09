
let postExampleData = {
    product: "Test1", 
    amount: 2, 
    unit: "db", 
    exp_price: 1112, 
    isbought: true
}

let deleteOption = {
    method: "DELETE"
}

let postOption = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(postExampleData)
}

let putExampleData = {
    product: "Test", 
    amount: 1, 
    unit: "db", 
    exp_price: 111, 
    isbought: false
}

let putOption = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(putExampleData)
}

document.addEventListener("DOMContentLoaded", () => {
    //post
    document.getElementById("post").addEventListener("click", async () => 
    {
        document.getElementById("response").innerHTML = await fetch("https://localhost:5555/list", postOption).then(response => response.json()).then(data => Object.values(data));
    })
    //DELETE

    document.getElementById("delete").addEventListener("click", async () => 
    {
        document.getElementById("response").innerHTML = await fetch("https://localhost:5555/list?id=3", deleteOption).then(response => response.json()).then(data => Object.values(data));
    })
    //PUT

    document.getElementById("put").addEventListener("click", async () => 
    {
        document.getElementById("response").innerHTML = await fetch("https://localhost:5555/list?id=2", putOption).then(response => response.json()).then(data => Object.values(data));
    })
});


