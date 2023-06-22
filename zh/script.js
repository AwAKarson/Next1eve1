const wheel = document.querySelector("#wheel")
const spinBtn = document.querySelector("#spin_btn")
const finalValue = document.querySelector("#final_result")
var radioChecked = 0
const link =  [["https://puzzel.org/jigsaw/play?p=-NY9S84TyAyTzE1vWK7b", "https://puzzel.org/jigsaw/play?p=-NYBO5ahMGfvl3FRUCAB",
                "https://puzzel.org/jigsaw/play?p=-NYBUHF3HM-Sl3pvWxWd", "https://puzzel.org/jigsaw/play?p=-NYBV9ytE2r0rELzNO0I",
                "https://puzzel.org/jigsaw/play?p=-NYBVoJZpK-_WeUhq-gU", "https://puzzel.org/jigsaw/play?p=-NYBXKyRpomq0N-xDYTf"], 
               ["https://puzzel.org/jigsaw/play?p=-NXzWT4PATmPgdaXqqCD", "https://puzzel.org/jigsaw/play?p=-NXzYurad96iHMZW5z90",
                "https://puzzel.org/jigsaw/play?p=-NXzZ4hjhGOzxBdy1qXA", "https://puzzel.org/jigsaw/play?p=-NXzZvR5Z0w0ALGATejl",
                "https://puzzel.org/jigsaw/play?p=-NXzbZcSOzjNu3up5GE9", "https://puzzel.org/jigsaw/play?p=-NXzbhZqQLoO_GenRs1T"],
               ["https://puzzel.org/jigsaw/play?p=-NY9SdLceifRjZnYDD42", "https://puzzel.org/jigsaw/play?p=-NYBORb06XhEmJ5iJEwd",
                "https://puzzel.org/jigsaw/play?p=-NYBU53PxRR8ICiYscfQ", "https://puzzel.org/jigsaw/play?p=-NYBUpz8qMa4XcmBARG4",
                "https://puzzel.org/jigsaw/play?p=-NYBVdtK9IIMGPY9eAWF", "https://puzzel.org/jigsaw/play?p=-NYBWiFpx5v9MsZp43O1"]]
const result = ["半島酒店", "尖沙咀鐘樓", "山東街水月宮", "聖安德烈堂", "1881 公館", "油麻地紅磚屋"]
const rotationValues = [
    {minDegree: 0, maxDegree: 30, value: 1}, 
    {minDegree: 31, maxDegree: 90, value: 0},
    {minDegree: 91, maxDegree: 150, value: 5},
    {minDegree: 151, maxDegree: 210, value: 4},
    {minDegree: 211, maxDegree: 270, value: 3},
    {minDegree: 271, maxDegree: 330, value: 2},
    {minDegree: 331, maxDegree: 360, value: 1}
]
const data = [16, 16, 16, 16, 16, 16];
var pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"]
let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["半島酒店", "尖沙咀鐘樓", "山東街水月宮", "聖安德烈堂", "1881 公館", "油麻地紅磚屋"],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        responsive: true,
        animation: {duration: 0},
        plugins: {
            tooltip: false,
            legend: {
                display: false,
                labels: {
                    font: {
                        family:"'Poppins', sans-serif"
                    },
                },
            },
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => 
                context.chart.data.labels[context.dataIndex],
                font: {size: 18},
            },
        },
    },
})

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>${result[i.value]}</p><br><a href=${link[radioChecked][i.value]} target="_blank">請按我</a>`
            spinBtn.disabled = false
            break
        }
    }
}

let count = 0;
let resultValueArray = [144, 89, 55, 34, 21, 13, 8, 5, 3, 2, 1]
let resultValue = resultValueArray[0];
spinBtn.addEventListener("click", () => {
    radioChecked = document.querySelector('input[name=difficulty]:checked').value;
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>祝你好運！</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue = resultValueArray[count];
      myChart.options.rotation = 0;
    } else if (count > 6 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 144;
    }
  }, 10);
});