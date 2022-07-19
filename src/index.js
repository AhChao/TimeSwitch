const app = Vue.createApp({
    created() { },
    data() {
        return {
            itemList: [{
                "itemId": 0,
                "itemName": "Read related material",
                "totalSecond": 0,
                "bgColor": this.getRandomColor()
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
        newItem() {
            let newId = Math.max(...this.itemList.map(x => x.itemId)) + 1;
            this.itemList.push(
                {
                    "itemId": newId,
                    "itemName": "Click to edit",
                    "totalSecond": 0,
                    "bgColor": this.getRandomColor(),
                    "temp": ""
                }
            );
        },
        removeItem(itemId) {
            this.itemList = this.itemList.filter(x => x.itemId != itemId);
        },
        getRandomColor() {
            return "#" + Math.floor(Math.random() * 16777215).toString(16);
        },
        changeColor(id) {
            this.itemList.filter(x => "color" + x.itemId == id)[0].bgColor = document.getElementById(id).value;
        },
    }
});
app.mount('#app');