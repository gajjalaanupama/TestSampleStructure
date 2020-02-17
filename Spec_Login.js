let mainWrapper = require('../../Utilities/Wrapper.js');
let wrap = new mainWrapper();

//let loginp = require('../../Page_Files/Login_Walgreens/Login_Page.js');
//let login = new loginp();

let loginpage = require('../../Page_Files/Walgreens/Login_Page.js');
let Walgreenslogin = new loginpage();

let loginTestData = require('../../Data_Files/Walgreens_Login_Data.json');

let S_Home = require('../../Page_Files/Walgreens/Store_Home_Operations.js');
let Walgreens_Store_Home = new S_Home();





describe("Wlagreens Login", function () {
    
    it('Login page of Walgreens Application', function () {

        Walgreenslogin.loginApp(loginTestData.Local_URL);

    });

   
        it('Click on IP/SR/PCA in Landing Page', function () {
    
            Walgreenslogin.LandingPage;
         //   Walgreens_Store_Home.verifyTitle;
        });

        // it('Click on Community Outreach in Landing Page', function () {
    
        //     Walgreenslogin.Store_Search;
            
        // });

    })


