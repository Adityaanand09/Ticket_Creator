let lockbtn=document.querySelector(".locker");
let lockflag=true;//lock ho rkha hai jab true hai ye

lockbtn.addEventListener("click",function(){
let taskDescElem = document.querySelectorAll(".task_description")
    if(lockflag==true)
    {
        //console.log("unlock");
        lockbtn.classList.remove("fa-lock");
        lockbtn.classList.add("fa-unlock-alt");
        taskDescElem.forEach(function(taskEditObj){
            taskEditObj.setAttribute("contenteditable",true);
        })
    }
    else
    {
        //console.log("lock");
        lockbtn.classList.remove("fa-unlock-alt");
        lockbtn.classList.add("fa-lock");
        taskDescElem.forEach(function(taskEditObj){
            taskEditObj.setAttribute("contenteditable",false);
        })

    }
    lockflag=!lockflag;
})