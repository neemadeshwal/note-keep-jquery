

//*** declaring the constants */

const colorPaletteContainer=$('.color-palette-container')
const palette=$('.bi-palette')
const addNote=$('.add-note')
const topAddNote=$('.top-note')
const addTitle=$('.add-title')
const addNoteContainer=$('.add-note-container')
const listItem=$('.list-item')
const submitBtn=$('.add')
const submitForm=$('.submit-form')


// all the declared variables

let editTitle;
let editNote;
let editElement;
let isEdit=false;
let editId;
let targetColor="";




// // // background color

window.addEventListener('DOMContentLoaded',setItem)

submitForm.submit(addItem)


//dealing with the background color of notes 

const colorPaletteChildren=colorPaletteContainer.children()

colorPaletteChildren[0].classList.add('add-border')


colorPaletteChildren.click((event)=>{

    colorPaletteChildren.removeClass('add-border')
    const color=event.target.classList[0]

    event.target.classList.add('add-border')
    targetColor=event.target.classList[0]

    addNoteContainer.css('background-color',`${color}`)
    addNote.css('background-color',`${color}`)
    addTitle.css('background-color',`${color}`)
    addNoteContainer.css('transition',`0.4s ease-in-out all`)
    addNote.css('transition',`0.4s ease-in-out all`)
    addTitle.css('transition',`0.4s ease-in-out all`)
})







palette.click(()=>{
    colorPaletteContainer.toggleClass('open-container')
})



/// opens up the input note container
topAddNote.keydown(()=>{

    addNoteContainer.addClass('show-note-containers')
    topAddNote.removeClass('show-note-containers')

    addNote.focus()

})
topAddNote.click(()=>{

  addNoteContainer.addClass('show-note-containers')
  topAddNote.removeClass('show-note-containers')

  addNote.focus()


})


const noteOuterContainer=$('.note-outer-container')



//function to create notes when add btn is triggered

function addItem(e){
    e.preventDefault()
    let note;
    let title;

  note=addNote.val()

  title= addTitle.val()

 const id=new Date().getTime().toString();
    if((title!==''&& !isEdit)||(note!==''&&!isEdit)){

        addToLocalStorage(id,title,note,targetColor)

      const noteContainer=document.createElement('section')

        $(noteContainer).attr('id',id)
        $(noteContainer).attr('class','note-container')
        $(noteContainer).css('background',targetColor)

        noteContainer.innerHTML=

        `
        <div id=${id} class='notes'>
        <h3>${title&& title}</h3>
        <p>${note&&note}</p>

        </div>
        <div class='note-btn-container'>
        <i class="bi bi-pencil-square"></i>

        <i class="bi bi-trash"></i>
        </div>
       
      `
      noteOuterContainer.append(noteContainer)

             const deletebtn=$('.bi-trash')
             deletebtn.click((event)=>{

                  const clickedID=$(event.target).parent().parent().prop('id')
                  $(event.target).parent().parent().remove()

                  removeItem(clickedID)
                 })
                 const editBtn=$('.bi-pencil-square')
                 editBtn.click((e)=>{
            
                 editItem(e)
                 })

                }

                //if editing is true 
    else if((title!=='' && isEdit)||(note!==''&&isEdit)){
        console.log("hey is edit is true")
        $(editTitle).html(title)
        $(editNote).html(note)
        $(editElement).css('background-color',targetColor)

       


        editlocalStorageItem(editId,title,note,targetColor)
     
    
    

    }

    else{
        console.log('empty value')
    }
setToDefault()

    colorPaletteContainer.removeClass('open-container')

    addNoteContainer.removeClass('show-note-containers')
    topAddNote.addClass('show-note-containers')
   
}







/// this places the content of already created note for edit item when edit btn is triggered

function editItem(event){
    addNoteContainer.addClass('show-note-containers')
    topAddNote.removeClass('show-note-containers')
    const element=$(event.target).parent().parent()
     editTitle=$($(event.target).parent().prev()).children('h3')

    editNote=$($(event.target).parent().prev()).children('p')
    editElement=$(element)
   $(addTitle).val(editTitle.html())
   $(addNote).val(editNote.html())
   const noteColor=$(element).css('background-color')
   $(addNoteContainer).css('background-color',noteColor)
   $(addNote).css('background-color',noteColor)
   $(addTitle).css('background-color',noteColor)

   isEdit=true
   editId=$(element).prop('id')
   $('.add').html('edit')



 }

 //setting the values to default again after has been created
 function setToDefault(){

    $(addTitle).val("")
     $(addNote).val("")


    editId=""
    editElement=""
    isEdit=false
    $('.add').html('add')
    addNoteContainer.css('background-color',`white`)
    addNote.css('background-color',`white`)
    addTitle.css('background-color',`white`)


 }


 function getLocalStorage(){

    return localStorage.getItem("notes")?JSON.parse(localStorage.getItem("notes")):[]


}

function setItem(){
    const getItem=getLocalStorage()
        getItem.forEach((item)=>{
            getlistItem(item.id,item.title,item.note,item.bgColor,item.isPinned,item.inNoteContainer)
        })

    }


///adding the created note to local storage
function addToLocalStorage(id,title,note,targetColor){
    const getItem=getLocalStorage()

    getItem.push({id:id,title:title,note:note,bgColor:targetColor})


    localStorage.setItem("notes",JSON.stringify(getItem))




}


 //get the list of item from local storage once domcontent get reloaded.
function getlistItem(id,title,note,bgColor){
    

        const noteContainer=document.createElement('section')

        $(noteContainer).attr('id',id)
        $(noteContainer).attr('class','note-container')
        $(noteContainer).css('background',`${bgColor}`)
   
        noteContainer.innerHTML=
            `
            <div id=${id} class='notes'>
            <h3>${title&& title}</h3>
            <p>${note&&note}</p>

            </div>
            <div class='note-btn-container'>
            <i class="bi bi-pencil-square"></i>

            <i class="bi bi-trash"></i>


         </div>
        
         </div>


        `
        noteOuterContainer.append(noteContainer)
    
   

      ///functionality to edit and delete item when triggered
        const deletebtn=$('.bi-trash')
deletebtn.click((event)=>{


     const clickedID=$(event.target).parent().parent().prop('id')
     $(event.target).parent().parent().remove()

     removeItem(clickedID)
    }
     )
     const editBtn=$('.bi-pencil-square')
editBtn.click((e)=>{
  editItem(e)
})  }  




   // removing the local storage note

    function removeItem(id){
        let getItem=JSON.parse(localStorage.getItem('notes'))
        getItem=getItem.filter((item)=>item.id!==id)
        localStorage.setItem('notes',JSON.stringify(getItem))
    }


     //edit the item in local storage..
    function editlocalStorageItem(id,title,note,targetColor){
          let getItem=getLocalStorage()

          getItem=getItem.map((item)=>{
            if(item.id===id){
                item.title=title;
                item.note=note;
                item.bgColor=targetColor;
            }
             return item;
          })
          localStorage.setItem('notes',JSON.stringify(getItem))
    }









