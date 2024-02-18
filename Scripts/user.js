"use strict";

(function(core)
{
    class User {


        constructor(displayName = "", emailAddress = "", userName = "", password ="") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._userName = userName;
            this._password = password;
        }
        get displayName() {
            return this._displayName;
        }

        set displayName(value) {
            this._displayName = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get userName() {
            return this._userName;
        }

        set userName(value) {
            this._userName = value;
        }

        get password() {
            return this._password;
        }

        set password(value) {
            this._password = value;
        }

        toString(){
            return `DisplayName: ${this._displayName}\n EmailAddress: ${this._emailAddress}\n 
                    UserName ${this._userName}`
        }
        /**
            Serialize for writing to localStorage
         */
        serialize(){
            if(this._displayName !== "" && this._emailAddress !== "" && this._userName !== ""){
                return `${this.displayName}, ${this.emailAddress}, ${this.userName}`;
            }
            console.error("One or more of the Contact properties is missing or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from localStorage.
         */
        deserialize(data){
            let propertyArray = data.split(",");
            this._displayName   = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._userName = propertyArray[2];
        }

        toJSON(){
            return{
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                UserName: this._userName,
                Password: this.Password
            }
        }

        fromJSON(data){

            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._userName = data.UserName;
            this._password = data.Password;
        }
    }
// namespace definition
core.User = User;
}) ( core || (core = {}) );