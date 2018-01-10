import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import { Grid , Dropdown ,Segment ,Checkbox, Divider ,Table} from "semantic-ui-react";
import request from 'superagent';
import "../styles/style.css";
var filteredHH=[];
var tempArr1=[];
var tempArr2=[];
var tempArr3=[];

export default class Comparison extends Component {
  constructor() {
    super();
    this.state={
      categoryOptions:[],
      productOptions:[],
      channelPartners:[],
      channelNameList:[],
      channelValueList:[],
      content:[],
      selectedValue:[],
      wholeData:[],
      houseHoldValues1:[],
      houseHoldValues2:[],
      houseHoldNames:[],
     tempArr1:[],
     tempArr2:[],
     tempArr3:[]

  };
   this.handleCategoryChange=this.handleCategoryChange.bind(this);
   this.handleProductChange=this.handleProductChange.bind(this);
   this.getCheckBox=this.getCheckBox.bind(this);
}

 componentWillMount(){
   var context = this;
   var category=[];
   var categoryNew=[];
   var householdNew=[];
   var hHValues=[];
   var hHNames=[];
   var temp=[];

   var l;

      request.post('/getCategory')
      .end(function(err, res){
        if (err || !res.ok) {
              alert('Oh no! error');
            } else {
             res.body.map((item,i)=>{
               category.push(item);
             })
             category = category.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
              });
              category.map((item,i)=>{
                categoryNew.push({key:item,value:item,text:item});
              })
              context.setState({categoryOptions:categoryNew});
            }
           });

           request.post('/getComparisonDetails')
           .end(function(err, res){
             if (err || !res.ok) {
                   alert('Oh no! error');
                 } else {
                  console.log(res.body);
                   context.setState({wholeData:res.body});
                 }
                });

          request.post('/getHouseholdDetails')
          .end(function(err, res){
            if (err || !res.ok) {
                  alert('Oh no! error');
                } else {
                }
                console.log(res.body,"a");
            res.body.map((item)=>{
              hHValues.push(Object.values(item));
              hHNames.push(Object.keys(item));
            })

            hHValues.map((item)=>{
              l=item.length;
              item.map((item1)=>{
                var x=parseFloat(item1.replace("%",""));
                  temp.push(x);
              })
            })
            tempArr1.push(temp.slice(0,l));
            tempArr2.push(temp.slice(l,2*l));
            hHNames.map((item)=>{
              item.map((item1)=>{
                  tempArr3.push(item1);
              })
            })
               filteredHH = tempArr3.filter( function( item, index, inputArray ) {
                  return inputArray.indexOf(item) == index;
              });
            context.setState({tempArr1:tempArr1});
            context.setState({tempArr2:tempArr1});
               });


 }

handleCategoryChange(event,result){
  var context=this;
  var products=[];
  var productNew=[];
  context.setState({selectedCategory:result.value});
  request.post('/getProduct')
  .query({product:result.value})
  .end(function(err, res){
    if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          res.body[0].map((item)=>{
            productNew.push({key:item,value:item,text:item});
          })
           context.setState({productOptions:productNew});
        }
       });
 }

 handleProductChange(event,result){
   var context=this;
   var channelName=[];
   var channelValue=[];
   context.setState({selectedProduct:result.value});
   request.post('/getPartner')
   .query({product:result.value})
   .end(function(err, res){
     if (err || !res.ok) {
           alert('Oh no! error');
         } else {
          context.setState({channelPartners:res.body});
          channelValue = Object.values(res.body);
          channelName =  Object.keys(res.body);
          context.setState({channelNameList:channelName});
          context.setState({channelValueList:channelValue});
         }
        });
 }
getCheckBox(e,data){
  var temp = this.state.selectedValue;
  if(data.checked == true){
    this.state.wholeData.map((item)=>{
        if(item.categoryName == this.state.selectedCategory){
          item.products.map((item1)=>{
            if(item1.name == this.state.selectedProduct){
              for (var key in item1.sales) {
                if (key == data.name) {
                    temp.push({year:item.year,category:item.categoryName,product:item1.name,partnerName:key,partnerValue:item1.sales[key]});
                }
              }
            }
          })
        }
    })
    this.setState({selectedValue:temp});
  }
  else{
    var temp1 = temp;
    temp.map((item)=>{
      if(item.partnerName == data.name){
          temp.splice(temp.indexOf(item),2)
      }
    })
    this.setState({selectedValue:temp});
  }
}

 render() {
  console.log(this.state.selectedValue,"check")
   let inputs =  (this.state.channelNameList.map((item, index)=> {
     return (
       <div>
               <Checkbox label={item} name={item}
                 id={index} onChange={this.getCheckBox.bind(this)} />
       </div>
     )
   })
   )

    var tabledata=(
      this.state.selectedValue.map((item)=>{
        return(
          <Table.Row>
            <Table.Cell>
              {item.year}
            </Table.Cell>
             <Table.Cell>
              {item.category}
            </Table.Cell>
             <Table.Cell>
              {item.product}
            </Table.Cell>
             <Table.Cell>
              {item.partnerName} - {item.partnerValue}
            </Table.Cell>
            </Table.Row>
        )
      })

    )

    var chartpartners=[];
    var chartpartnersName=[];
    var filteredPartners=[];
     this.state.selectedValue.map((item)=>{
        var x=parseFloat(item.partnerValue.replace(/[^\d\.]/g,''));
      chartpartners.push(x);
    })
    this.state.selectedValue.map((item)=>{
        chartpartnersName.push(item.partnerName);
    })
    filteredPartners = chartpartnersName.filter( function( item, index, inputArray ) {
       return inputArray.indexOf(item) == index;
     });

    var chart1=[];
    var chart2=[];
    var chartpartnersNew=[];
    var ar1=[];
    var ar2=[];
    for (var i = 0; i < chartpartners.length; i++) {
    if(i % 2 === 0) {
        ar1.push(chartpartners[i]);
    }
    else{
      ar2.push(chartpartners[i]);
    }
}
chartpartnersNew.push(ar1);
chartpartnersNew.push(ar2);
chart1={
  labels: filteredPartners,
  datasets: [
    {
      label: '2017',
      backgroundColor: 'rgba(6,115,204,1)',
      borderColor: 'rgba(6,119,204,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(6,115,204,1)',
      hoverBorderColor: 'rgba(6,119,204,1)',
      data: []
    },
    {
      label: '2016',
      backgroundColor: 'rgba(56,150,121,1)',
      borderColor: 'rgba(56,150,121,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(56,150,121,1)',
      hoverBorderColor: 'rgba(56,150,121,1)',
      data: []
    }

  ]
};
chartpartnersNew.map((item, i)=>{
  chart1.datasets[i].data = item;

})

chart2={
  labels: filteredHH,
  datasets: [
    {
      label: '2017 Change in HouseHold',
      backgroundColor: 'rgba(1,169,219,1)',
      borderColor: 'rgba(6,119,204,1)',
      borderWidth: 1,
      data: tempArr1[0]
    },
    {
      label: '2016 Change in HouseHold',
      backgroundColor: 'rgba(250,172,88,1)',
      borderColor: 'rgba(56,150,121,1)',
      borderWidth: 1,
      data: tempArr2[0]
    }

  ]
};



    return (
      <div>
        <h2>Year of Year Comparison</h2>
        <Grid>
          <Grid.Column width={5}>
            <h3>Category</h3>
            <Dropdown className='dropdown' placeholder='Select Category' fluid selection options={this.state.categoryOptions} onChange={this.handleCategoryChange}/>
          </Grid.Column>

          <Grid.Column width={5}>
                <h3>Product</h3>
                <Dropdown placeholder='Select Product' fluid selection options={this.state.productOptions} onChange={this.handleProductChange} />
              </Grid.Column>

          <Grid.Column width={5}>
            <h3>Channel Partners</h3>
              <Segment>
                 {inputs}
              </Segment>
          </Grid.Column>
        </Grid>
        <Divider horizontal></Divider>
        <Grid>
          <Grid.Column width={16}>
            <div className="table">
             <Table padded>
                    <Table.Header >
                      <Table.Row >
                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Year</Table.HeaderCell>
                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Category</Table.HeaderCell>
                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Product</Table.HeaderCell>
                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Partners</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {tabledata}
                    </Table.Body>
                  </Table>

            </div>
          </Grid.Column>
        </Grid>
        <Divider horizontal></Divider>
        {this.state.selectedValue.length != 0 ?
        <Grid>
        <Grid.Column width={16}>
        <Bar
          data={chart1}
          width={100}
          height={350}
          options={{
            maintainAspectRatio: false
          }}
        />
      </Grid.Column>
    </Grid>
    :
    null
  }

    <Divider horizontal></Divider>

{this.state.selectedValue.length != 0 ?
        <div>
        <h2>HouseHold Comparison </h2>
        <Grid>
        <Grid.Column width={16}>
        <Bar
          data={chart2}
          width={100}
          height={350}
          options={{
            maintainAspectRatio: false
          }}
        />
      </Grid.Column>
    </Grid>
    </div>
    :
    null
  }
      </div>
    );
  }
}
