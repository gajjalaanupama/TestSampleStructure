let loginTestData = require('../../Data_Files/Walgreens_Login_Data.json');
let loginPageLocators = require('../../Locators/Walgreens_LoginPage.json');


let mainWrapper = require('../../Utilities/Wrapper.js');
let wrap = new mainWrapper();



let Loginpagep = function () {
};




Loginpagep.prototype = Object.create({}, {
    loginApp: {
        value: function (App_URL) {
            browser.get(App_URL);
      
            // if live site use this 
          //  wrap.input(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.live_username), loginTestData.UserName);

            // if dev/local site use this             
           wrap.input(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.UserName), loginTestData.UserName);
            
            //common for both live and dev
            wrap.input(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.Password), loginTestData.Password);
            wrap.click(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.loginButton));
            browser.sleep(5000)
        }
    },



LandingPage: {
    get: function () {
       
      wrap.click(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.Hints));
   
      wrap.click(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.Landing_Page_IP));
 
      //   wrap.scrollToElementMouseClick(wrap.locateElement("xpath",loginPageLocators.WalgreensLoginPage.Landing_Page_IP))

      browser.sleep(6000)
    }  
    },

   /* Logout: {
        get: function () {
           
          wrap.click(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.logout));
       
         
          browser.sleep(2000)
        }  
        },  */

   /*     Store_Search: {
            get: function () {
               
              wrap.click(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.Store_Search_button));
              wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.Store_Search_box).sendKeys("4466");
              wrap.click(wrap.locateElement("xpath", loginPageLocators.WalgreensLoginPage.Required_Store_Number));
              browser.sleep(5000)
            }  
            },  */
         
   
     
});

module.exports = Loginpagep;