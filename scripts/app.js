"use strict";


(function (){

    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        let AboutUsButton = document.getElementById("AboutUsBtn")

        AboutUsButton.addEventListener("click",function(){
            location.href="about.html";
        });

     let MainContent= document.getElementsByTagName("main")[0];

     let MainParagraph = document.createElement("p");

     MainParagraph.setAttribute("id","MainParagraph");
     MainParagraph.setAttribute("class","mt-3");
     MainParagraph.textContent="This is my first paragraph.";
     MainContent.appendChild(MainParagraph);

     let FirstString= "This is ";



     let SecondString=`${FirstString} the main paragraph.`;

     MainParagraph.textContent= SecondString;
     MainContent.appendChild(MainParagraph);

     let DocumentBody=document.body;
     let Article=document.createElement("article");
     let ArticleParagraph='<p id="ArticleParagraph" class="mt-3"> This is My Article Program </p>';
     Article.setAttribute("class","container");
     Article.innerHTML=ArticleParagraph;
     DocumentBody.appendChild(Article);
    }

    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage()")
    }

    function DisplayContactUsPage(){
        console.log(" DisplayContactUsPage()")
    }

    function  DisplayProductPage(){
        console.log(" DisplayProductPage()")
    }

    function DisplayServicePage(){
        console.log(" DisplayServicePage()")
    }
    function  Start(){
        console.log("App Started");

        switch (document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Our Services":
                DisplayServicePage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;

        }
    }
    window.addEventListener("load", Start);


})()