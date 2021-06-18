let allFilterElem = document.querySelectorAll(".filter-colors__container");
for(let i=0;i<allFilterElem.length;i++)
{
    let count=0;
    allFilterElem[i].addEventListener("click",function(){
        
      // console.log("click");
            let filterColor = allFilterElem[i].children[0].classList[0];
            let allticketContainer = document.querySelectorAll(".task_card_container");
            let length = allticketContainer.length;
            let prev_FilterColor=null;let req_array=taskArr;

              for(let i=0;i<length;i++)
              {
                allticketContainer[i].remove();
              }
              

       if(prev_FilterColor!=null && prev_FilterColor==filterColor)
        {
            console.log("Iam here");
            req_array=taskArr;
            req_array.forEach(function(createTicketofSelectedColor){
                let {task,color,id} = createTicketofSelectedColor;
                createTicket(task,color,id);
              })
        }
        else
        {
            req_array = taskArr.filter(function(taskArrobj){
                return(taskArrobj.color == filterColor)
                      })

                     
                      prev_FilterColor = filterColor;
        }     
        req_array.forEach(function(createTicketofSelectedColor){
            let {task,color,id} = createTicketofSelectedColor;
            createTicket(task,color,id);
          }) 
        
                  
    })

}


