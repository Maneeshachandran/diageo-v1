const router =  require('express').Router();
var Category= require('./categorySale.js');
var Product= require('./productSaleDetails.js');
var promocode=require('./promocodeSaleDetails.js');
var sale=require('./yearSale.js');
var customer=require('./customerSegment.js')

router.post('/getCategory', (req,res)=>{
  console.log("inside getcategory route");
  var categoryList=[];
  Category.categorySale.map((item,i)=>{
    categoryList.push(item.categoryName);
    })
  res.send(categoryList);
  });

  router.post('/getProduct', (req,res)=>{
    console.log("inside getProduct route");
    var productList=[];
    Category.categorySale.map((item,i)=>{
      if(req.query.product == item.categoryName && item.year == 2017)
      {
        productList.push(item.categoryProducts);
      }
    })
  res.send(productList);
    });

    router.post('/getPromocode', (req,res)=>{
      console.log("inside getPromocode route");
      var promocodeList=[];
      var temp=[];
   // console.log(promocode.promoCode[0].WhiskyPromocode);
      promocode.promoCode[0].WhiskyPromocode.forEach(function(element){
        promocodeList.push(element.promo);
      })
  //  console.log(promocodeList,"promocodeList");

    res.send(promocodeList);
      });

      router.post('/getChannels', (req,res)=>{
        console.log("inside getChannels route");
  //    console.log("------>",req.query.promo);
//      console.log(typeof promocode.promoCode);
   //   console.log(promocode.promoCode);
        var channelList=[];
        promocode.promoCode.map((item,i)=>{
  //        console.log('inside map');
          item.WhiskyPromocode.map((item1,i)=>{
            if(item1.promo == req.query.promo)
            {
              channelList=item1.sales;
            }
          })
        })
        res.send(channelList);
        });

       router.post('/getChannelSales', (req,res)=>{
        console.log("inside getChannelSales route");
        var vals=[];
        var dataValue=[];
        Product.productSale.map((item,i)=>{
          item.promoCode.map((item1,i)=>{
            if(item1.partner == req.query.partner){
            //  console.log("...."+item1.partner);
               valName =item1.partner;
               vals = Object.keys(item1.months).map(function(key) {
            //     console.log(key+"........"+item1.months[key]);
            return item1.months[key]
              });
            }
           })
        })
            dataValue.push({value:vals,Name:valName});
           console.log(dataValue);
            res.send(dataValue);
        });

        router.post('/getTotalSales', (req,res)=>{
        console.log("inside getTotalSales route");
        var allSales=[];
        Product.productSale.map((item,i)=>{
          item.promoCode.map((item1,i)=>{
            allSales.push({name:item1.partner,value:item1.months,weekValue:item1.weeks});
           })
        })
        console.log(allSales);
      res.send(allSales);
        });


      router.post('/getPartner', (req,res)=>{
      console.log("inside getPartner route");
      var partnerList=[];
      sale.yearSale.map((item,i)=>{
        item.products.map((item1,i)=>{
          if((req.query.product) == (item1.name)){
            partnerList=item1.sales;
          }
        })
      })
    res.send(partnerList);
      });

      router.post('/getSalesDetails',(req,res)=>{
        console.log("inside getSalesDetails route");
        var saleList=[];
        Product.productSale.map((item,i)=>{

            saleList.push(item);


        })
      res.send(saleList);
        });

        router.post('/getPromoSales',(req,res)=>{
          console.log("inside getPromoSales route");
          var totalSales=0;
            Product.productSale.map((item,i)=>{
              item.promoCode.map((item1,i)=>{
                if(req.query.promoSales == item1.promo){
                    var x=parseFloat(item1.sale.replace(/[^\d\.]/g,''));
                    totalSales+=x;
                }
              })
          })
          console.log(totalSales+" vh "+typeof totalSales);
        res.send(totalSales.toString());
          });


      router.post('/getComparisonDetails',(req,res)=>{
        console.log("inside getComparisonDetails route");
        var dataList=[];
        sale.yearSale.map((item,i)=>{
          if(item.year == 2017 || item.year == 2016){
            dataList.push(item);
          }

        })
      res.send(dataList);
        });

        router.post('/getHouseholdDetails',(req,res)=>{
          console.log("inside getHouseholdDetails route");
          var householdList=[];
          sale.yearSale.map((item,i)=>{
            if(item.year == 2017 || item.year == 2016){
               item.products.map((item1,i)=>{
                householdList.push(item1.household);
               })
            }
          })
        res.send(householdList);
          });

        router.post('/getBehavioural',(req,res)=>{
          console.log("inside getBehavioural route");
          var behavioural=[];
          customer.Customers.map((item)=>{
            item.behavourialsegments.map((item1)=>{
              behavioural.push(item1);
          //  console.log(Object.keys(item1.Netchange));

          //    console.log(Object.values(item1.Netchange));
            })
          })

          res.send(behavioural);
          });

          router.post('/getSpending',(req,res)=>{
            console.log("inside getSpending route");
            var spending=[];
            customer.Customers.map((item)=>{
               item.spendingSegments.map((item1)=>{
                spending.push(item1);

               })
            })

            res.send(spending);
            });




module.exports=router;
