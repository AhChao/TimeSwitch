const app = Vue.createApp({
    created() { },
    data() {
        return {
            itemList: [{
                "TaskName": "Read related material",
                "TotalSecond": 0
            }],
        };
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        convertToDisplayTime(timeInSecond) {
            let timeStr = "";
            while (timeInSecond > 60) {
                let temp = timeInSecond / 60;
                timeStr += temp + ":";
            }
            timeStr += timeInSecond;
            return timeStr;
        }
    }
});
app.mount('#app');