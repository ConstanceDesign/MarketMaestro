//creating an eventlistener that will run a function once the user searches for a crytpto currency
//the function accounts for whether the user uses enter or the search button to commit the search
const form = document.querySelector("#cryptoSearchForm");
const clearBtn = document.getElementById("clearbtn");
clearBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("I was clicked");
  document.getElementById("coinname").innerHTML = "";
  document.getElementById("price").innerHTML = "";
  document.getElementById("marketCap").innerHTML = "";
  document.getElementById("dayChange").innerHTML = "";
  document.getElementById("weeklyChange").innerHTML = "";
  location.reload();
});
console.log(form);
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const res = await axios.get(
    `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${searchTerm}&market=USD&interval=5min&apikey=98J29VO1JNI4HWKO`
  );
  const second = await axios.get(
    `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${searchTerm}&market=USD&apikey=98J29VO1JNI4HWKO`
  );
  const third = await axios.get(
    `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${searchTerm}&market=USD&interval=1min&apikey=98J29VO1JNI4HWKO`
  );
  const monthlyData = await axios.get(
    `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${searchTerm}&market=USD&apikey=98J29VO1JNI4HWKO`
  );
  console.log(res.data);
  console.log(res.data["Meta Data"]);
  console.log(second.data);
  console.log(second.data["Meta Data"]);
  console.log(third.data);
  console.log(third.data["Meta Data"]);
  console.log(monthlyData.data);
  console.log(monthlyData.data["Meta Data"]);

  // Variables for Crypto Search Criteria
  var today = new Date();
  //creating a string date that will automatically add 0 to the date but will only keep the last two characters
  // therefore if month returns as 8 it will show as 08
  var date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getUTCDate()).slice(-2);
  var time =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getUTCDate() +
    " " +
    today.getUTCHours() +
    ":" +
    today.getMinutes() +
    ":" +
    "00";

  console.log(date);
  console.log(time);
  var coinSearched = res.data["Meta Data"]["3. Digital Currency Name"];
  var currentPrice =
    res.data["Time Series (Digital Currency Daily)"][date]["4b. close (USD)"];
  var weeklyChange =
    second.data["Time Series (Digital Currency Weekly)"][date][
      "1a. open (USD)"
    ] -
    second.data["Time Series (Digital Currency Weekly)"][date][
      "4a. close (USD)"
    ];
  var marketCap =
    res.data["Time Series (Digital Currency Daily)"][date][
      "6. market cap (USD)"
    ];
  var dayChange =
    res.data["Time Series (Digital Currency Daily)"][date]["1a. open (USD)"] -
    res.data["Time Series (Digital Currency Daily)"][date]["4a. close (USD)"];

  console.log(dayChange);
  //pushing data to the HTML page to displayed for the user
  document.getElementById("coinname").innerHTML = coinSearched;
  document.getElementById("price").innerHTML = currentPrice;
  document.getElementById("marketCap").innerHTML = marketCap;
  document.getElementById("dayChange").innerHTML = dayChange;
  document.getElementById("weeklyChange").innerHTML = weeklyChange;
});
//creating a similar event listener and function for the searching a stock ticker
const secondForm = document.querySelector("#stockSearchForm");
secondForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  var stockTerm = secondForm.elements.query.value;

  stockTerm = stockTerm.toUpperCase();

  const stock = await axios.get(
    `https://api.polygon.io/v2/aggs/ticker/${stockTerm}/prev?adjusted=true&apiKey=lHJ4GPGobT8l6AGkzz_iHfotJDNhUCeM`
  );
  const info = await axios.get(
    `https://api.polygon.io/v1/meta/symbols/${stockTerm}/company?apiKey=lHJ4GPGobT8l6AGkzz_iHfotJDNhUCeM`
  );
  console.log(stock.data);
  console.log(info.data);
  var price = stock.data["results"]["0"]["c"];
  var name = info.data["name"];
  var marketCap = info.data["marketcap"];
  var high = stock.data["results"]["0"]["h"];
  var low = stock.data["results"]["0"]["l"];

  document.getElementById("stockPrice").innerHTML = price;
  document.getElementById("tickerName").innerHTML = name;
  document.getElementById("stockMarketCap").innerHTML = marketCap;
  document.getElementById("high").innerHTML = high;
  document.getElementById("low").innerHTML = low;
});
//creating a function to call the crypto page once the user clicks on the crypto market button
$("#cryptoLabel").on("click", function cryptoPage() {
  $("#introPage").css("display", "none");
  $("#cryptoSearchForm").css("display", "block");
  $("#cryptoMarket").css("display", "block");
});
//A function to call the stock market page
$("#stockLabel").on("click", function stockPage() {
  $("#introPage").css("display", "none");
  $("#stockSearchForm").css("display", "block");
  $("#stockMarket").css("display", "block");
});
//A function to allow the user to return to the home page
$("#homePage").on("click", function returnHome() {
  $("#introPage").css("display", "flex");
  $("#stockSearchForm").css("display", "none");
  $("#stockMarket").css("display", "none");
  $("#cryptoSearchForm").css("display", "none");
  $("#cryptoMarket").css("display", "none");
});
