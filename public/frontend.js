document.addEventListener("DOMContentLoaded", async () => {

    await load();

    document.getElementById("add").addEventListener("click", async e => {
        e.preventDefault();
        let product = document.getElementById("product").value;
        let amount = document.getElementById("amount").valueAsNumber;
        let unit = document.getElementById("unit").value;
        let exp_price = document.getElementById("exp_price").valueAsNumber;
        let element = {
            product: product,
            amount: amount,
            unit: unit,
            exp_price: exp_price,
            isbought: false
        }
        await fetch('https://localhost:4444/list', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(element)
        });
        clear_input("product");
        clear_input("amount");
        clear_input("unit");
        clear_input("exp_price");
        document.getElementById("table").remove();
        load();
    })
});

function clear_input(id) {
    document.getElementById(id).value = '';
}

async function load() {
    try {
        let response = await fetch("https://localhost:4444/lists");
        let data = await response.json();
        console.log(data);
        let div = document.getElementById("list");
        let table = document.createElement("table");
        table.id = "table";
        let thp = document.createElement("th");
        thp.textContent = "Product name";
        let tha = document.createElement("th");
        tha.textContent = "Amount";
        let thu = document.createElement("th");
        thu.textContent = "Unit";
        let the = document.createElement("th");
        the.textContent = "Expected price";
        let thb = document.createElement("th");
        thb.textContent = "Bought?";
        let thd = document.createElement("th");
        thd.textContent = "Delete?";
        table.appendChild(thp);
        table.appendChild(tha);
        table.appendChild(thu);
        table.appendChild(the);
        table.appendChild(thb);
        table.appendChild(thd);
        table.appendChild(thd);
        data.forEach(element => {
            table.appendChild(create_tr(element));
        });
        div.appendChild(table);
    } catch (error) {
        alert(error.message);
    }
}

function create_tr(element) {
    const tr = document.createElement("tr");
    tr.id = element.id;

    const tdp = document.createElement("td");
    tdp.textContent = element.product;
    tdp.className="tdp";
    const tda = document.createElement("td");
    tda.textContent = element.amount;
    const tdu = document.createElement("td");
    tdu.textContent = element.unit;
    const tde = document.createElement("td");
    tde.textContent = element.exp_price;
    const tdb = document.createElement("td");
    const check = document.createElement("input");
    check.type = "checkbox";
    if (element.isbought == 1) {
        check.checked = true;
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
    check.addEventListener('change', async () => {
        try {
            if (check.checked == true) {
                const modified = {
                    product: element.product,
                    amount: element.amount,
                    unit: element.unit,
                    exp_price: element.exp_price,
                    isbought: true,
                    id: element.id
                };
                const response = await fetch("https://localhost:4444/list?id=" + element.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(modified)
                })
            } else {
                const modified = {
                    product: element.product,
                    amount: element.amount,
                    unit: element.nit,
                    exp_price: element.exp_price,
                    isbought: false,
                    id: element.id
                };
                const response = await fetch("https://localhost:4444/list?id=" + element.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(modified)
                })
            }
        } catch (error) {
            alert(error.message);
        }
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
