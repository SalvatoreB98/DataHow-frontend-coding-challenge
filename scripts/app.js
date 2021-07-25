window.addEventListener("load", () => {
    const app = new Vue({
        el: '#app',
        data: {
            searchedCountry: 'ITA',
            countries: [],
            currentDate: new Date(),
            startDate: '',
            stopDate: '',
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
                axios.get(`https://covid-api.com/api/reports?date=2020-04-16&iso=${this.searchedCountry}`, {
                    params: {

                    }
                }
                ).then((resp) => {
                    console.log(resp.data.data)
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
            getCases(){
                dates = this.getDatesArray();
                dates.forEach(date => {
                    axios.get(`https://covid-api.com/api/reports?date=${date}&iso=${this.searchedCountry}`).
                    then((resp) => {
                        this.data = resp.data.data
                        console.log(resp.data.data)
                    });
                });
               
            }

        },
        mounted() {
            //get countries with axios
            axios.get('https://covid-api.com/api/regions?order=name', {
                params: {

                }
            }
            ).then((resp) => {
                this.countries = resp.data.data
                // console.log(resp.data.data)
            });
            currentDate = moment(this.currentDate)
            var startDate = currentDate.subtract(90, "days").format("YYYY-MM-DD");
            var startDate = moment('2021-01-02');
            var endDate = moment('2021-01-12');
            var dateList = this.getDatesArray(startDate,endDate);
            console.log(dateList);
            this.getCases();
            this.chart(dateList,);
        }
    });
})
