<template>
    <div class="evolution">
        <div class="evolution__legend">
            <h3>Seguimiento</h3>
            <p>Sigue tu evolución diaria</p>
        </div>
        
        <apexchart 
            width="100%"
            height="200px" 
            type="area" 
            :options="options" 
            :series="series"
        ></apexchart>
    </div>
</template>

<script>
import useUser from '@/composables/useUser'
export default {
    setup() {
        const {evolution} = useUser()
        const data = evolution.value.map(entry => entry.value)
        evolution.value.sort((a,b) => {
            return new Date(a.date) - new Date(b.date);
        });
        const categories = evolution.value.map(entry => new Date(entry.date).toLocaleDateString() )
       
        const options= {
            chart: {
                id: 'vuechart'
            },
            toolbar: {
                show: false,
                autoSelected: 'pan'
            },
            stroke: {
                width: 0,
                curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            }, 
            colors:['#0bb783'],
            xaxis: {
                categories,
            },
            yaxis: {
                labels: {
                    show: false,
                }
            },
        }
        const series = [{
            name: 'series-1',
            data
        }]
        return {
            options,
            series
        }
    }
}
</script>

<style lang="scss" >
    .apexcharts-toolbar {
        display: none !important;
    }
    .evolution {
        justify-content: space-evenly;
    }
    .evolution__legend {
        padding-left: 2rem;
    }
    .evolution h3 {
        margin-bottom: .3rem;
    }
    .evolution p {
        font-weight: 300;
        color: $color-text-dark-medium;
    }
</style>