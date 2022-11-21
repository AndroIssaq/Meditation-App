const app=function(){
let song=document.querySelector(".song")
let play=document.querySelector(".play")
let pause=document.querySelector(".pause")
let outLine=document.querySelector(".moving-outline circle")
let video=document.querySelector(".vid-container video")
let sounds=document.querySelectorAll(".sound-picker button")
let timeDisplay=document.querySelector(".time-display")
let timeSelect=document.querySelectorAll(".time-select button")
let outLineLength=outLine.getTotalLength()
outLine.style.strokeDasharray=outLineLength
outLine.style.strokeDashoffset=outLineLength
video.pause()

let fakeDuration=600;
//play music
play.addEventListener("click", function(){
    chickingSong(song)
   
})

// chick if the song are paused
let chickingSong= song =>{
    if(song.paused){
        song.play();
        video.play()
       play.src="/svg/pause.svg"
    }else{
        song.pause();
        video.pause()
        play.src="/svg/play.svg"
    }
}

song.ontimeupdate=()=>{
    let currentTime=song.currentTime
    let elapsed=fakeDuration /* 10minute */ -  currentTime 
    let seconds= Math.floor(elapsed % 60) 
    let minute= Math.floor(elapsed/60) 
    let progress=outLineLength-(currentTime/fakeDuration)*outLineLength     
    outLine.style.strokeDashoffset=progress
    timeDisplay.textContent=`${minute} :${seconds} `
    if(currentTime>=fakeDuration){
        song.pause();
        play.src="svg/play.svg";
        song.currentTime=0;
        video.pause();
    }
    
}

timeSelect.forEach((btn)=>{
btn.onclick=function(){
fakeDuration=this.getAttribute("data-time")
timeDisplay.textContent=`${Math.floor(fakeDuration/60) } : ${Math.floor(fakeDuration%60) } `
}
})

sounds.forEach(btn=>{
    btn.onclick=function(){
        song.src=this.getAttribute("data-sound")
        video.src=this.getAttribute("data-video")
        chickingSong(song)
    }
})
}


app()

