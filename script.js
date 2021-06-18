let addBtn = document.querySelector(".plus");
let modalContainer = document.querySelector(".modal_container");
let modal_filters = document.querySelectorAll(".modal_filters");
let desc_box = document.querySelector(".desc-box");
let taksCardContainer = document.querySelector(".task_card_container");
let mainContainer = document.querySelector(".main-container");
let delIcon = document.querySelector(".cross");


let flag =false;
let deleteState = false;
let colors= ["lightpink","lightblue","lightgreen","black"];
let cColor = "black";
let taskArr=[];let allItemList=[];
//WHEN SCREEN RELOADS THEN WE NEED TO RE RENDER THE ELEMENTS SO FOR THAT WE NEED TO USE LOCAL STORAGE TO RENDER
if(localStorage.getItem("allItemList"))
{
     allItemList = JSON.parse(localStorage.getItem("allItemList"));
    for(let i=0;i<taskArr.length;i++)
    {
        let {task,color,id}=taskaArr[i];
        createTicket(task,color,id);
    }
}

addBtn.addEventListener("click",function(){
    //console.log("clicked plus");
    if(flag==false)
    {
        console.log("clicked plus");
        modalContainer.style.display="flex";
    }
    else
    {
        
        modalContainer.style.display="none";
    }
    flag=!flag;
})//THIS FN IS TO HIDE AND REMOVE THE MODAL CONTAINER WHERE WE WRITE THE TASK AND ADD IT 

for(let i=0;i<modal_filters.length;i++)
{
    modal_filters[i].classList.remove("border");
    modal_filters[i].addEventListener("click",function(){
        modal_filters.forEach((modal_filter)=>{
            modal_filter.classList.remove("border");
        })
        modal_filters[i].classList.add("border");
        cColor = modal_filters[i].classList[1];
    })
}//THIS FN IS TO HIGHLIGHT WHICH PRIORITY COLOR WE ARE USING TO CREATE THE TICKET

console.log(cColor);
let c=0;
desc_box.addEventListener("keypress",function(e){
    if(e.key=="Enter")
    {
        let task = desc_box.value;
        //console.log("task",task,"currcolor",cColor);
        createTicket(task,cColor);
        cColor = colors[colors.length-1];
        modalContainer.style.display="none";
        flag=false;
        desc_box.value="";

  
    }

})

let taskInsideTicket = document.querySelector("p");
console.log(taskInsideTicket);

function createTicket(task,cColor,myid){
    // <div class="task_card_container">
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class","task_card_container");
    let id = myid||uid();
    ticketContainer.innerHTML =` <div class="task_proirity ${cColor}"></div>
    <div class="task_card">
        <h3 class="task_id">${id}</h3>
        <p class="task_description" >${task}</p>
    </div>
</div>`;
//ticketContainer.setAttribute("contenteditable",true);//TO MAKE THE TICKET CONTENT EDITABLE
mainContainer.appendChild(ticketContainer);
let task_Priority = ticketContainer.querySelector(".task_proirity")
//let id = myid||uid();
//IF(!MYID) =>THIS MEANS THAT THE TICKET ID DOESNT EXIST YET IN THE LOCAL STORAGE YET
 if(!myid){
    taskArr.push({
        color:cColor,
        id:id,
        task:task
    })
    localStorage.setItem("allItemList",JSON.stringify(taskArr));
 }
ticketContainerStripColor(task_Priority);
deleteTaskContainer(ticketContainer);
}//THIS FN WILL CREATE THE TICKET

function ticketContainerStripColor(task_Priority)
{
   
task_Priority.addEventListener("click",function(){
    console.log(task_Priority);
    let cColorClass = task_Priority.classList[1];
    console.log(cColorClass);
    task_Priority.classList.remove(cColorClass);
    for(let i =0;i<colors.length;i++)
    {
        if(colors[i]==cColorClass&&(i+1)<colors.length)
        {
           
            task_Priority.classList.add(colors[i+1]);
            changeColorindb(task_Priority,colors[i+1]);
            break;
        }
        else if((i+1)==colors.length)
        {
            task_Priority.classList.remove("cColorClass");
            task_Priority.classList.add(colors[0]);
            changeColorindb(task_Priority,colors[0]);
        }
        
    }
   
})
}//TO CHANGE THE STRIP COLOR WHEN WE CLICK ON THE TICKET
let selectTicket=false;
delIcon.addEventListener("click",function(){
    //console.log("del icon clicked");
    
    if(selectTicket==true)
    {
        delIcon.style.backgroundColor ="rgb(146, 102, 35)";
    }
    else
    {
        delIcon.style.backgroundColor ="rgb(75, 53, 19)";
    }
    selectTicket=!selectTicket;
})

function deleteTaskContainer(ticketContainer){
    console.log(allItemList);
      ticketContainer.addEventListener("click",function(){
          //TO REMOVE148 TO 156 IS TO  FROM LOCAL STORAGE
        if(selectTicket==true)
        {
            let ticket_id = document.querySelector(".task_id").innerText;
        
         let idx =taskArr.findIndex(function(ticket){
            return ticket.id==ticket_id;
         })
         console.log(idx);
         taskArr.splice(idx,1);
         localStorage.setItem("allItemList", JSON.stringify(taskArr));

         //LINE 159 IS JUST TO REMOVE FROM UI
               ticketContainer.remove();
            
              
            console.log(ticket_id.innerHTML);

        }
    
      })
    }


//making this fn to update the color in db as well when we change the strip color on UI
 function changeColorindb(orgcolorindb, color_to_be_changed_to)
{
    let ticketSubcontainerElem = orgcolorindb.parentNode.children[1];
    //console.log(ticketSubcontainerElem,"dd2d2d2");
    let id = ticketSubcontainerElem.children[0].innerHTML;//we get the id of the element  whose color we need to update
    //console.log(id,"dididid");
let idx = taskArr.findIndex(function(ticket){
return ticket.id==id;
});
taskArr[idx].color = color_to_be_changed_to;
localStorage.setItem("allItemList", JSON.stringify(taskArr));

}