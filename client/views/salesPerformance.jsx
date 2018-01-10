import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {
  Grid,
  Dropdown,
  Segment,
  Checkbox,
  Divider,
  Table,
  Button,
  Icon
} from "semantic-ui-react";
import request from 'superagent';
import Header from './header.jsx';
import "../styles/style.css";

var weekName = [];
var newArr2 = [];
var tempArr = [];
var newArr3 =[];
export default class salesPerformance extends Component {
  constructor() {
    super();
    this.state = {
      categoryOptions: [],
      productOptions: [],
      promoOptions: [],
      channelPartners: [],
      //  channelSales: [],
      selectedCategory: '',
      selectedProduct: '',
      selectedPromo: '',
      SelectedChannel: '',
      partnerDetails: [],
      partnerSales: [],
      data: [],
      chartData: [],
      allSaleData: [],
      selectedSale: [],
      year: 2017,
      partnerall: [],
      totalSales: [],
      salesGraph: [],
      lineName: [
        "Tesco", "Amazon", "Sainsbury"
      ],
      weeks: [],
      months:[],
      wholeGraphData: [],
      wholeGraphData1: [],
      multiCheck: [],
      checkData: [],
      isChecked: false,
      tableWeeks: [],
      mapMarkers: [],
      finalData: []

    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handlePromoChange = this.handlePromoChange.bind(this);
    this.getCheckBoxStatus = this.getCheckBoxStatus.bind(this);
  }
  componentWillMount() {
    var context = this;
    var category = [];
    var categoryNew = [];
    var tempValue = [];
    request.post('http://localhost:1100/getCategory').end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body.map((item, i) => {
          category.push(item);
        })
        category = category.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        category.map((item, i) => {
          categoryNew.push({key: item, value: item, text: item});
        })
        context.setState({categoryOptions: categoryNew});
      }
    });

    request.post('http://localhost:1100/getSalesDetails').end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body.map((item) => {
          item.promoCode.map((item1) => {
            tempValue.push({partner: item1.partner, sale: item1.sale});
          })
        })
        context.setState({allSaleData: tempValue});
      }
    });

    // request.post('http://localhost:1100/getTotalSales').end(function(err, res) {
    //   if (err || !res.ok) {
    //     alert('Oh no! error');
    //   } else {
    //     var name = [];
    //     var monthName=[];
    //     var weekSale=[];
    //     res.body.map((item, i) => {
    //       monthName.push(Object.keys(item.value));
    //       name.push({value: Object.values(item.value),Name: item.name});
    //       weekName.push(Object.keys(item.weekValue));
    //       weekSale.push({value: Object.values(item.weekValue),Name: item.name});
    //     })
    //     console.log(name,"name");
    //     console.log(weekSale,"weekSale");
    //      monthName.map((item)=>{
    //        newArr2 = newArr2.concat(item);
    //     })
    //      newArr2 = newArr2.filter( function( item, index, inputArray ) {
    //        return inputArray.indexOf(item) == index
    //     })
    //       weekName.map((item)=>{
    //        newArr3 = newArr3.concat(item);
    //     })
    //      newArr3 = newArr3.filter( function( item, index, inputArray ) {
    //        return inputArray.indexOf(item) == index
    //     })
    //     context.setState({months:newArr2});
    //     context.setState({weeks:newArr3});
    //     context.setState({checkData: name});
    //     context.setState({wholeGraphData: name});
    //    //  context.setState({partnerSales: name});
    //   }
    // })

  }

  handleCategoryChange(event, result) {
    var context = this;
    var products = [];
    var productNew = [];
    context.setState({selectedCategory: result.value});
    request.post('http://localhost:1100/getProduct').query({product: result.value}).end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body[0].map((item) => {
          productNew.push({key: item, value: item, text: item});
        })
        context.setState({productOptions: productNew});
      }
    });
  }

  handleProductChange(event, result) {
    var context = this;
    var promocodes = [];
    var promocodesNew = [];
    context.setState({selectedProduct: result.value});
    request.post('http://localhost:1100/getPromocode').query({product: result.value}).end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body.map((item, i) => {
          promocodes.push({key: item, value: item, text: item});
        })
        context.setState({promoOptions: promocodes});
      }
    });
  }

  handlePromoChange(event, result) {
    var context = this;
    var channelName = [];
    var channelValue = [];
    context.setState({selectedPromo: result.value});
    request.post('http://localhost:1100/getChannels').query({promo: result.value}).end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        context.setState({partnerDetails: res.body});
        res.body.map((item, i) => {
          channelValue = Object.values(item);
          channelName = Object.keys(item);
        })
        context.setState({channelPartners: channelName}, function() {
          var temp1 = [];
          context.state.allSaleData.map((item) => {
            temp1.push({partner: item.partner, sale: item.sale});
          })
          context.setState({partnerall: temp1});
        })
      }
      });

      request.post('http://localhost:1100/getPromoSales').query({promoSales: result.value}).end(function(err, res) {
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          var amt = "€" + res.text.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          context.setState({totalSales: amt});
        }
      });

      request.post('http://localhost:1100/getTotalSales').end(function(err, res) {
        var x=[];
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          var name = [];
          var monthName=[];
          var weekSale=[];
          res.body.map((item, i) => {
            monthName.push(Object.keys(item.value));
            name.push({value: Object.values(item.value),Name: item.name});
            x.push({value: Object.values(item.value),Name: item.name});
            weekName.push(Object.keys(item.weekValue));
            weekSale.push({value: Object.values(item.weekValue),Name: item.name});
          })
           console.log(name,"name");
             context.setState({wholeGraphData1: x},function(){
               console.log(this.state.wholeGraphData1);
             });
          // console.log(weekSale,"weekSale");
           monthName.map((item)=>{
             newArr2 = newArr2.concat(item);
          })
           newArr2 = newArr2.filter( function( item, index, inputArray ) {
             return inputArray.indexOf(item) == index
          })
            weekName.map((item)=>{
             newArr3 = newArr3.concat(item);
          })
           newArr3 = newArr3.filter( function( item, index, inputArray ) {
             return inputArray.indexOf(item) == index
          })
          context.setState({months:newArr2});
          context.setState({weeks:newArr3});
          context.setState({checkData: name});
           context.setState({partnerSales: name});

        }
      })


  }

    getCheckBoxStatus(e, data) {
      var temp = this.state.partnerSales;
      var context = this;
      var selectSale = {};
      var array = [];
      var checkArray1 = [];
      var checkArray = this.state.partnerSales;
      if (data.checked == true) {
        var temp1 = this.state.partnerall;
        context.state.allSaleData.map((item5) => {
          if (item5.partner == data.name) {
            temp1.push({partner: data.name, sale: item5.sale})
          }
        })
        context.setState({partnerall: temp1});

        console.log("wholeGraphData", this.state.wholeGraphData1);
        var temp10 = this.state.wholeGraphData1;
        temp10.map((item10)=>{
          if(data.name==item10.Name){
            temp.push({Name:item10.Name,value:item10.value});
          }
        })
        context.setState({partnerSales: temp},function(){
          console.log("partner ------> ",this.state.partnerSales);
        });

        // check.map((item) => {
        //   if (data.name == item.Name) {
        //     checkArray.push({name: item.Name, value: item.value});
        //   }
        // })

      } else {
        // console.log("data", data);
        var temp = this.state.partnerSales;

      //  var unCheck=this.state.wholeGraphData;

        temp.map((item)=>{
          if(item.Name == data.name){
            temp.splice(temp.indexOf(item),1)
          }
        })
          console.log("temp==>" ,temp);
          context.setState({partnerSales:temp});
        // var unCheckArr1=[];
        // temp.map((item)=>{
        //   unCheckArr1 = unCheckArr1.concat(item.value);
        // })
        // context.setState({partnerSales:unCheckArr1},function(){
        //   console.log("partnerSales==>" ,this.state.partnerSales);
        // });


        var temp4 = context.state.partnerall;
        temp4.map((item) => {
          if (item.partner == data.name) {
            temp4.splice(temp4.indexOf(item), 1)
          }
        })
        this.setState({partnerall: temp4});
      }
    }

    render() {
      console.log("partner sales in render -- > ", this.state.partnerSales);
      // console.log("graphData ", this.state.finalData);
      // console.log("wholeData in render -- > ",this.state.wholeGraphData);

      let inputs = (this.state.channelPartners.map((item, index) => {
        return (<div>
          <Checkbox label={item} name={item} key={index} onChange={this.getCheckBoxStatus} defaultChecked="defaultChecked"/>
        </div>)
      }))

      var dump=[];
      var value1=[];
      this.state.partnerSales.map((item)=>{
        dump.push(item.value);
      })
      // console.log("dump-->",dump);
      dump.map((item)=>{
        item.map((item1)=>{
          var x=parseFloat(item1.replace(/[^\d\.]/g,''));
          value1.push(x);
        })
      })
      // console.log(value1);

      var temparray = [];
      var markers=[];
        if (value1.length > 0) {
          var split = 12;
          for (var i = 0; i < value1.length; i += 12) {
            temparray = value1.slice(i, i + split);
            markers.push(temparray);
          }
        }
          // console.log("markersoutside", markers);

          var data = {
          labels: newArr2,
          datasets: []
        };
      console.log("markers ",markers);
      markers.map((item,index)=>{
        // console.log("partner sales " + this.state.partnerSales + "sdsds" + item);
        var temp=[];
        var label = '';
        var color = '';

        var ee=[];
        var temparray5=[];
        this.state.partnerSales.map((item1)=>{

          if(item1.Name == "Tesco" ){

            var ww=[];
            item1.value.map((item20)=>{

                var x=parseFloat(item20.replace(/[^\d\.]/g,''));
                console.log("x",x);
                ww.push(x);
                // ee.push(ww);
            })
            if(item.toString()==ww.toString()){
            temp=item;
            label='Tesco';
            color = 'rgba(75,192,192,1)';
            }
          }
          else if(item1.Name == "Amazon"){
            // console.log("item11111",item);
            var ww=[];
            item1.value.map((item20)=>{
                var x=parseFloat(item20.replace(/[^\d\.]/g,''));
                console.log("x",x);
                ww.push(x);
                // ee.push(ww);
            })
            if(item.toString()==ww.toString()){
              temp=item;
              label='Amazon';
              color='#f4a142';
            }

          }
          else if(item1.Name == "Sainsbury" ){
            var ww=[];
            item1.value.map((item20)=>{
                var x=parseFloat(item20.replace(/[^\d\.]/g,''));
                console.log("x",x);
                ww.push(x);
                // ee.push(ww);
            })
            if(item.toString()==ww.toString()){
              temp=item;
              label='Sainsbury';
              color='#498437';
            }


            console.log("sainsbury check ",item1,temp,label,color );
          }
          console.log("sainsbury check ",item1,temp,label,color );
        })
        data.datasets.push({
              label: label,
              fill: false,
              lineTension: 0.1,
              backgroundColor: color,
              borderColor: color,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: color,
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: color,
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: temp
            })
      })




      return (<div >
        <h2>Product Performance on Promocode</h2>
        <Grid >
          <Grid.Column width={2}>
            <h3>Year</h3>
            <Button icon="icon" labelPosition='right'>
              <Icon name='calendar outline'/>
              2017
            </Button>
          </Grid.Column>
          <Grid.Column width={3}>
            <h3>Category</h3>
            <Dropdown className='dropdown' placeholder='Select Category' fluid="fluid" selection="selection" options={this.state.categoryOptions} onChange={this.handleCategoryChange}/>
          </Grid.Column>

          <Grid.Column width={3}>
            <h3>Product</h3>
            <Dropdown placeholder='Select Product' fluid="fluid" selection="selection" options={this.state.productOptions} onChange={this.handleProductChange}/>
          </Grid.Column>

          <Grid.Column width={3}>
            <h3>Promocode</h3>
            <Dropdown placeholder='Select Promocode' fluid="fluid" selection="selection" options={this.state.promoOptions} onChange={this.handlePromoChange}/>
          </Grid.Column>

          <Grid.Column width={4}>
            <h3>Channel Partners</h3>
            <Segment>
              {inputs}
            </Segment>
          </Grid.Column>

        </Grid>
        <Divider horizontal="horizontal"></Divider>
        <Grid>
          <Grid.Column width={16}>
            <div className="table">
              <Table celled="celled" structured="structured">
                <Table.Header >
                  <Table.Row >
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Year</Table.HeaderCell>
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Category</Table.HeaderCell>
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Product</Table.HeaderCell>
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Promocode</Table.HeaderCell>
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Total Sales</Table.HeaderCell>
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Weeks</Table.HeaderCell>
                    <Table.HeaderCell style={{
                        "backgroundColor" : "#d1cfcf"
                      }}>Partners</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {this.state.year}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.selectedCategory}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.selectedProduct}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.selectedPromo}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.totalSales}
                    </Table.Cell>
                    <Table.Cell>
                      <Table.Cell>
                        <Table.Row>
                          {
                            this.state.weeks.map((item) => {
                              return (<Table.Row >
                                {item}
                              </Table.Row>)
                            })
                          }
                        </Table.Row>
                      </Table.Cell>

                      {/* <Table.Cell>
                  {this.state.partnerSales.map((item)=>{
                      if(this.state.partnerSales.length>0){
                        var splitTable=12;
                        for(var i=0;i<this.state.partnerSales.length;i+=12){
                          splitArray=this.state.partnerSales.slice(i,i+split);
                          markers.push(splitArray);
                        }
                    }
                      console.log(item,"gf");
                  })
                }
                </Table.Cell> */
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        this.state.partnerall.map((item) => {
                          return (<span>{item.partner}
                            - {item.sale}<br/></span>)
                        })
                      }
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

            </div>
          </Grid.Column>
        </Grid>

        <Divider horizontal="horizontal"></Divider>
        {
          this.state.partnerSales.length != 0
            ? <Grid>
                <Grid.Column width={16} style={{backgroundColor:'white'}}>
                  <div >
                    <Line data={data} />
                  </div>
                </Grid.Column>
              </Grid>
            : null
        }
      </div>);
    }
  }
