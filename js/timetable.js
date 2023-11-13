function construstTimeTable(timeTable, talksData) {
    return Object.keys(timeTable)
        .filter(function (k) { return timeTable[k]; })
        .sort()
        .map(function (time) {
            // console.log(time);
            var name = timeTable[time];
            // console.log(name);
            var index = 0;
            var talk = talksData.filter(function (t) { return t.name.indexOf(name) == 0; })[index];

            // 何部目か判定
            if (
                (name == "第1部") ||
                (name == "第2部") ||
                (name == "第3部") ||
                (name == "第4部")
            ) {
                return { time: name, name: "", title: "", major: "" };
            }
            // 改行
            else if (name == "改行") {
                return { time: "\xa0", name: "\xa0", title: "", major: "" };
            }
            // 休憩・座談会
            else if (name.indexOf("休憩・座談会") == 0) {
                return { time: time, name: "", title: name, major: "" };
            }
            // 小林さんの実験
            else if (name == "小林実験"
            ) {
                return {
                    time: time,
                    name: "小林 大輝",
                    title: "ワークショップ：高圧氷の結晶成長の観察",
                    major: "理学系研究科"
                };
            }
            // 田口さんの講演2
            else if (name == "田口2") {
                return {
                    time: time,
                    name: "田口 富隆",
                    title: "アインシュタインの最後の宿題が遺したもの",
                    major: "工学系研究科",
                };
            }
            /*
            else if (name == "第1部講演の録画を放映予定") {
              return { time: time, name: "", title: name, major: ""};
            }
            */
            // 講演
            else {
                return { time: time, name: talk.name, title: talk.title, major: talk.affiliation };
            }
        });
}


$(function () {
    var firstDayTable = construstTimeTable(day1, data);
    var secondDayTable = construstTimeTable(day2, data);
    var thirdDayTable = construstTimeTable(day3, data);

    var template = $('#template').html();
    Mustache.parse(template);
    var renderedFirst = Mustache.render(template, { table: firstDayTable, header: "11/24 (金)" });
    var renderedSecond = Mustache.render(template, { table: secondDayTable, header: "11/25 (土)" });
    var renderedThird = Mustache.render(template, { table: thirdDayTable, header: "11/26 (日)" });
    $('.article-headline').html(renderedFirst + "<br />" + renderedSecond + "<br />" + renderedThird);
    // $('.article-headline').html(renderedFirst + "<br />" + renderedSecond);
});
