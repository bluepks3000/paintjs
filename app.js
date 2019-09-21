const canvas = document.getElementById("jsCanvas"); //Canvas 가져오기
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; //처음 시작 색이 검은색
const CANVAS_SIZE = 700; //cnavas size를 지정해주지 않으면 함수들이 실행이 안됨. 변수는 반복적으로 사용 될 때 정의한다. (니콜라스)

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 기본 배경화면을 하얀색으로 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5; //선 굵기

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY; //Canvas에서의 좌표값. console.log로 offsetX, offsetY의 값을 알 수 있음.
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y); //클릭하기 전까지 path 만드는 것. 클릭하면 이 함수는 적용되지 않음.
  } else {
    ctx.lineTo(x, y); //현재 path의 마지막 점과 x, y를 직선으로 연결한다(?)
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PainJS[EXPORT]";
  link.click(); //클릭을 가짜로 만든다(?)
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //Canvas 확인
  canvas.addEventListener("mousedown", startPainting); //Mouse 클릭했을 때 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting); //Mouse가 canvas 밖으로 나갔을 때
  canvas.addEventListener("click", handleCanvasClick); //fill
  canvas.addEventListener("contextmenu", handleCM); //마우스 우클릭 방지
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
