window.addEventListener("load",()=>{
    const app = new Vue({
        el: '#app',
        data: {
            searchedCountry : '',
            countries : []
        },
        methods: {
            chart(){
                let myChart = document.getElementById('myChart').getContext('2d');
                let covidChart = new Chart(myChart, {
                    type:'line',
                    data:{
                        labels:['19/02','20/02'],
                        datasets:[{
                            label:'date',
                            data:[
                                1,2,3,4,5,6,4,7,
                            ]
                        }]
                    },
                    options:{}
                })
            }
        },
        mounted() {
            axios.get('https://covid-api.com/api/regions?order=name',{
                params: {
                    
                }
            }
            ).then((resp)=>{
                this.countries = resp.data.data
                console.log(resp.data.data)
            });
            axios.get('https://covid-api.com/api/regions?order=name',{
                params: {
                    
                }
            }
            ).then((resp)=>{
                this.countries = resp.data.data
                console.log(resp.data.data)
            });
            this.chart();
        }
    });
})
