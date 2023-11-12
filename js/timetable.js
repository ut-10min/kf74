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
      else if (name == "改行") {
        return { time: "\xa0", name: "\xa0", title: "", major: "" };
      }
      else if (
        (name == "(談話会 テーマ1)") ||
        (name == "(談話会 テーマ2)") ||
        (name == "(談話会 テーマ3)")

      ) {
        return {
          time: time, name: "進行：" + talk.chairperson,
          title: talk.title + "：<br />" + talk.name,
          major: ""
        };
      }
      /*
      else if (name == "第1部講演の録画を放映予定") {
        return { time: time, name: "", title: name, major: ""};
      }
      */
      // For speakers with multiple talk titles
      else if (name == "田口1") {
        return {
          time: time,
          name: talk.name,
          title: "",
          major: "",
        };
      }
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
  var renderedFirst = Mustache.render(template, { table: firstDayTable, header: "11/18 (金)" });
  var renderedSecond = Mustache.render(template, { table: secondDayTable, header: "11/19 (土)" });
  var renderedThird = Mustache.render(template, { table: thirdDayTable, header: "11/20 (日)" });
  $('.article-headline').html(renderedFirst + "<br />" + renderedSecond + "<br />" + renderedThird);
  // $('.article-headline').html(renderedFirst + "<br />" + renderedSecond);
});
