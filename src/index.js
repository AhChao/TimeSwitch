const app = Vue.createApp({
    created() { },
    data() {
        return {
            timer: {
                timerTarget: "",
                timerInstance: null,
            },
            itemList: [{
                "itemId": 0,
                "itemName": "Read related material",
                "totalSecond": 0,
                "bgColor": this.getRandomColor(),
            }],
        };
    },
    mounted() {
        this.init();
    },
    computed: {
    },
    methods: {
        init() {
            console.log("page init");

        },
        convertToDisplayTime(timeInSecond) {
            var sec_num = parseInt(timeInSecond, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            return hours + ':' + minutes + ':' + seconds;
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
        startTimer() {
            clearInterval(this.timer.timerInstance);
            this.timer.timerInstance = setInterval(this.timerDoSth, 1000);
        },
        stopTimer() {
            clearInterval(this.timer.timerInstance);
            this.timer.timerInstance = null;
        },
        timerDoSth() {
            if (this.itemList.map(x => x.itemId).indexOf(this.timer.timerTarget) == -1) return;
            this.itemList.filter(x => x.itemId == this.timer.timerTarget)[0].totalSecond++;
        },
        changeTimerTarget(id) {
            if (this.timer.timerTarget == id && this.timer.timerInstance != null) {
                this.stopTimer();
                return;
            }
            this.timer.timerTarget = id;
            this.startTimer();
        },
        removeItem(itemId) {
            this.itemList = this.itemList.filter(x => x.itemId != itemId);
        },
        getRandomColor() {
            return "#" + Math.floor(Math.random() * 16777215).toString(16);
        },
    }
});
app.mount('#app');