window.addEventListener("load",()=>{
    const app = new Vue({
        el: '#app',
        data: {
            searchedCountry : '',
            countries : []
        },
        methods: {
    
        },
        mounted() {
            axios.get('https://covid-api.com/api/regions',{
                params: ''
            }
            ).then((resp)=>{
                this.countries = resp.data.data
                console.log(resp.data.data)
            })
        }
    });
})
