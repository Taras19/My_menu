/* Розмір прокрутки*/
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
/* Розмір сторінки*/
var documentHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
        );
            
/* розмір вікна*/
var windowHeight = document.documentElement.clientHeight;

 /*pageContainer,menuLi буду використовувати для зміни активного стану меню при scroll*/
var pageContainer = document.querySelectorAll(".page-container");
var menuLi = document.querySelectorAll(".menu li:not(.dropdown)");
/* елементи які буду анімувати */
var wowAll = document.querySelectorAll(".wow");

/* оновлення даних при зміні орієнтації екрану*/
window.addEventListener("resize",function(){
    /* Розмір прокрутки*/
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    /* Розмір сторінки*/
    documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        );
            
    /* розмір вікна*/
    windowHeight = document.documentElement.clientHeight;

    /* зміна scroll-bar*/
    var progressBarIn = document.querySelector(".progress-bar__in");
    progressBarIn.style.width = scrollTop / ((documentHeight - windowHeight)  / 100)+ "%";
    
});   
             
/* Управління кнопкою меню */

var menuIcon = document.querySelector(".menu-icon");
    menuIcon.addEventListener("click", function(){
        document.querySelector(".menu").classList.toggle("responsiv");

        /* закривання submenu*/
        document.querySelector(".submenu").classList.remove("submenu-open-js");
        /* анімація */
        document.querySelector(".dropdown-icon").classList.remove("fadeInDown");
        if(document.querySelector(".menu").classList.contains("responsiv")){
            document.querySelector(".menu-icon a").innerHTML = "&#215";
            menuIcon.classList.remove("flash");
            menuIcon.classList.add("jello"); 
            }
        else{
            document.querySelector(".menu-icon a").innerHTML = "&#8801";
            menuIcon.classList.remove("jello");
            menuIcon.classList.add("flash");  
            }
        });

       
/* Зміна активного пункту меню при прокручуванні сторінки */
window.addEventListener("scroll", function(){
        /* Розмір прокрутки*/
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        
    /*Закривання меню при прокручуванні сторінки*/
    //document.querySelector(".menu").classList.remove("responsiv");
    /* закривання submenu */
    //document.querySelector(".submenu").classList.remove("submenu-open-js");
    /* анімація */
    //document.querySelector(".dropdown-icon").classList.remove("fadeInDown");
    /* Зміна іконки при закриванні меню */
    //document.querySelector(".menu-icon a").innerHTML = "&#8801"; 
                     
    /* зміна scroll-bar*/
    var progressBarIn = document.querySelector(".progress-bar__in");
    progressBarIn.style.width = scrollTop / ((documentHeight - windowHeight)  / 100)+ "%";

    /* зміна активних пунктів меню при прокрутці  */
    for(var i =0; i < pageContainer.length; i++){
        var coor = pageContainer[i].getBoundingClientRect();
        if(coor.bottom <= 40 && menuLi[i].classList.contains("active")){
            menuLi[i].classList.remove("active");
            /**/
            //wowAll[i].classList.remove("bounce");
            menuLi[i+1].classList.add("active");
            /**/
            //wowAll[i+1].classList.add("bounce");
            }
        if(coor.top >= windowHeight && menuLi[i].classList.contains("active") || coor.top>windowHeight/2.5 && menuLi[i].classList.contains("active")){
            menuLi[i].classList.remove("active");
            /**/
            //wowAll[i].classList.remove("bounce");
            menuLi[i-1].classList.add("active");
            //wowAll[i-1].classList.add("bounce");
            }
                
        if(scrollTop == 0){
            document.querySelector(".menu li.active").classList.remove("active");
            menuLi[0].classList.add("active");
            }
        if(scrollTop == documentHeight - windowHeight  ){
            document.querySelector(".menu li.active").classList.remove("active");
            menuLi[menuLi.length-1].classList.add("active");
            //wowAll[i].classList.remove("bounce");
            //wowAll[menuLi.length-1].classList.add("bounce");
            }

        }
        
    for(i = 0; i < wowAll.length; i++){
        var coorWow = wowAll[i].getBoundingClientRect();
        //console.log(coorWow.top + " position " + i);
        if( 59 < coorWow.top && coorWow.top < 101 ){
            wowAll[i].classList.add("bounce");
            console.log(coorWow.top + " position " + i);
            }
        else{
            wowAll[i].classList.remove("bounce"); 
            }
        if(scrollTop == documentHeight - windowHeight  ){
            wowAll[i].classList.remove("bounce");
            wowAll[wowAll.length-1].classList.add("bounce");
        }   
            
        }

            
    });
      

/* Подія для пункту меню*/
        
var menuElement = document.querySelectorAll(".menu li a");
    for(var i = 0; i < menuElement.length; i++){
        menuElement[i].addEventListener("click", function(event){
            document.querySelector(".menu").classList.remove("responsiv");
            /* закривання submenu */
            document.querySelector(".submenu").classList.remove("submenu-open-js");
            /* Зміна іконки при закриванні меню */
            document.querySelector(".menu-icon a").innerHTML = "&#8801"; 
            event.preventDefault();
            event.stopPropagation();
            /* отримую href від this*/
            var href = this.getAttribute("href");
             /* визначаю зміщення відносно батька*/
            var scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
            var scrollTo = document.querySelector(href).offsetTop;
            //scrollTo=scrollTo-40;
            var step = scrollTo-scrollСurrent;

            /* плавна прокрутка start*/
            if(scrollСurrent < scrollTo && scrollСurrent != documentHeight-windowHeight){
                
                function scrollDown(){
                            scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
                            if(scrollСurrent < scrollTo && scrollСurrent != documentHeight-windowHeight){
                                requestAnimationFrame(scrollDown);
                                window.scrollTo(0,scrollСurrent+step/30);
                            
                                }
                            
                            else if(scrollСurrent > scrollTo){
                                window.scrollTo(0,scrollTo);
                            }
                        }
                        
                scrollDown();
                
                    }
            else{
                    
                function scrollUp(){
                            scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
                            if(scrollСurrent > scrollTo){
                                requestAnimationFrame(scrollUp);
                                window.scrollTo(0,scrollСurrent+step/30);
                            
                                }
                            else if(scrollСurrent < scrollTo){
                                window.scrollTo(0,scrollTo);
                                }
                        }
                    scrollUp();
                                   
                }
                /* плавна прокрутка end*/
                 
                /* зміна активних пунктів меню при click по пункту меню*/
                document.querySelector(".menu li.active").classList.remove("active");
                this.parentElement.classList.add("active");
                /* анімація */
                document.querySelector(".dropdown-icon").classList.remove("fadeInDown");
                menuIcon.classList.remove("jello");
                menuIcon.classList.add("flash");
            });

        }

/* подія для dropdown*/
var dropdown = document.querySelector(".dropdown");
    dropdown.addEventListener("click", function(){
        document.querySelector(".submenu").classList.toggle("submenu-open-js");
        document.querySelector(".dropdown-icon").classList.toggle("fadeInDown");
    });


