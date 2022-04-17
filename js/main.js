
let addedtasklist = document.getElementById('addedtasklist');
let input = document.getElementById('input');
let addBtn = document.getElementById('addBtn');
let delBtn = document.getElementById('delBtn');
let saveBtn = document.getElementById('saveBtn')
let saveindex = document.getElementById('saveindex')
addBtn.addEventListener('click',()=>{
     inputValue = input.value
   // console.log('checking click event');
   if(inputValue.trim()!=0){
    let storage = localStorage.getItem('currTask')

    if (storage == null) {
        taskObj = []
    } else {
        //parse storage into objects bcoz many methods are not applicable on string bcoz of immutability
        taskObj = JSON.parse(storage)
    }
    taskObj.push(inputValue)
    console.log(taskObj);
    //convert json to string to store data
    localStorage.setItem('currTask',JSON.stringify(taskObj))
    
   }
 addTaskHandler();
})

addTaskHandler =()=>{
    let storage = localStorage.getItem('currTask')
    if (storage == null) {
        taskObj = []
    } else {
        taskObj = JSON.parse(storage)
    }
    let result = ''

    taskObj.forEach((task,index) => {
        result += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${task}</td>
                        <td><button type="button" onclick="editTaskHandler(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                        <td><button type="button" onclick="delTaskHandler(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                    </tr>`;
    });
    addedtasklist.innerHTML = result;
    input.value = ''
}
//to edit task function
editTaskHandler=(index)=>{
    saveindex.value = index
    let storage = localStorage.getItem('currTask');
    taskObj = JSON.parse(storage)
    input.value = taskObj[index]
    saveBtn.style.display = 'block'
    addBtn.style.display = 'none'
}

saveBtn.addEventListener('click',()=>{
    let storage = localStorage.getItem('currTask');
    taskObj = JSON.parse(storage)
    saveindexValue = saveindex.value
    taskObj[saveindexValue] = input.value
    localStorage.setItem('currTask',JSON.stringify(taskObj))
    saveBtn.style.display = 'none'
    addBtn.style.display = 'block'
    localStorage.setItem('currTask',JSON.stringify(taskObj))
    input.value = ''
    addTaskHandler();
})
//delete task handle
delTaskHandler=(index)=>{
    let storage = localStorage.getItem('currTask')
    let taskObj = JSON.parse(storage)
    taskObj.splice(index,1);
    localStorage.setItem('currTask',JSON.stringify(taskObj))
    addTaskHandler()
}

//handle delete all tasks 

delBtn.addEventListener('click',()=>{
    let storage = localStorage.getItem('currTask');
    let taskObj = JSON.parse(storage)
    if (storage == null) {
        taskObj=[]
    }else{
        taskObj = JSON.parse(storage);
        taskObj = []
    }
    localStorage.setItem('currTask',JSON.stringify(taskObj))
    saveBtn.style.display ='none'
    addBtn.style.display = 'block'
    addTaskHandler()
})

//search box handler
let searchtextbox = document.getElementById('searchtextbox')
searchtextbox.addEventListener('input',()=>{
    let tableRow = document.querySelectorAll('tr');
    Array.from(tableRow).forEach((e)=>{
        let searchText = e.getElementsByTagName('td')[0].innerText;
        let searchedValue = searchtextbox.value
        let re = new RegExp(searchedValue,'gi');
        if(searchText.match(re)){
            e.style.display = 'block'
        }else{
            e.style.display = 'none'
        }
        searchedValue = ''
    })
})
addTaskHandler()













// showtask();
// let addtaskinput = document.getElementById("addtaskinput");
// let addtaskbtn = document.getElementById("addtaskbtn");

// addtaskbtn.addEventListener("click", function(){
//     addtaskinputval = addtaskinput.value;
//     if(addtaskinputval.trim()!=0){
//         let webtask = localStorage.getItem("localtask");
//         if(webtask == null){
//             taskObj = [];
//         }
//         else{
//             taskObj = JSON.parse(webtask);
//         }
//         taskObj.push({'task_name':addtaskinputval, 'completeStatus':false});
// 		// console.log(taskObj, 'Ashendra');
//         localStorage.setItem("localtask", JSON.stringify(taskObj));
//         addtaskinput.value = '';
//     }
//     showtask();
// })

// // showtask
// function showtask(){
//     let webtask = localStorage.getItem("localtask");
//     if(webtask == null){
//         taskObj = [];
//     }
//     else{
//         taskObj = JSON.parse(webtask);
//     }
//     let html = '';
//     let addedtasklist = document.getElementById("addedtasklist");
//     taskObj.forEach((item, index) => {

//         if(item.completeStatus==true){
//             taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
//         }else{
//             taskCompleteValue = `<td>${item.task_name}</td>`;
//         }
//         html += `<tr>
//                     <th scope="row">${index+1}</th>
//                     ${taskCompleteValue}
//                     <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
//                     <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
//                     <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
//                 </tr>`;
//     });
//     addedtasklist.innerHTML = html;
// }

// // edittask
// function edittask(index){
//     let saveindex = document.getElementById("saveindex");
//     let addtaskbtn = document.getElementById("addtaskbtn");
//     let savetaskbtn = document.getElementById("savetaskbtn");
//     saveindex.value = index;
//     let webtask = localStorage.getItem("localtask");
//     let taskObj = JSON.parse(webtask); 
    
//     addtaskinput.value = taskObj[index]['task_name'];
//     addtaskbtn.style.display="none";
//     savetaskbtn.style.display="block";
// }

// // savetask
// let savetaskbtn = document.getElementById("savetaskbtn");
// savetaskbtn.addEventListener("click", function(){
//     let addtaskbtn = document.getElementById("addtaskbtn");
//     let webtask = localStorage.getItem("localtask");
//     let taskObj = JSON.parse(webtask); 
//     let saveindex = document.getElementById("saveindex").value;
    
//     for (keys in taskObj[saveindex]) {
//         if(keys == 'task_name'){
//             taskObj[saveindex].task_name = addtaskinput.value;
//         }
//       }
//     // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
//   //  taskObj[saveindex][task_name] = addtaskinput.value;
//     savetaskbtn.style.display="none";
//     addtaskbtn.style.display="block";
//     localStorage.setItem("localtask", JSON.stringify(taskObj));
//     addtaskinput.value='';
//     showtask();
// })
// // deleteitem
// function deleteitem(index){
//     let webtask = localStorage.getItem("localtask");
//     let taskObj = JSON.parse(webtask);
//     taskObj.splice(index, 1);
//     localStorage.setItem("localtask", JSON.stringify(taskObj));
//     showtask();
// }

// //complete task
// /* function completetask(index){
//     let webtask = localStorage.getItem("localtask");
//     let taskObj = JSON.parse(webtask);
//     taskObj[index] = '<span style="text-decoration:line-through">' + taskObj[index] + '</span>';
//     let addedtasklist = document.getElementById("addedtasklist");
//     addedtasklist.addEventListener("click", function(e){
//         console.log(addedtasklist)
//     })
//     localStorage.setItem("localtask", JSON.stringify(taskObj));
//     showtask();
// } */

// // complete task
// let addedtasklist = document.getElementById("addedtasklist");
//     addedtasklist.addEventListener("click", function(e){
//        // console.log(e);
        
//         // showtask();
//         let webtask = localStorage.getItem("localtask");
//         let taskObj = JSON.parse(webtask);
        
//         let mytarget = e.target;
//         if(mytarget.classList[0] === 'text-success'){
//         let mytargetid = mytarget.getAttribute("id");
        
        
//         // let taskValue = taskObj[mytargetid]['task_name'];
        
//         mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
//             // let mynewelem = mytargetpresibling.classList.toggle("completed");
//             // taskObj.splice(mytargetid,1,mynewelem);
//             for (keys in taskObj[mytargetid]) {
//                 if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
//                     taskObj[mytargetid].completeStatus = false;
//                    // taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':false};
//                 }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
//                     taskObj[mytargetid].completeStatus = true;
//                     //taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':true};
//                 }
//               }
//         //}
//        // showtask();        
//         localStorage.setItem("localtask", JSON.stringify(taskObj));
//         showtask();
//     }
//     })

    



// // deleteall
// let deleteallbtn = document.getElementById("deleteallbtn");
// deleteallbtn.addEventListener("click", function(){
//     let savetaskbtn = document.getElementById("savetaskbtn");
//     let addtaskbtn = document.getElementById("addtaskbtn");
//     let webtask = localStorage.getItem("localtask");
//     let taskObj = JSON.parse(webtask);
//     if(webtask == null){
//         taskObj = [];
//     }
//     else{
//         taskObj = JSON.parse(webtask);
//         taskObj = [];
//     }
//     savetaskbtn.style.display="none";
//     addtaskbtn.style.display="block";
//     localStorage.setItem("localtask", JSON.stringify(taskObj));
//     showtask();

// })


// // serachlist
// let searchtextbox = document.getElementById("searchtextbox");
// searchtextbox.addEventListener("input", function(){
//     let trlist = document.querySelectorAll("tr");
//     Array.from(trlist).forEach(function(item){
//         let searchedtext = item.getElementsByTagName("td")[0].innerText;
//         let searchtextboxval = searchtextbox.value;
//         let re = new RegExp(searchtextboxval, 'gi');
//         if(searchedtext.match(re)){
//             item.style.display="table-row";
//         }
//         else{
//             item.style.display="none";
//         }
//     })
// })














