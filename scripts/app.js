window.addEventListener("load", () => {
    const app = new Vue({
        el: '#app',
        data: {
            searchedCountry: 'USA',
            countries: [],
            currentDate: new Date(),
            startDate: moment('2021-01-01'),
            stopDate:  moment('2021-07-15'),
            data: []
        },
        methods: {
            chart(dateArray, data) {
                let myChart = document.getElementById('myChart').getContext('2d');
                let covidChart = new Chart(myChart, {
                    type: 'line',
                    data: {
                        labels: dateArray,
                        datasets: [{
                            label: 'cases',
                            data: data
                        }]
                    },
                    options: {}
                })
            },
            onChange() {
                axios.get(`https://covid-api.com/api/reports?date=2020-04-16&iso=${this.searchedCountry}`)
                .then((resp) => {
                    currentDate = moment(this.currentDate)
                    var startDate = currentDate.subtract(90, "days").format("YYYY-MM-DD");
                    var dateList = this.getDatesArray(this.startDate,this.stopDate);
                    console.log(dateList);
                    dateList.forEach(date => {
                        this.getCasesByDate(date);
                    });
                    this.chart(dateList,this.data);
                });
            },
            getDatesArray(startDate, endDate) {
                var now = moment(startDate,["YYYY-DD-MM"]), dates = [];
                while (now.isSameOrBefore(endDate)) {
                    dates.push(now.format("YYYY-DD-MM"));
                    now.add(1, 'days');
                }
                return dates;



            },
            getCasesByDate(date){
                axios.get(`https://covid-api.com/api/reports?date=${date}&iso=${this.searchedCountry}`).
                then((resp) => {
                    this.data.push(resp.data.data[20].active)
                    console.log(resp.data.data)
                });
               
            }

        },
        mounted() {
            //get countries with axios
            axios.get('https://covid-api.com/api/regions?order=name',
            ).then((resp) => {
                this.countries = resp.data.data
                console.log(resp.data.data)
            });
            currentDate = moment(this.currentDate)
            var startDate = currentDate.subtract(90, "days").format("YYYY-MM-DD");
            var dateList = this.getDatesArray(this.startDate,this.stopDate);
            console.log(dateList);
            dateList.forEach(date => {
                this.getCasesByDate(date);
            });
            this.chart(dateList,this.data);
        }
    });
})
