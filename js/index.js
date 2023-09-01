const handleCategory = async () => {

    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        console.log(category);
        div.innerHTML = `
        <a onclick ="handleLoadData('${category.category_id}')" class="  tab-color tab font-bold   flex justify-between  ml-3 mb-2 bg-gray-100">${category.category}</a>
        `;
        tabContainer.appendChild(div);

    })



};
const handleLoadData = async (categoryId) => {
    console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

   

    const tabsCardContainer = document.getElementById('tabs-card-container');
    const noContentContainer = document.getElementById('no-content-container');
    
    tabsCardContainer.innerHTML = ' ';
    noContentContainer.innerHTML = ' ';
    const checkData = data.status ;
    if(checkData){
        data.data.forEach((card) => {
        
            const div = document.createElement('div');
            
    
            div.innerHTML = `
        <div class="card h-[380px] bg-base-100 shadow-xl">
        <figure ><img src="${card.thumbnail}" alt="Banner Image"  /></figure>
        <div class="card-body">
          <div class="flex  gap-2 ">
            <div>
                <img src="${card.authors[0].profile_picture}" class="rounded-full mr-2  w-[50px] h-[50px]" alt="">
            </div>
            <div>
                <h2 class="card-title text-2xl">${card.title}</h2>
                <p class="text-xl">${card.authors[0].profile_name}</p>
          <small class="text-md">${card.others.views ? card.others.views : ''}</small>
                
            </div>
           
          </div>
          
          
         
        </div>
                        
         </div>
        
        `;
            tabsCardContainer.appendChild(div);
        });
    }else{
        const error = document.createElement('div');
        error.innerHTML =`
        <div>
            
            <img class="mx-auto" src="../icon.png"/>
            
            <h1 class=" text-2xl md:text-5xl font-bold">Oops!! Sorry, There is no <br>
             content here</h1>
            
            
        </div>
        `;
        noContentContainer.appendChild(error);
    }
    



};
handleCategory();
handleLoadData('1000');