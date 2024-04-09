document.addEventListener("DOMContentLoaded", async () => {

    await load();

    document.getElementById("add").addEventListener("click", async e => {
        e.preventDefault();

        let product = document.getElementById("product").value;
        let amount = document.getElementById("amount").value;
        let unit = document.getElementById("unit").value;
        let exp_price = document.getElementById("exp_price").value;

        let element = {
            product: product,
            amount: amount,
            unit: unit,
            exp_price: exp_price,
            isbought: 0
        }
        const response = await fetch('http://localhost:4444/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(element)
        });
        const data = await response.json();
        const table = document.getElementById("list");
        table.appendChild(create_tr(data));
        clear_input("product");
        clear_input("amount");
        clear_input("unit");
        clear_input("exp_price");
    })
});

function clear_input(id) {
    document.getElementById(id).value = '';
}

async function load() {
    const response = await fetch("https://localhost:4444/lists");
    if (!response.ok) {
        alert("Error fetching");
    }
    const data = await response.json();
    console.log(data);
    const table = document.getElementById("list");
    const thp = document.createElement("th");
    thp.textContent = "Product name";
    const tha = document.createElement("th");
    tha.textContent = "Amount";
    const thu = document.createElement("th");
    thu.textContent = "Unit";
    const the = document.createElement("th");
    the.textContent = "Expected price";
    const thb = document.createElement("th");
    thb.textContent = "Bought?";
    const thd = document.createElement("th");
    thd.textContent = "Delete?";
    table.appendChild(thp);
    table.appendChild(tha);
    table.appendChild(thu);
    table.appendChild(the);
    table.appendChild(thb);
    table.appendChild(thd);
    data.forEach(element => {
        table.appendChild(create_tr(element));
    });
}

function create_tr(element) {
    const tr = document.createElement("tr");
    tr.id = element.id;

    const tdp = document.createElement("td");
    tdp.textContent = element.product;
    const tda = document.createElement("td");
    tda.textContent = element.amount;
    const tdu = document.createElement("td");
    tdu.textContent = element.unit;
    const tde = document.createElement("td");
    tde.textContent = element.exp_price;
    const tdb = document.createElement("td");
    const check = document.createElement("input");
    check.type = "checkbox";
    if (element.isbought != 0) {
        check.checked;
    }
    tdb.appendChild(check);
    const tdd = document.createElement("td");
    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.addEventListener("click", async () => {
        const response = await fetch("https://localhost:4444/list?id=" + element.id, {
            method: "DELETE"
        });
        document.getElementById(element.id).remove();
    });
    tdd.appendChild(remove);

    tr.appendChild(tdp);
    tr.appendChild(tda);
    tr.appendChild(tdu);
    tr.appendChild(tde);
    tr.appendChild(tdb);
    tr.appendChild(tdd);

    return tr;
}
