const handleCategory = async () => {

    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.classList.add("tabs-container", "font-bold", "flex", "justify-between", "ml-3", "mb-2")

        div.innerHTML = `
        <a onclick ="handleLoadData('${category.category_id}')" id="click"   class=" active-tab active  tab ">${category.category}</a>
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
    const checkData = data.status;

   

    if (checkData) {
        data.data.forEach((card) => {

            const div = document.createElement('div');
            console.log(card);
           
            function showTime(time){
                  
                let hrs = time / 3600;
                let hrsValue =hrs.toFixed(0);
                let min = time / 60;
                let minValue =min.toFixed(0);
                
               return `${hrsValue}hours ${minValue}min ago      `;
            };
            
            
            div.innerHTML = `
        <div class="card h-[400px] bg-base-100 shadow-xl">
        <figure ><img src="${card.thumbnail}" alt="Banner Image"  />
        
            
        </figure>
        <p  id="show-time-container"  class="  flex justify-end bg-black text-white font-bold -mt-12 rounded-sm py-3 mr-1 ml-auto">${card.others.posted_date > 0 ? showTime(card.others.posted_date) : ''}</p>
        <div class="card-body my-5">
          <div class="flex  gap-2 ">
            <div>
                <img src="${card.authors[0].profile_picture}" class="rounded-full mr-2  w-[50px] h-[50px]" alt="">
            </div>
            <div>
                <h2 class="card-title text-2xl">${card.title}</h2>
                <p class="text-xl">${card.authors[0].profile_name}  <img class="inline" src="${card.authors[0].verified ? '../verified.png' : ''}"/></p>
          <small class="text-lg">${card.others.views ? card.others.views : ''}</small>
          
                
            </div>
           
          </div>
          
          
         
        </div>
                        
         </div>
        
        `;

            tabsCardContainer.appendChild(div);
        });
    } else {
        const error = document.createElement('div');
        error.innerHTML = `
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