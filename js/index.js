let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    divData = document.querySelector(".data"),
    divChooseExpenses = document.querySelector(".choose-expenses"),
    divAddExpense = document.querySelector(".addExpense"),
	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
    addExpensesBtn = document.querySelector(".addexpenses-item-btn"),
	optionalExpensesBtn = document.getElementsByTagName('button')[2],
    countBtn = document.getElementsByTagName('button')[3],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

startBtn.addEventListener("click", function(){
    money = +prompt ("Ваш бюджет на месяц?", "");
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed(2);
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth()+1;
    dayValue.value = new Date(Date.parse(time)).getDate();

});

expensesBtn.addEventListener("click", function(){
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value,
        b = expensesItem[++i].value;

    if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {

        console.log ("done");

        appData.expenses[a] = b;
    } else {
        console.log ("bad result");
        i--;
    }
    sum += +b;
    expensesValue.textContent = sum; 
}
});

addExpensesBtn.addEventListener("click", function(){
    let inputAddName = document.createElement("input");
    inputAddName.classList.add("expenses-item");
    inputAddName.setAttribute("type", "text");
    // inputAddName.setAttribute("margin", "20px");
    inputAddName.setAttribute("placeholder", "Наименование");
    divData.insertBefore(inputAddName, divAddExpense);
    let inputAddValue = document.createElement("input");
    inputAddValue.classList.add("expenses-item");
    inputAddValue.setAttribute("type", "text");
    inputAddValue.setAttribute("placeholder", "Цена");
    divData.insertBefore(inputAddValue, divAddExpense);
});

optionalExpensesBtn.addEventListener("click", function(){
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let a = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = a;
        console.log(appData.optionalExpenses);
        optionalExpensesValue.textContent += appData.optionalExpenses[i]+ " ";
    }
});
countBtn.addEventListener("click", function(){
    if(appData.budget != undefined){
    appData.moneyPerDay = ((appData.budget / 30).toFixed());
    dayBudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 100 && appData.moneyPerDay>0) {
        levelValue.textContent = "Это минимальный уровень достатка!";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "Это средний уровень достатка!";
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent =  "Это высокий уровень достатка!";
    } else {
        levelValue.textContent = "Некорректные данные";
    }
}
else{
    levelValue.textContent = "Некорректные данные";
    alert("Небходимо ввести данные бюджета!!! Нажмите кнопку 'Начать расчет'");
}
    });

    incomeItem.addEventListener("input", function(){
        let itemsInc = incomeItem.value;
        console.log(itemsInc);
        appData.income = itemsInc.split(" ,");
        incomeValue.textContent = appData.income; 
    });

    checkSavings.addEventListener("click", function(){
        if(appData.savings == true){
            appData.savings = false;
        }
        else{appData.savings = true;
        }
        console.log(appData.savings);
    });


    sumValue.addEventListener("input", function(){
        if (appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthSavingsValue.textContent = appData.monthIncome;
            yearSavingsValue.textContent = appData.yearIncome;
        }
    });

    percentValue.addEventListener("input", function(){
        if (appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthSavingsValue.textContent = appData.monthIncome;
            yearSavingsValue.textContent = appData.yearIncome;
        }
    });

    
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: "",
    detectDayBudget: function () {
        
    },
    detectLevel: function () {
       
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
    
                appData.monthIncome = save/100/12*percent;
                alert("Доход с Вашего депозита в месяц: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function () {
        
    },
    chooseIncome: function () {

        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

        if (typeof(items) != "string" || items == "" || typeof(items) == null) {
            console.log("Вы ввели некорректные данные или не ввели их вовсе");
        } else {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?"));
            appData.income.sort();
        }

        appData.income.forEach (function (itemmassive, i) {
            alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
        });

    }


};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}