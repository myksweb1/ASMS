// Page Layout 
function layout(param){
var elements = document.getElementsByClassName("hideElement");
for (let element of elements) {
      element.style.display="none";
   }
var id = document.getElementById(""+param+"");
id.style.display="block";
if (param != "page7" && param != "page8") {
   document.getElementById("pageBTN").style.display = "block";
  }
}
window.onload = layout('page7');

// Add Customer
function addCustomer() {
        var arrData;
        var admin = document.getElementById("admin").value;
        var customer = document.getElementById("customer").value;
        if (customer != "") {
                
                if (localStorage.getItem("AMS") == null) {
                        arrData = [];
                } else {
                        arrData = JSON.parse(localStorage.getItem("AMS"));
                }
                var userkey = arrData[admin];
                userkey.push({[customer]: [] });
                localStorage.setItem("AMS", JSON.stringify(arrData));
                
                var customer = document.getElementById("customer").value = "";
                showCustomer();
                TransectionCustomer();
        var Ssms = document.getElementById("customerSuccessSMS");
        Ssms.innerHTML = 'RECORD SAVE SUCCESSFULLY';
        setTimeout(function () {
        Ssms.innerHTML = "";
        }, 5000);
      }else{
        var csms = document.getElementById("customerErrorSMS");
        csms.innerHTML = '**Please enter correct customer name';
        setTimeout(function () {
        csms.innerHTML = "";
        }, 5000);
    }
} // not validate exists

// Show Customer
function showCustomer() {
    var admn = document.getElementById("admin").value;
    var arrData;
    if(localStorage.getItem("AMS") == null){
        arrData = [];
    }else{
        arrData = JSON.parse(localStorage.getItem("AMS"));
    }
    var userKey = arrData[admn];
    var customerdata = document.getElementById("customerData");
    var customerRecord = document.getElementById("CustomerRecord");
    var row = "";
    customerRecord.innerHTML = "";
    for (var i = 0; i < userKey.length; i++) {
            for (var k in userKey[i]) {
              row += '<div class="row py-1">'+
                          '<div class="col-12">'+
                              '<div class="account-heading-theme rounded px-3 py-2">'+
                                  '<div class="d-flex justify-content-between align-items-center">'+
                                     '<span class="account-heading font-weight-bold">'+ k +'</span>'+
                                     '<span>'+
                                     '<a class="btn account-heading-btn mr-2" onclick="layout(`page5`), showData('+ i +')">View</a>'+
                                     '<a class="btn account-heading-btn" onclick="showConfirm(`Are you sure delete this Customer`,function (result){if(result){deleteCustomer('+i+')}})">Delete</a>'+       
                                     '</span>'+
                                  '</div>'+
                              '</div>'+
                           '</div>'+  
                       '</div>';
              customerRecord.innerHTML += '<option value="'+ i +'">'+ k +'</option>';         
            }
    }
    customerdata.innerHTML = row;
} //

// Delete Customer 
function deleteCustomer(index){
    var admin = document.getElementById("admin").value;
    var arrData;
    if(localStorage.getItem("AMS") == null){
        arrData = [];
    }else{
        arrData = JSON.parse(localStorage.getItem("AMS"));
    }
    var userKey = arrData[admin];
    userKey.splice(index, 1);
    localStorage.setItem("AMS", JSON.stringify(arrData));
    showCustomer(); 
} //

// show Transection Customer bise
function showData(index){
       var admin = document.getElementById("admin").value;
       TotalDebitCreditBallance(index);
       var tbdy = document.getElementById("tbody");
       if (localStorage.getItem("AMS") == null) {
        arrData = [];
        } else {
        arrData = JSON.parse(localStorage.getItem("AMS"));
        }
       var userKey = arrData[admin];
       var obj = userKey[index];
       var vl = Object.values(obj)
       var row = "";
       for (var i = 0; i < vl.length; i++) {
               tbdy.innerHTML = "";
               for (var a = 0; a < vl[i].length; a++) {
                   row += '<tr>'+
                                    '<td>'+ vl[i][a].Particular +'</td>'+
                                    '<td>'+ vl[i][a].Debit +'</td>'+
                                    '<td>'+ vl[i][a].Credit +'</td>'+
                                    '<td>'+ vl[i][a].Dates +'</td>'+
                                    '<td>'+ vl[i][a].Time +'</td>'+ 
                                   
                                    '<td class="status">'+
                                         '<div class="d-flex align-items-center justify-content-center">';
                                         if(vl[i][a].Invoice != ''){
                                               row += '<button class="btn edit-theme"><a href="#" onclick="showInvoice('+ index +','+ a +'), layout(`page6`)"><i class="fas fa-edit text-light"></i>View</a></button>';  
                                         }
                                               row += '&nbsp;'+
                                               '<button class="btn delete-theme brandbtnDelete" onclick="showConfirm(`Are you sure delete this Transection`,function (result){if(result){deleteTransection('+ index +','+ a +')}})"><i class="fas fa-trash-alt"></i>Delete</button>'+
                                         '</div>'+
                                    '</td>'+
                               '</tr>'; 
                  tbdy.innerHTML = row;         
               }
       }
}   //                       

// Total Debit , Credit , Ballance 
function TotalDebitCreditBallance(index) {
       var admin = document.getElementById("admin").value;
       var tDBt = document.getElementById("TotalDBT");
       var tCRt = document.getElementById("TotalCRD");
       var tBLc = document.getElementById("TotalBLC");
       if (localStorage.getItem("AMS") == null) {
               arrData = [];
       } else {
               arrData = JSON.parse(localStorage.getItem("AMS"));
       }
       var userKey = arrData[admin];
       var obj = userKey[index];
       var vl = Object.values(obj)
       for (var i = 0; i < vl.length; i++) {
               var crtA = vl[i].reduce((total, item) => total + item.Credit, 0);
               tCRt.innerHTML = crtA;
               var dbtA = vl[i].reduce((total, item) => total + item.Debit, 0);
               tDBt.innerHTML = dbtA;
               var tAmt = dbtA - crtA;
               if (tAmt <= 0) {
                       tBLc.innerHTML = tAmt + " " + "Cr";
               } else {
                       tBLc.innerHTML = tAmt + " " + "Dr";
               }
       
       }
}   //   

// Delete Transection 
function deleteTransection(Cindex, Tindex){
        var admin = document.getElementById("admin").value;
        var deletedTransection = "";
        if (localStorage.getItem("AMS") == null) {
        arrData = [];
        } else {
        arrData = JSON.parse(localStorage.getItem("AMS"));
        }
       var userKey = arrData[admin];
       var obj = userKey[Cindex];
       var vl = Object.values(obj) 
       for (var i = 0; i < vl.length; i++) {
           vl[i].splice(Tindex, 1);
       }
       localStorage.setItem("AMS", JSON.stringify(arrData));
       showData(Cindex)
}  //

// Show Invoice Customer Transection bise
function showInvoice(CustIndex, TransIndex){
      var admin = document.getElementById("admin").value;
      var tbd = document.getElementById("tbod");
      var invTotalid = document.getElementById("invoiceTotal");
       if (localStorage.getItem("AMS") == null) {
        arrData = [];
        } else {
        arrData = JSON.parse(localStorage.getItem("AMS"));
        }
       var userKey = arrData[admin];
       var obj = userKey[CustIndex];
       var vl = Object.values(obj) 
       for (var i = 0; i < vl.length; i++) {
              var inv = vl[i][TransIndex];
             var invArr = inv.Invoice;
             var invTotal = invArr.reduce((total, item) => total + item.Total, 0);
             invTotalid.innerHTML = invTotal;
             tbd.innerHTML = "";
             for (var x = 0; x < invArr.length; x++) {
                     tbd.innerHTML += '<tr>'+
                                    '<td>'+ invArr[x].Product +'</td>'+
                                    '<td>'+ invArr[x].Qty +' '+invArr[x].Measure+'</td>'+
                                    '<td>'+ invArr[x].Price +'</td>'+
                                    '<td>'+ invArr[x].Total +'</td>'+
                               '</tr>';  
             }
       }
}   //
                               
// Add Product
function addProduct(){
        var prod = document.getElementById("product").value;
        var qty = document.getElementById("quantity").value;
        var m = document.getElementById("measurement").value;
        var pri = document.getElementById("price").value;
        var smsM = document.getElementById("ErrorM");
        // Validation
        
if(prod!= "" && qty!= "" && m!= "" && pri!= ""){
        
        var validateObj = validate(qty,m,pri);
        var Qty = validateObj.Qty;
        var Type = validateObj.Type;
        var Price =validateObj.Price;
        var ttl =validateObj.Total;
        var Total = Math.ceil(ttl);
        var ErrorSMS = validateObj.ErrorSMS;
         
       if(ErrorSMS == ""){    
        var arrData;
        if (localStorage.getItem("Product") == null) {
                        arrData = [];
                } else {
                        arrData = JSON.parse(localStorage.getItem("Product"));
                }
                arrData.push({Product:prod,Qty:Qty,Measure:Type,Price:Price,Total:Total});
                localStorage.setItem("Product", JSON.stringify(arrData));
         var pro = document.getElementById("product").value="";
         var qty = document.getElementById("quantity").value="";
         var m = document.getElementById("measurement").value="PCS";
         var pri = document.getElementById("price").value="";
         showProduct();
         
       } else {
             smsM.innerHTML = ErrorSMS;
             setTimeout(function () {
                   smsM.innerHTML = "";
             }, 5000);  
       }      
      
         
   } else {
      smsM.innerHTML = "<div class='pt-2'> Please Fill All Fields</div>";
        setTimeout(function () {
             smsM.innerHTML = "";
         }, 5000);
    }
    
}   //    

// Measurement Form Validation
function validate(qt, typ, pric) {
      var quantity ="";
      var types="";
      var prices="";
      var total=""; 
      
  var qty = qt;
  var type = typ;
  var price = pric;
       
 var pcs = "PCS"; var kl = "KILO"; var kg = "KILOGRAM"; var g = "GRAMS"
 var qtyln = qty.length;
 var qln1 = "1"; var qln2 = "2"; var qln3 = "3"; 

 var qtySMS = "";
 if (type == pcs) {
         
         /*------------Pcs----------------*/
          var qtyreg = /^[0-9]+$/;
          if(qtyreg.test(qty)){
              quantity = qty;
              types = type;
              prices = price;
              total = qty * price; 
          }else{
              qtySMS = "<div class='pt-2'> Please Enter Valid  : Field</div>";
           }
           
  } else if (type == kl) {
          
         /*------------Kilo----------------*/
          var qtyreg = /^[0-9]+$/;
          if(qtyreg.test(qty)){
              quantity = qty;
              types = type;
              prices = price;
              total = qty * price; 
          }else{
              qtySMS = "<div class='pt-2'> Please Enter Valid  : Field</div>";
           }
           
  } else if (type == kg) {
          
          /*------------Kilogram----------------*/
          var qtyreg =  /^[0-9]+\.[0-9]{3}$/;
          if (qtyreg.test(qty)) {
              quantity = qty;
              types = type;
              prices = price;
              total = qty * price; 
          }else{
              qtySMS = "<div class='pt-2'> Please Enter Valid  : Field</div>";
           }
           
  } else if (type == g && qtyln == qln1) {
          
          /*-------------gram1----------------*/
          var qtyreg =  /^[0-9]{1}$/;
          if (qtyreg.test(qty)) {
              var qt = "0.00" + qty;
              quantity = qt;
              types = type;
              prices = price;
              total = qt * price; 
          }else{
              qtySMS = "<div class='pt-2'> Please Enter Valid  : Field</div>";
           }
           
  } else if (type == g && qtyln == qln2) {
          /*-------------gram2----------------*/
          var qtyreg =  /^[0-9]{2}$/;
          if (qtyreg.test(qty)) {
              var qt = "0.0" + qty;
              quantity = qt;
              types = type;
              prices = price;
              total = qt * price; 
          }else{
              qtySMS = "<div class='pt-2'> Please Enter Valid  : Field</div>";
           }
  } else if (type == g && qtyln == qln3) {
          /*-------------gram3----------------*/
          var qtyreg =  /^[0-9]{3}$/;
          if (qtyreg.test(qty)) {
              var qt = "0." + qty;
              quantity = qt;
              types = type;
              prices = price;
              total = qt * price; 
          }else{
              qtySMS = "<div class='pt-2'> Please Enter Valid  : Field</div>";
           }
  }
  
  var obj = {Qty:quantity, Type:types, Price:prices, Total:total, ErrorSMS:qtySMS};
  return obj;
}    //

// Show Product
function showProduct(){
        var prod = document.getElementById("showProduct");
        var totalAmount = document.getElementById("ProductTotalAmount");
        var arrData;
         if (localStorage.getItem("Product") == null) {
               arrData = [];
           } else {
               arrData = JSON.parse(localStorage.getItem("Product"));
             }
             var tAmt = arrData.reduce((total, item) => total + item.Total, 0);  
             totalAmount.innerHTML = tAmt;
             prod.innerHTML = "";
             for (var i = 0; i < arrData.length; i++) {
                    prod.innerHTML += '<tr>'+
                                    '<td>'+ arrData[i].Product +'</td>'+
                                    '<td>'+ arrData[i].Qty +' '+ arrData[i].Measure +'</td>'+
                                    '<td>'+ arrData[i].Price +'</td>'+
                                    '<td>'+ arrData[i].Total +'</td>'+
                                    '<td class="status">'+
                                         '<div class="d-flex align-items-center justify-content-center">'+
                                                 '<button class="btn delete-theme brandbtnDelete" onclick="deleteProduct('+i+')"><i class="fas fa-trash-alt"></i>Delete</button>'+
                                         '</div>'+
                                    '</td>'+
                               '</tr>';  
                  }
}      //
showProduct();

// Delete Product
function deleteProduct(index){
    var arrData;
    if(localStorage.getItem("Product") == null){
        arrData = [];
    }else{
        arrData = JSON.parse(localStorage.getItem("Product"));
    }
    arrData.splice(index, 1);
    localStorage.setItem("Product", JSON.stringify(arrData));
    showProduct(); 
}    //

// Billing 
function Billing(){
        var admin = document.getElementById("admin").value;
        var date = new Date();
        // Get SMS Id
        var success = document.getElementById("GbillSMS");
        // Get All Values
        var CustomerIndex = document.getElementById("CustomerRecord").value;
        var elm = document.getElementsByName("ccd");
        var CreditDebit = "";
        for (var i = 0; i < elm.length; i++) {
                if(elm[i].checked){
                        CreditDebit = elm[i].value;
                }
        }
        var nt = document.getElementById("Notation").value;
        
if(CustomerIndex != "" && CreditDebit != "" && nt != ""){
                        // Get All Products Record
                         var obj;
                         if (localStorage.getItem("Product") == null) {
                             obj = [];
                          } else {
                             obj = JSON.parse(localStorage.getItem("Product"));
                          }
                          
            // Generate Total Amount               
             var totalAmt = obj.reduce((total, item) => total + item.Total, 0);   
           // Create Transection 
              var Cr = "";
              var Db = "";
              var dates =  date.toLocaleDateString();  
              var time =  date.toLocaleTimeString();  
              if(CreditDebit == "Credit"){
                  Cr = totalAmt;
              }else{
                  Cr = 0;     
              }
              if(CreditDebit == "Debit"){
                  Db = totalAmt;
              }else{
                  Db = 0;     
              }
          // Generate Invoice
               var arr = [];
              for (var i = 0; i < obj.length; i++) {
                     arr.push(obj[i]);
              }
              
              var objs = {Particular:nt,Debit:Db,Credit:Cr,Dates:dates,Time:time,Invoice:arr}; 
         // Save Data Into LacalStorage
         if (localStorage.getItem("AMS") == null) {
                        arrData = [];
                } else {
                        arrData = JSON.parse(localStorage.getItem("AMS"));
                }
                var userKey = arrData[admin];
                for (var k in userKey[CustomerIndex]) {
                        userKey[CustomerIndex][k].push(objs)
                }
                localStorage.setItem("AMS", JSON.stringify(arrData))
                                    // Delete Data from Product 
                                    localStorage.removeItem("Product");
                                    showProduct();
                                    success.innerHTML = "<div class='pt-3 text-success'>BILL GENERATED SUCCESSFULLY</div>";
                                             setTimeout(function () {
                                                   success.innerHTML = "";
                                             }, 5000);
                                     var nt = document.getElementById("Notation").value="";
      }else{
           success.innerHTML = "<div class='pt-3 text-danger'>Please Fill All Fields</div>";
                                             setTimeout(function () {
                                                   success.innerHTML = "";
                                             }, 5000);
      }        
}   // Debit Not working

// Show Customer For Transection Form
function TransectionCustomer(){
     var admin = document.getElementById("admin").value;
     var Customer = document.getElementById("CustomerRecordT");
     var arrData;
         Customer.innerHTML = "";
         if(localStorage.getItem("AMS") == null){
             arrData = [];
         }else{
             arrData = JSON.parse(localStorage.getItem("AMS"));
           }
         var userKey = arrData[admin];
    for (var i = 0; i < userKey.length; i++) {
            for (var k in userKey[i]) {
              Customer.innerHTML += '<option value="'+ i +'">'+ k +'</option>';         
            }
      }    
}      // 

// Transection 
function Transection() {
        var admin = document.getElementById("admin").value;
        var date = new Date();
        var dates = date.toLocaleDateString();
        var time = date.toLocaleTimeString();
        var custI = document.getElementById("CustomerRecordT").value;
        var amount = document.getElementById("Amount").value;
        var elm = document.getElementsByName("cd");
        var CreditDebit = "";
        for (var i = 0; i < elm.length; i++) {
                if (elm[i].checked) {
                        CreditDebit = elm[i].value;
                }
        }
        var nt = document.getElementById("Not").value;
        var successTransection = document.getElementById("TransectionSMS");
        var Cr;
        var Db;
        if (CreditDebit == "Credit") {
                Cr = Number(amount);
        } else {
                Cr = 0;
        }
        if (CreditDebit == "Debit") {
                Db = Number(amount);
        } else {
                Db = 0;
        }
       // console.log("Customer :" + custI + " " + "DebitCredit :" + CreditDebit + " " + " Notation :" + nt + " " + " Amount :" + amount)
        if(custI != "" && CreditDebit != "" && nt != "" && amount != ""){
         var objs = {Particular:nt,Debit:Db,Credit:Cr,Dates:dates,Time:time,Invoice:""};
        // console.log(objs)
         if (localStorage.getItem("AMS") == null) {
                        arrData = [];
                } else {
                        arrData = JSON.parse(localStorage.getItem("AMS"));
                }
                var userKey = arrData[admin];
                for (var k in userKey[custI]) {
                        userKey[custI][k].push(objs)
                }
                localStorage.setItem("AMS", JSON.stringify(arrData))
                
                var amount = document.getElementById("Amount").value="";
                var nt = document.getElementById("Not").value="";
                          successTransection.innerHTML = "<div class='pt-3 text-success'>TRANSECTION SUCCESSFULL</div>";
                                             setTimeout(function () {
                                                   successTransection.innerHTML = "";
                                             }, 5000); 
        } else {
             successTransection.innerHTML = "<div class='pt-3 text-danger'>Please Fill All Fields</div>";
                                             setTimeout(function () {
                                                   successTransection.innerHTML = "";
                                             }, 5000); 
        }
}  //

// Registration 
function register(){
   var user = document.getElementById("userName").value;      
   var rError = document.getElementById("registerERROR");
   var rSError = document.getElementById("rSuccessSMS");

    if(user != ""){
            
       var arrData;
       if (localStorage.getItem("AMS") == null) {
            arrData = {};
         } else {
            arrData = JSON.parse(localStorage.getItem("AMS"));
             }
            
            if(Object.keys(arrData).includes(''+user+'')){
                   rError.innerHTML = '<div class="text-danger" style="font-family:serif;">User Already Exists</div>';
                   setTimeout(function () {
                         rError.innerHTML = "";
                    }, 5000);  
               }else{
                   arrData[user]=[];
                   rSError.innerHTML = '<div class="text-success" style="font-family:serif;">Account Created Successfully</div>';
                   setTimeout(function () {
                         rSError.innerHTML = "";
                    }, 5000); 
               }
            localStorage.setItem("AMS", JSON.stringify(arrData));
  
   } else {
        rError.innerHTML = '<div class="text-danger" style="font-family:serif;">Please Fill A Field</div>';
                   setTimeout(function () {
                         rError.innerHTML = "";
                    }, 5000);  
    }
    
}

// Login 
function login(){
   var user = document.getElementById("userNameL").value;      
   var rError = document.getElementById("loginERROR");
   if(user != ""){
        var arrData;
       if (localStorage.getItem("AMS") == null) {
            arrData = {};
         } else {
            arrData = JSON.parse(localStorage.getItem("AMS"));
             }
            if(Object.keys(arrData).includes(user)){
                  document.getElementById("admin").value = user;
                  document.getElementById("page7").style.display = "none";
                  document.getElementById("pageBTN").style.display = "block";
                  showCustomer();
                  layout('page1');
                  TransectionCustomer();
               }else{
                   rError.innerHTML = '<div class="text-danger" style="font-family:serif;">User Not Exists</div>';
                    setTimeout(function() {
                            rError.innerHTML = "";
                    }, 5000);
               }
      }else{
          rError.innerHTML = '<div class="text-danger" style="font-family:serif;">Please Fill A Field</div>';
                    setTimeout(function() {
                            rError.innerHTML = "";
                    }, 5000);
      }
}

// Create Confirm Box for Deleting Content / row
function showConfirm(message, callback) {
       var confirmBox = document.createElement("div");
       confirmBox.classList.add("confirm-box");
      
       var messageBox = document.createElement("div");
       messageBox.classList.add("message-box");
       messageBox.textContent = message;
       confirmBox.appendChild(messageBox);
       
       var buttonBox = document.createElement("div");
       buttonBox.classList.add("button-box");
       messageBox.appendChild(buttonBox);
       
       var yesButton = document.createElement("button");
       yesButton.classList.add("yes-button");
       yesButton.textContent = "Yes";
       buttonBox.appendChild(yesButton);
       yesButton.addEventListener("click", YesButtonClick);
       
       var noButton = document.createElement("button");
       noButton.classList.add("no-button");
       noButton.textContent = "No";
       buttonBox.appendChild(noButton);
       noButton.addEventListener("click", NoButtonClick);
       
       function removeConfirmBox() {
               document.body.removeChild(confirmBox);
       }
       
       function YesButtonClick() {
               callback(true);
               removeConfirmBox()
       }
       function NoButtonClick() {
               callback(false);
               removeConfirmBox();
       }
       
       document.body.appendChild(confirmBox);
}



// Theme select - option Setup Js 
window.onload = function(){
        var a, b, c, d, e, f;

        a = document.getElementById("icon");
        b = document.getElementById("selection");
        a.addEventListener("click", function () {
                b.classList.toggle("toggle");
        })
        
        
        
        c = document.getElementsByClassName("selectValue");
        for (var i = 0; i < c.length; i++) {
                c[i].addEventListener("click", function (){
                       b.classList.toggle("toggle");
                       var values = this.getAttribute("value");
                       if(values != ""){
                       d = document.getElementById("controler");
                       d.setAttribute("value", values);
                       /* start of theme */
                       var obj = ""; var theme1 = ""; var a1 = ""; var b1 = ""; var c1 = ""; var d1 = "";
                       if (values == "greenTheme") {
                               obj = { theme: 'greenTheme', a: '#E4FFE6', b: '#91CF94', c: '#82D286', d: '#67C46B' };
                               theme1 = "greenTheme"; a1 = "#E4FFE6"; b1 = "#91CF94"; c1 = "#82D286"; d1 = "#67C46B";
                       }else if (values == "pinkTheme") {
                               obj = {theme:'pinkTheme', a:'#FFE4FF', b:'#FFC6FF', c:'#FFAAFF', d:'#FF73FF'}; 
                               theme1 = "pinkTheme"; a1 = "#FFE4FF"; b1 = "#FFC6FF"; c1 = "#FFAAFF"; d1 = "#FF73FF";
                       }else if (values == "darkTheme") {
                               obj = {theme:'darkTheme', a:'#E7E7E7', b:'#C5C5C5', c:'#8E8E8E', d:'#5C5C5C'}; 
                               theme1 = "darkTheme"; a1 = "#E7E7E7"; b1 = "#C5C5C5"; c1 = "#8E8E8E"; d1 = "#5C5C5C";
                        }else if (values == "blueTheme") {
                               obj = {theme:'blueTheme', a:'#EAEBFF', b:'#CED2FF', c:'#B2B9FF', d:'#969FFF'};  
                               theme1 = "blueTheme"; a1 = "#EAEBFF"; b1 = "#CED2FF"; c1 = "#B2B9FF"; d1 = "#969FFF";
                        }else if (values == "indianRedTheme") {
                               obj = {theme:'indianRedTheme', a:'#FFD3D3', b:'#FFAEAE', c:'#FF8484', d:'#FF6767'}; 
                               theme1 = "indianRedTheme"; a1 = "#FFD3D3"; b1 = "#FFAEAE"; c1 = "#FF8484"; d1 = "#FF6767";
                        }else if (values == "darkGreenTheme") {
                               obj = {theme:'darkGreenTheme', a:'#72A5A4', b:'#488685', c:'#2F7170', d:'#1C5251'};
                               theme1 = "darkGreenTheme"; a1 = "#72A5A4"; b1 = "#488685"; c1 = "#2F7170"; d1 = "#1C5251";
                        }else if (values == "lightBlueTheme") {
                               obj = {theme:'lightBlueTheme', a:'#EBEDFFED', b:'#C8CDFFED', c:'#A3ABFFED', d:'#7A85FEED'};
                               theme1 = "lightBlueTheme"; a1 = "#EBEDFFED"; b1 = "#C8CDFFED"; c1 = "#A3ABFFED"; d1 = "#7A85FEED";
                        }else if (values == "blueDarkTheme") {
                               obj = {theme:'blueDarkTheme', a:'#ABAFD99E', b:'rgba(0,0,0,0.2)', c:'rgba(0,0,0,0.5)', d:'rgba(0,0,0,0.8)'};
                               theme1 = "blueDarkTheme"; a1 = "#ABAFD99E"; b1 = "rgba(0,0,0,0.2)"; c1 = "rgba(0,0,0,0.5)"; d1 = "rgba(0,0,0,0.8)";
                        }else if (values == "lightTheme") {
                               obj = {theme:'lightTheme', a:'#f1f1f1', b:'#C8C8C8', c:'#A0A0A0', d:'#727272'};   
                               theme1 = "lightTheme"; a1 = "#f1f1f1"; b1 = "#C8C8C8"; c1 = "#A0A0A0"; d1 = "#727272";
                        }
                        
                        
                          
                       if (localStorage.getItem("THEME") == null) {
                           arrData = [];
                       } else {
                           arrData = JSON.parse(localStorage.getItem("THEME"));
                         }
                         if(arrData ==""){
                              arrData.push(obj);
                              
                         }else{
                                arrData[0].theme = ""+theme1+"";
                                arrData[0].a = ""+a1+"";
                                arrData[0].b = ""+b1+"";
                                arrData[0].c = ""+c1+"";
                                arrData[0].d = ""+d1+"";
                         }
                         localStorage.setItem("THEME",JSON.stringify(arrData));
                         theme();
                       /* end of theme */
                     }
                });
        }
        
        
        
        
        
   /* theme setup on load function */   
   function theme() {
        if (localStorage.getItem("THEME") == null) {
                arrData = [];
        } else {
                arrData = JSON.parse(localStorage.getItem("THEME"));
        }
        localStorage.setItem("THEME",JSON.stringify(arrData));
        
        if(arrData == ""){
        const root = document.documentElement;
        root.style.setProperty('--a', '#FFE4FF');
        root.style.setProperty('--b', '#FFC6FF');
        root.style.setProperty('--c', '#FFAAFF');
        root.style.setProperty('--d', '#FF73FF');
        }else{
                for (var i = 0; i < arrData.length; i++) {
                   var themeData = arrData[i];
                       const root = document.documentElement;
                       root.style.setProperty('--a',themeData.a);
                       root.style.setProperty('--b',themeData.b);
                       root.style.setProperty('--c',themeData.c);
                       root.style.setProperty('--d',themeData.d);
                 }
          }
   }
   theme();
}
;

