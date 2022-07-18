const app = Vue.createApp({
    created() { },
    data() {
        return {
            itemList: [{
                "itemId": 0,
                "itemName": "Read related material",
                "totalSecond": 0
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
        },
        removeItem(itemId) {
            this.itemList = this.itemList.filter(x => x.itemId != itemId);
        }
    }
});
app.mount('#app');