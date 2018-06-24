const teamStatsFetch = {
  search: function(limit){
    return fetch(`http://nflarrest.com/api/v1/team?limit=${limit}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
  }
}

const limit = 10;

teamStatsFetch.search(limit).then(data => {
  // console.log(data)
  // console.log(data[0].Team)

  teamStatsObj = {
    name1: data[0].Team_preffered_name, arrest1: data[0].arrest_count,
    name2: data[1].Team_preffered_name, arrest2: data[1].arrest_count,
    name3: data[2].Team_preffered_name, arrest3: data[2].arrest_count,
    name4: data[3].Team_preffered_name, arrest4: data[3].arrest_count,
    name5: data[4].Team_preffered_name, arrest5: data[4].arrest_count,
    name6: data[5].Team_preffered_name, arrest6: data[5].arrest_count,
    name7: data[6].Team_preffered_name, arrest7: data[6].arrest_count,
    name8: data[7].Team_preffered_name, arrest8: data[7].arrest_count,
    name9: data[8].Team_preffered_name, arrest9: data[8].arrest_count,
    name10: data[9].Team_preffered_name, arrest10: data[9].arrest_count
  }


  const teamctx = document.getElementById('teamCrimeChart').getContext('2d');

  Chart.defaults.global.defaultFontFamily = 'Arial','Helvetica Neue', 'Helvetica';
  Chart.defaults.global.defaultFontSize = 10;
  Chart.defaults.global.defaultFontColor = '#7caeff';

  const teamChart = new Chart(teamctx, {

      type: 'horizontalBar',
      data: {
          labels: [teamStatsObj.name1, teamStatsObj.name2,
            teamStatsObj.name3, teamStatsObj.name4, teamStatsObj.name5,
             teamStatsObj.name6, teamStatsObj.name7,
           teamStatsObj.name8, teamStatsObj.name9, teamStatsObj.name10],
          datasets: [{
              label: "Arrests per Team",
              backgroundColor: [
                'rgb(134, 109, 237, 0.7)', 'rgb(232, 41, 200, 0.7)',
                'rgb(66, 206, 244, 0.7)', 'rgb(180, 216, 17, 0.7)',
                'rgb(6, 155, 75, 0.7)', 'rgb(128, 141, 242, 0.7)',
                'rgb(230, 252, 108, 0.7)', 'rgb(56, 247, 244, 0.7)',
                'rgb(239, 88, 151, 0.7)', 'rgb(128, 141, 242, 0.7)'
              ],
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: .5,
              hoverBorderWidth: 3,
              data: [teamStatsObj.arrest1, teamStatsObj.arrest2,
                teamStatsObj.arrest3, teamStatsObj.arrest4, teamStatsObj.arrest5,
                teamStatsObj.arrest6, teamStatsObj.arrest7, teamStatsObj.arrest8,
                teamStatsObj.arrest9, teamStatsObj.arrest10],
          }]
      },
      options: {
        legend: {
           display: false
       },
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              max: 70,
              stepSize: 10
            }
          }]
        }
      }
  });
});

const crimeStatsFetch = {
  search: function(limit){
    return fetch(`http://nflarrest.com/api/v1/crime?limit=${limit}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
  }
}

crimeStatsFetch.search(limit).then(data => {
  // console.log(data)

  crimeStatsObj = {
    crime1: data[0].Category, crime1Count: data[0].arrest_count,
    crime2: data[1].Category, crime2Count: data[1].arrest_count,
    crime3: data[2].Category, crime3Count: data[2].arrest_count,
    crime4: data[3].Category, crime4Count: data[3].arrest_count,
    crime5: data[4].Category, crime5Count: data[4].arrest_count,
  }

  const crimectx = document.getElementById('crimeChart').getContext('2d');
  const tcrimeChart = new Chart(crimectx, {
      type: 'pie',
      data: {
          labels: [crimeStatsObj.crime1, crimeStatsObj.crime2,
             crimeStatsObj.crime3, crimeStatsObj.crime4, crimeStatsObj.crime5],
          datasets: [{
              label: "Top Crimes in the NFL",
              backgroundColor: [
                'rgb(128, 141, 242, 0.7)',
                'rgb(230, 252, 108, 0.7)', 'rgb(56, 247, 244, 0.7)',
                'rgb(239, 88, 151, 0.7)', 'rgb(6, 155, 75, 0.7)'
              ],
              borderColor: 'rgb(163, 163, 133)',
              borderWidth: 0,
              hoverBorderWidth: 3,
              data: [crimeStatsObj.crime1Count, crimeStatsObj.crime2Count,
                 crimeStatsObj.crime3Count, crimeStatsObj.crime4Count, crimeStatsObj.crime5Count],
          }]
      },
      options: {
        legend: {
           display: false
       },
      }
  });
});

const teamNameFetch = {
  search: function(){
    return fetch(`http://nflarrest.com/api/v1/team`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
  }
}

teamNameFetch.search().then(data => {
  console.log(data)
})

function teamCrimeStatsFunc(){

  document.getElementById('crimeByTeamChart').innerHTML = '';
  document.getElementById('crimeByPlayerChart').innerHTML = '';
  let teamdd = document.getElementById("teamdd");
  let teamID = teamdd.options[teamdd.selectedIndex].id;
  let teamName = teamdd.options[teamdd.selectedIndex].innerHTML;
  console.log(teamID);
  console.log(teamName);

  let crimeDiv = `
  <div class = "row">
    <div class="col">
      <p> Top Five Crimes Committed by the ${teamName}</p>
    </div>
  </div>`;
  document.getElementById("teamCrimeDiv").innerHTML = crimeDiv;

  let topCrimeByTeamFetch = {
    search: function(teamID){
      return fetch(`http://nflarrest.com/api/v1/team/topCrimes/${teamID}`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err));
    }
  }
  topCrimeByTeamFetch.search(teamID).then(data => {
    console.log(data)
    let topCrimeObj = {};
    topCrimeObj = {
      crime1: data[0].Category, crime1Count: data[0].arrest_count,
      crime2: data[1].Category, crime2Count: data[1].arrest_count,
      crime3: data[2].Category, crime3Count: data[2].arrest_count,
      crime4: data[3].Category, crime4Count: data[3].arrest_count,
      crime5: data[4].Category, crime5Count: data[4].arrest_count,
    }

    crimeByTeamctx = document.getElementById('crimeByTeamChart').getContext('2d');
    crimeByTeamChart = new Chart(crimeByTeamctx, {
        type: 'doughnut',
        data: {
            labels: [topCrimeObj.crime1, topCrimeObj.crime2,
               topCrimeObj.crime3, topCrimeObj.crime4, topCrimeObj.crime5],
            datasets: [{
                label: "Top Crimes in the NFL",
                backgroundColor: [
                  'rgb(180, 216, 17, 0.7)',
                  'rgb(6, 155, 75, 0.7)', 'rgb(128, 141, 242, 0.7)',
                  'rgb(230, 252, 108, 0.7)', 'rgb(56, 247, 244, 0.7)'
                ],
                borderColor: 'rgb(163, 163, 133)',
                borderWidth: 0,
                hoverBorderWidth: 3,
                data: [topCrimeObj.crime1Count, topCrimeObj.crime2Count,
                   topCrimeObj.crime3Count, topCrimeObj.crime4Count, topCrimeObj.crime5Count],
            }]
        },
        options: {
          legend: {
             display: false
         },
        }
    });
    setTimeout(update, 100);
    function update(){
      crimeByTeamChart.update(data);
    }
  })
  let topCrimeByPlayerFetch = {
    search: function(teamID){
      return fetch(`http://nflarrest.com/api/v1/team/topPlayers/${teamID}`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err));
    }
  }
  topCrimeByPlayerFetch.search(teamID).then(data => {
    console.log(data)

    let playerDiv = `
    <div class = "row">
      <div class="col">
        <p> Top Five Arrested Players From The ${teamName}</p>
      </div>
    </div>`;
    document.getElementById("playerCrimeDiv").innerHTML = playerDiv;
    let playerCrimeObj = {};
    playerCrimeObj = {
      crime1: data[0].Name, crime1Count: data[0].arrest_count,
      crime2: data[1].Name, crime2Count: data[1].arrest_count,
      crime3: data[2].Name, crime3Count: data[2].arrest_count,
      crime4: data[3].Name, crime4Count: data[3].arrest_count,
      crime5: data[4].Name, crime5Count: data[4].arrest_count,
    }

    crimeByPlayerctx = document.getElementById('crimeByPlayerChart').getContext('2d');

    crimeByPlayerChart = new Chart(crimeByPlayerctx, {
        type: 'bar',
        data: {
            labels: [playerCrimeObj.crime1, playerCrimeObj.crime2,
               playerCrimeObj.crime3, playerCrimeObj.crime4, playerCrimeObj.crime5],
            datasets: [{
                label: "Arrest Count",
                backgroundColor: [
                  'rgb(200, 247, 227, 0.6)',
                  'rgb(243, 244, 198, 0.6)', 'rgb(205, 196, 242, 0.6)',
                  'rgb(237, 196, 189, 0.6)', 'rgb(239, 189, 224, 0.6)'
                ],
                borderColor: 'rgb(163, 163, 133)',
                borderWidth: 0,
                hoverBorderWidth: 3,
                data: [playerCrimeObj.crime1Count, playerCrimeObj.crime2Count,
                   playerCrimeObj.crime3Count, playerCrimeObj.crime4Count, playerCrimeObj.crime5Count],
            }]
        },
        options: {
          scales:{
            yAxes: [{
              ticks:{
                max: 10,
                min: 0,
                stepSize: 2
              }
            }]
          },
          legend: {
             display: false
         },
        }
    });
    setTimeout(update, 100);
    function update(){
      crimeByPlayerChart.update(data);
    }
  })
}
