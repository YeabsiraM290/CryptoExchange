let tabel = document.querySelector('.tabelBody');


let coinContainer = document.querySelector('.insideCon');


useData();
createTabel();


 let anyinDb= loadfromDB();
if(!anyinDb){
    addToDatabase(['btc'])
    anyinDb=loadfromDB();
}

else{

    
}

function addToDB(coin){

    let coins = loadfromDB();
   

    if(!coins){
        addToDatabase(coin)
        location.reload();
    }
    else{
        localStorage.clear();
        coins = coins[0]
        coins.push(coin);
        addToDatabase(coins);
        location.reload();
    }
}




// Add to LocalStorage function declaration 
function addToDatabase(newCoin)
{
   let listofCoin;
   if(localStorage.getItem('coins') == null)
   {
    listofCoin = [];
   }
   else
   {
    listofCoin = JSON.parse(localStorage.getItem('coins'));
   }
   listofCoin.push(newCoin);
    localStorage.setItem('coins', JSON.stringify(listofCoin));
}


function loadfromDB()
{
    let listofTasks;
    if(localStorage.getItem('coins') == null)
    {
        false
    }
    else
    {
        listofTasks = JSON.parse(localStorage.getItem('coins'));
        return listofTasks; 
    }
   
}


function removefromDB(coin) {

   let inDB = loadfromDB()[0];
   var index = inDB.indexOf(`${coin}`);
    if (index >= 0) {
    inDB.splice( index, 1 );
    }
    localStorage.clear();
   addToDatabase(inDB);
   location.reload();

}



//defining fetch function
async function getPrice(){

    let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');

    let data = await response.json();

    return data;
}

async function getTabelData(){

    let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');

    let data = await response.json();

    return data;
}

//defining function to consume data

function useData(){

   
    getPrice().then(function(coinList) {

        let outPut = "";
        let count = 0;

        coinList.forEach(function(coin) {
            let ar = anyinDb[0]
            
                if(coin.symbol == ar[count]){
              
                    console.log(ar)
                    outPut+= `    <div class="row">
                    <div class="col-12 mainCoins">
                    
                      <div class="card">
                        <img class="card-img-top" src="${coin.image}" width = 300 height= 300 alt="">
                        <div class="card-body">
                          <h1 class="card-title">${coin.name} (${coin.symbol})<i style="font-size: 1.4rem; color:grey;" onClick=removefromDB("${coin.symbol}") class="fas fa-minus-circle ml-5 unpin"></i></h1>
                          <p class="card-text btc">
                            Price: ${coin.current_price}$ <br>
                            24H: ${coin.market_cap_change_percentage_24h} <br>
                            Market Cap: ${coin.market_cap}
                          </p>
                          <a href="cur_desc.html?id=${coin.id}">VIEW MORE 
                            <span><i class="fas fa-long-arrow-alt-right"></i></span>
                          </a>
                        </div>
                       </div>
                     
                    </div>
                    </div>`
                    count+=1
                
                }
               
       
            });
            
            coinContainer.innerHTML = outPut;
 
        })

        .catch(function(err) {

            console.log(err)

        });

}


function createTabel(){

    getPrice().then(function(coinList){

        let outPut="";
        let counter=0;

        coinList.forEach(function(coin){
            counter+=1
        outPut+=`
      <tr> 
            <td onClick=addToDB("${coin.symbol}")><i class="fas fa-thumbtack"></i> ${counter}</td>
            <td><img class="ml-3 mr-3" src="${coin.image}" width=20px height=20px">${coin.name}</td>
           <td>${coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td>${coin.price_change_24h}</td>
            <td>${coin.low_24h}</td>
            <td>${coin.market_cap}</td>
        </tr>`
        
    });
    tabel.innerHTML=outPut;

    $(document).ready(function() {
        $('#example').DataTable();
    } );
    

})

.catch(function(err) {

    console.log(err)

});
    
}
    