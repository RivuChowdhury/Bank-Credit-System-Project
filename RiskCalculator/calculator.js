
const YearlySpend = document.getElementById("Yearly_Spend");
const PreviousLoan = document.getElementById("Previous_Loan");
const Balance = document.getElementById("Balance_Fd");
const YearlyIncome = document.getElementById("Yearly_Income");


const TotalSpend = document.querySelector(".Total_Spend");
const TotalEarn = document.querySelector(".Total_Earn");
const RiskRatio = document.querySelector(".Risk_Ratio");


const submitBtn = document.querySelector(".calculator-btn");

submitBtn.addEventListener("click", function(){
    TSpend = +(YearlySpend.value) + +(PreviousLoan.value);
  
    TEarn = +(Balance.value) + +(YearlyIncome.value);
    Rratio = +(TSpend)/+(TEarn);
  

    TotalSpend.innerHTML = Math.floor(TSpend);
    TotalEarn.innerHTML = Math.floor(TEarn);
    RiskRatio.innerHTML = Math.floor(Rratio);
  


    //Loanchart
    let xValues = ["Total Earning", "Total Spent"];
    let yValues = [TSpend, TEarn];

    let barColors = ["#961251", "#000000"];

    new Chart("loanChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets:[{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display:false,
            }
        }
    });


});
