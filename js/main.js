let question = document.querySelector(".question"),
  countNum = document.querySelector(".count span"),
  answers = document.querySelector(".answers"),
  btn = document.getElementById("btn"),
  sliderNum = document.querySelector(".slider span"),
  perfect = document.querySelector(".perfect"),
  re = document.querySelector(".re"),
  reCont = document.querySelector(".re-cont");
var x = 0,
  right = 0;

function getData() {
  let data = new XMLHttpRequest();

  data.onreadystatechange = () => {
    if (data.readyState === 4 && data.status === 200) {
      let objData = JSON.parse(data.responseText);
      let objLength = objData.length;
      addData(objData[x], objLength);

      btn.addEventListener("click", () => {
        let rightAnswer = "true";
        x++;
        check(rightAnswer, objLength);
        question.innerHTML = "";
        answers.innerHTML = "";
        addData(objData[x], objLength);
        showResult(objLength);
      });
    }
  };

  data.open(
    "GET",
    "https://quizapi.io/api/v1/questions?apiKey=UkIpDmyn2Qx1yQaqCgq7Jw2E9BVuuMrrE1Qpmacs&category=code&difficulty=Hard&limit=20&tags=HTML"
  );
  data.send();
}

getData();

function addData(obj, count) {
  if (x < count) {
    countNum.innerHTML = count;
    sliderNum.innerHTML = x + 1;

    let head = document.createElement("h2");
    let headText = document.createTextNode(obj.question);
    head.appendChild(headText);
    question.appendChild(head);

    for (let i = 97; i <= 100; i++) {
      let char = String.fromCharCode(i);

      let y = obj.answers[`answer_${char}`];

      // create main div

      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      if (y === null) {
        mainDiv.className = "remove";
      }

      //create input

      let inp = document.createElement("input");
      inp.id = `answer_${i}`;
      inp.type = "radio";
      inp.name = `question`;
      inp.dataset.answer = obj.correct_answers[`answer_${char}_correct`];

      if (i == 97) {
        inp.checked = true;
      }

      // create label

      let label = document.createElement("label");
      label.htmlFor = `answer_${i}`;
      let labelText = document.createTextNode(obj.answers[`answer_${char}`]);

      label.appendChild(labelText);

      mainDiv.appendChild(inp);
      mainDiv.appendChild(label);

      answers.appendChild(mainDiv);
    }
  }
}

function check(correct, count) {
  let quiz = document.getElementsByName("question");
  let change;

  for (let i = 0; i < 4; i++) {
    if (quiz[i].checked) {
      change = quiz[i].dataset.answer;
    }
  }

  if (change == correct) {
    right++;
  }
}

function showResult(num) {
  if (x === num) {
    question.remove();
    btn.remove();
    answers.remove();
    sliderNum.remove();
    re.style.display = "block";

    reCont.innerHTML = `${right} of ${num}`;

    if (right > num / 2 && right < num) {
      perfect.className = "per";
      perfect.innerHTML = `Well done, You got ${right} out of ${num}`;
    } else if (right === num) {
      perfect.className = "per";
      perfect.innerHTML = `Excellent, You pass the exam`;
    } else {
      perfect.classList.add("lost");
      perfect.innerHTML = "You must study much harder!";
    }
  }
}
