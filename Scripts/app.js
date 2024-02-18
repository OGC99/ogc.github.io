"use strict";


(function(){

    function  CheckLogin() {
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout </a>`)
        }

        $("#logout").on("click", function() {
            sessionStorage.clear();
            location.href="login.html"
        });
    }
    function LoadHeader(html_data) {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current","page");
        CheckLogin();
    }

    function AjaxRequest(method, url, callback) {

        //Step 1: Instantiate an XHR object
        let xhr = new XMLHttpRequest();

        //Step 2: Open a connection to the server
        xhr.open(method, url);

        //Step 3: Add event listener for readystatechange
        // The readystate event is being triggered when the state of the document being  fetched changes
        xhr.addEventListener("readystatechange", () => {

            if(xhr.readyState === 4 && xhr.status === 200){

                // response succeeded - data is available in here only
                if(typeof  callback == "function"){
                    callback(xhr.responseText)
                }else{
                    console.error("ERROR: callback not a function")
                }

            }

        });

        //Step 4: send the request
        xhr.send();


    }

    function ContactFormValidation(){
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please, enter a valid name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please, enter a valid contact number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please, enter a valid email address.");
    }

    /**
     * This function validates input form text field.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function(){
            // Fail validation.
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)) {
                // Pattern fails.
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // Pass validation.
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");
        $("#AboutUsBtn").on("click", () =>{
            location.href="about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my first paragraph</p>`);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>
        </article>`);
        // let AboutUsButton = document.getElementById("AboutUsBtn")
        // AboutUsButton.addEventListener("click", function (){
        //     location.href = "about.html";
        // });
        //
        // let MainContent = document.getElementsByTagName("main")[0];
        // let MainParagraph = document.createElement("p");
        //
        // MainParagraph.setAttribute("id", "MainParagraph");
        // MainParagraph.setAttribute("class", "mt-3");
        //
        // MainParagraph.textContent = "This is my first paragraph";
        // MainContent.appendChild(MainParagraph);
        //
        // let FirstString = "This is";
        // let SecondString = `${FirstString} the main paragraph`;
        // MainParagraph.textContent = SecondString;
        // MainContent.appendChild(MainParagraph);
        //
        // let DocumentBody = document.body;
        // let Article = document.createElement("article");
        // let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        // Article.setAttribute("class",  "container");
        // Article.innerHTML = ArticleParagraph;
        // DocumentBody.appendChild(Article);
    }
    function DisplayProductPage(){
        console.log("Called DisplayProductPage()");

    }
    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage()");

    }
    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage()");

    }
    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");
        ContactFormValidation();
        //ValidateField(#fullName, regular);
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(){
            if(subscribeCheckbox.checked){
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }
    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");
        // check if it's empty
        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;

            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.fullName}</td>
                         <td>${contact.contactNumber}</td>
                         <td>${contact.emailAddress}</td>
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"> Edit</i>
                            </button> 
                         </td>
                         <td class="text-center">
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm"> Delete</i>
                                </button> 
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
        // add event handler to button
        $("#addButton").on("click", () => {
            location.href = "edit.html#add"
        });
        $("button.edit").on("click", function() {
            location.href = "edit.html#" + $(this).val();
        });

        $("button.delete").on("click", function (){
            if(confirm("Delete Contact, Please confirm")){
                localStorage.removeItem($(this).val());
            }
            location.href = "contact-list.html";
        });
    }

    function DisplayEditPage(){
        console.log("DisplayEdit Page Called ...");
        ContactFormValidation();
        // Read, return the add string or primary key. hash is #
        let page = location.hash.substring(1);
        //
        switch(page){
            case "add":
                //add contact chosen -- recycling edit page, to make an add contact page.
                $("main>h1").text("Add Contact");
                //updating html edit button
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"/> Add`);
                $("#editButton").on("click", (event) => {
                    //prevent form submission.
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
            default:
                //edit contact chosen.
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                // Pre-populate form with the values deserialized.
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {
                    //prevent from submission.
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    //redirect
                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
        }
    }
    function DisplayLoginPage(){
        console.log("Called DisplayServicesPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();


        $("#loginButton").on("click",function (){

            let success = false;
            let newUser = new core.User();

            $.get( "./data/users.json", function(data) {

                for ( const user of data.users ){

                    console.log(user);
                    if(username.value === user.UserName && password.value === user.Password){

                        success=true;
                        newUser.fromJSON(user);
                        break;
                    }
                }
                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";

                }else{

                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials")
                        .show();
                }
            });

        });

        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href="index.html";

        });

    }
    function DisplayRegisterPage(){
        console.log("Called DisplayServicesPage()");

    }
    function Start(){
        console.log("App Started");

        AjaxRequest("GET","header.html",LoadHeader);

        switch(document.title){
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
                DisplayServicesPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }
    window.addEventListener("load", Start);

})()