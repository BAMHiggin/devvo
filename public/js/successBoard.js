$(document).ready(function () {
  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
    return;
  }

  //BAR CHART-TOP 5 IN PROGRESS
  // Our labels along the x-axis
  var weeks = ["January", "February", "March", "April"];
  // For drawing the lines
  var User1 = [2, 10, 30, 48];
  var User2 = [2, 17, 29, 30];
  var User3 = [3, 5, 10, 15];
  var User4 = [10, 20, 25, 35];
  var User5 = [5, 10, 15, 39];

  var ctx = document.getElementById("my-chart-bar");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        {
          data: User1,
          label: "S.Rodriguez",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: User2,
          label: "J.Flahive",
          borderColor: "#DC143C",
          fill: false
        },
        {
          data: User3,
          label: "M.Hertz",
          borderColor: "#FF8C00",
          fill: false
        },
        {
          data: User4,
          label: "B.Khan",
          borderColor: "#FF00FF",
          fill: false
        },
        {
          data: User5,
          label: "J.Hamed",
          borderColor: "#9ACD32",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Top 5 Developers In Progress!",
        position: "top",
        fontSize: 20
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            ticks: {
              display: true,
              labelString: "Tasks Completed"
            }
          },
          min: 0,
          max: 50
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Weeks"
          },
          ticks: {
            min: 0,
            max: 30,
            stepSize: 1
          }
        }]
      }
    }
  });

  //PIE CHARTS-SUCCESS PER CATEGORY
  //Retrieve the current data from db

  let userObject = getUserObject();
  let completedNetworking = 0;
  let incompleteNetworking = 0;
  let completedCoding= 0;
  let incompleteCoding= 0;
  let completedArticles= 0;
  let incompleteArticles=0;
  let completedVideos=0;
  let incompleteVideos=0;
  let networkingArr = [];
  let codingArr = [];
  let articlesArr = [];
  let videosArr = [];

  $.get(`/api/userTasks/${userObject.userId}`, function (data) {
    // console.log(data);
    // console.log(data[0].completed);
    for(let i = 0; i<data.length; i++){
      // console.log(data.length);
      // console.log(data[i].Task.CategoryId);
      if(data[i].Task.CategoryId === 1){
        if(data[i].completed=== true){
          completedNetworking++;
        }else{
          
          incompleteNetworking++;
        }
      }
      if(data[i].Task.CategoryId === 2){
        if(data[i].completed=== true){
          
          completedCoding++;
        }else{
         
          incompleteCoding++;
        }
      }
      if(data[i].Task.CategoryId === 3){
        if(data[i].completed=== true){
          completedArticles++;
        }else{
          incompleteArticles++;
        }
      }
      if(data[i].Task.CategoryId === 4){
        if(data[i].completed=== true){
          completedVideos++;
        }else{
          incompleteVideos++;
        }
      }
    }

    console.log("C1=" + completedNetworking);
    console.log(typeof(completedNetworking));
    console.log("IC1=" + incompleteNetworking);
    console.log("C2=" + completedCoding);
    console.log("IC2=" + incompleteCoding);
    console.log("C3=" + completedArticles);
    console.log("IC3=" + incompleteArticles);
    console.log("C4=" + completedVideos);
    console.log("IC4=" + incompleteVideos);
    networkingArr.push(completedNetworking, incompleteNetworking);
    codingArr.push(completedCoding, incompleteCoding);
    articlesArr.push(completedArticles, incompleteArticles);
    videosArr.push(completedVideos, incompleteVideos);
 
    var networkingDataSet = {
      datasets: [{
        networkingArr
      }],
      labels:["Completed", "Incompleted"]
    };
    let pie1 = new Chart(document.getElementById("my-chart-pie1"), {
      type: "pie",
      data: {
        labels: ["Completed", "Incomplete"],
        datasets: [{
          label: "Coding Exercises",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: networkingArr
        }]
      },
      options: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: "Networking"
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue / total * 100).toFixed(1));
              return currentValue + " (" + percentage + "%)";
            },
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      }
    });


    let pie2 = new Chart(document.getElementById("my-chart-pie2"), {
      type: "pie",
      data: {
        labels: ["Completed", "Incomplete"],
        datasets: [{
          label: "Coding Exercises",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: codingArr
        }]
      },
      options: {
        title: {
          display: true,
          text: "Coding Exercises"
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue / total * 100).toFixed(1));
              return currentValue + " (" + percentage + "%)";
            },
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      }
    });


    let pie3 = new Chart(document.getElementById("my-chart-pie3"), {
      type: "pie",
      data: {
        labels: ["Completed", "Incomplete"],
        datasets: [{
          label: "Articles",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: articlesArr
        }]
      },
      options: {
        title: {
          display: true,
          text: "Articles"
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue / total * 100).toFixed(1));
              return currentValue + " (" + percentage + "%)";
            },
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      },

    });


    let pie4 = new Chart(document.getElementById("my-chart-pie4"), {
      type: "pie",
      data: {
        labels: ["Completed", "Incomplete"],
        datasets: [{
          label: "Videos",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: videosArr
        }]
      },
      options: {
        title: {
          display: true,
          text: "Videos"
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue / total * 100).toFixed(1));
              return currentValue + " (" + percentage + "%)";
            },
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      },
    });
  });
});