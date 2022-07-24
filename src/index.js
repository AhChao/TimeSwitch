const app = Vue.createApp({
    created() { },
    data() {
        return {
            edit: {
                editing: false,
                editTarget: ""
            },
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
        editTime(id) {
            this.stopTimer();
            this.edit.editTarget = id;
            let timeString = this.convertToDisplayTime(this.itemList.filter(x => x.itemId == id)[0].totalSecond).split(":");
            document.getElementById("timeHour").value = timeString[0];
            document.getElementById("timeMinute").value = timeString[1];
            document.getElementById("timeSecond").value = timeString[2];
        },
        updateTime() {
            document.getElementById("closeModalButton").click();
            var totalSecond = document.getElementById("timeHour").value * 3600 +
                document.getElementById("timeMinute").value * 60 +
                document.getElementById("timeSecond").value * 1;
            this.itemList.filter(x => x.itemId == this.edit.editTarget)[0].totalSecond = totalSecond;
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