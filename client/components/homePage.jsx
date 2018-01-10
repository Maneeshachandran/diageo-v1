import React, {Component} from 'react';
import {Checkbox, Grid, Form, Table, Divider, Dropdown} from 'semantic-ui-react';
import request from 'superagent';
import {Line ,Bar} from 'react-chartjs-2';
import "../styles/style.css";
var newArr2 = [];
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      value1: '',
      productvalue:'',
      productvalue1:'',
      promovalue:'',
      promovalue1:'',
      yearvalue:'',
      yearvalue1:'',
      categoryOptions: [],
      productOptions: [],
      promoOptions:[],
      channelPartners:[],
      allSaleData:[],
      tableWeeks:[],
      checkData:[],
      weeks:[],
      partnerall:[],
      totalSales:[],
      weekOptions:[],
      months:[],
      monthnumber:0,
      allWeeks:[],
      montharr:[],
      wholeGraphData1:[],
      checkData:[],
      wholeGraphData:[],
      partnerSales:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.productChange = this.productChange.bind(this);
    this.handlePromoChange = this.handlePromoChange.bind(this);
    this.promocodeChange = this.promocodeChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.getCheckBoxStatus = this.getCheckBoxStatus.bind(this);
  }
  handleChange(e, value) {
    this.setState({value: value.value, value1: value.label})
    this.handleCategoryChange(value.label);
  }
  productChange(e,value){
    this.setState({productvalue: value.value, productvalue1: value.label})
    this.handleProductChange(value.label);
  }
  promocodeChange(e,value){
    var context=this;
    context.setState({promovalue: value.value, promovalue1: value.label})
  }
  yearChange(e,value){
    this.setState({yearvalue:value.value, yearvalue1:value.label, monthnumber:0});
    console.log('val label - > ', this.state.yearvalue, this.state.yearvalue1);
    this.handlePromoChange(this.state.promovalue1);
  }
  componentWillMount() {
    var context = this;
    var category = [];
    var categoryNew = [];
    var tempValue = [];

    request.post('/getCategory').end(function(err, res) {
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
    request.post('/getSalesDetails').end(function(err, res) {
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
  }
  handleCategoryChange(result) {
    var context = this;
    var products = [];
    var productNew = [];
    context.setState({selectedCategory: result});
    request.post('/getProduct').query({product: result}).end(function(err, res) {
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
  handleProductChange(result){
   var context=this;
   var promocodes=[];
   var promocodesNew=[];
   context.setState({selectedProduct:result});
   request.post('/getPromocode')
   .query({product:result})
   .end(function(err, res){
     if (err || !res.ok) {
           alert('Oh no! error');
         } else {
           res.body.map((item,i)=>{
             promocodes.push({key:item,value:item,text:item});
           })
           context.setState({promoOptions:promocodes});
         }
        });
 }
 handlePromoChange(result) {
    var context = this;
    var channelName = [];
    var channelValue = [];
    var monthName = [];
    var weekName = [];
    var weekSale = [];
    var newArr3 = [];
    context.setState({selectedPromo: result});
    request.post('/getChannels').query({promo: result}).end(function(err, res) {
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
      request.post('/getTotalSales').end(function(err, res) {
        var x=[];
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          var name = [];
          res.body.map((item, i) => {
            monthName.push(Object.keys(item.value));
            name.push({value: Object.values(item.value),Name: item.name});
            x.push({value: Object.values(item.value),Name: item.name});
            weekName.push(Object.keys(item.weekValue));
            weekSale.push({value: Object.values(item.weekValue),Name: item.name});
          })
          context.setState({wholeGraphData1: x},function(){
            console.log(this.state.wholeGraphData1);
          });
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
          context.setState({allWeeks:weekSale});
          context.setState({checkData: name});
         context.setState({partnerSales: name});
        }
      })

      request.post('/getPromoSales').query({promoSales: result}).end(function(err, res) {
        if (err || !res.ok) {
          alert('Oh no! error');
        } else {
          var amt = "€" + res.text.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          context.setState({totalSales: amt});
        }
      });
    }

    monthdropdown(e,value){
      var allweek1 = this.state.allWeeks;
      this.setState({monthnumber:value.value},function(){
        if(this.state.monthnumber == 1){
            this.setState({montharr:allweek1});
          }
      });
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

        var temp10 = this.state.wholeGraphData1;
        temp10.map((item10)=>{
          if(data.name==item10.Name){
            temp.push({Name:item10.Name,value:item10.value});
          }
        })
        context.setState({partnerSales: temp},function(){
          console.log("partner ------> ",this.state.partnerSales);
        });

      } else {
        var temp = this.state.partnerSales;

        temp.map((item)=>{
          if(item.Name == data.name){
            temp.splice(temp.indexOf(item),1)
          }
        })
          context.setState({partnerSales:temp});

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
    console.log('inside render',this.state.montharr);
    var options = [
      { key: 1, text: 'week 1 - week 4', value: 1 },
  { key: 2, text: 'week 5 -week 8', value: 2 },
  { key: 3, text: 'week 9 - week 12 ', value: 3 },
    ]
    var dump=[];
    var value1=[];
    this.state.partnerSales.map((item)=>{
      dump.push(item.value);
    })
    dump.map((item)=>{
      item.map((item1)=>{
        var x=parseFloat(item1.replace(/[^\d\.]/g,''));
        value1.push(x);
      })
    })

    var temparray = [];
    var markers=[];
      if (value1.length > 0) {
        var split = 12;
        for (var i = 0; i < value1.length; i += 12) {
          temparray = value1.slice(i, i + split);
          markers.push(temparray);
        }
      }

        var data = {
        labels: newArr2,
        datasets: []
      };
    markers.map((item,index)=>{
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
              ww.push(x);
          })
          if(item.toString()==ww.toString()){
          temp=item;
          label='Tesco';
          color = 'rgba(75,192,192,1)';
          }
        }
        else if(item1.Name == "Amazon"){
          var ww=[];
          item1.value.map((item20)=>{
              var x=parseFloat(item20.replace(/[^\d\.]/g,''));
              ww.push(x);
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
              ww.push(x);
              // ee.push(ww);
          })
          if(item.toString()==ww.toString()){
            temp=item;
            label='Sainsbury';
            color='#498437';
          }
        }
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

    var chart=[];
    var s_ref1=[];
    var s_ref2=[];
    var s_ref3=[];
    var s_ref4=[];

    this.state.montharr.map((item)=>{
      console.log(item.value);

          item.value.map((item2,i)=>{
            console.log(item2,"item2",i);
            if(i==0){

              s_ref1.push(parseFloat(item2.replace(/[^\d\.]/g,'')));
            }
            else if(i==1){
                s_ref2.push(parseFloat(item2.replace(/[^\d\.]/g,'')));
              }
            else if(i==2){
                  s_ref3.push(parseFloat(item2.replace(/[^\d\.]/g,'')));
                }
            else if(i==3){
                  s_ref4.push(parseFloat(item2.replace(/[^\d\.]/g,'')));
                }
          })

    })
    console.log(s_ref4);

    chart = {
  labels: ["Tesco","Amazon","Sainsbury"],
  datasets: [
    {
      label: 'week1',
      backgroundColor: 'rgba(6,115,204,1)',
      borderColor: 'rgba(6,115,204,1)',
      borderWidth: 1,
      data:s_ref1
    },
    {
      label: 'week2',
      backgroundColor: 'rgba(228,80,80,1)',
      borderColor: 'rgba(228,80,80,1)',
      borderWidth: 1,
      data:s_ref2
    },
    {
      label: 'week3',
      backgroundColor: 'rgba(122,150,55,1)',
      borderColor: 'rgba(122,150,55,1)',
      borderWidth: 1,
      data:s_ref3
    },{
      label: 'week4',
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderColor: 'rgba(255,255,255,0.9)',
      borderWidth: 1,
      data:s_ref4
    }

  ]
};


    var category = (this.state.categoryOptions.map((item) => {
      return (<div>
        <Checkbox label={item.key} name='checkboxRadioGroup1' value={item.key} checked={this.state.value == item.key} onChange={this.handleChange}/></div>)
    }))
    var product = (this.state.productOptions.map((item1) => {
      return (<div>
        <Checkbox label={item1.key} name='checkboxRadioGroup2' value={item1.key} checked={this.state.productvalue == item1.key} onChange={this.productChange}/></div>)
    }))
    var promocode = (this.state.promoOptions.map((item2) => {
      return (<div>
        <Checkbox label={item2.key} name='checkboxRadioGroup3' value={item2.key} checked={this.state.promovalue == item2.key} onChange={this.promocodeChange}/></div>)
    }))
    let inputs = (this.state.channelPartners.map((item, index) => {
      return (<div>
        <Checkbox label={item} name={item} key={index} onChange={this.getCheckBoxStatus} defaultChecked="defaultChecked"/>
      </div>)
    }))

    return (<div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} style={{backgroundColor:'white',marginTop:'-1.3%'}} className="formstyle">
            <Form style={{marginTop:'10%',marginBottom:'10%',marginLeft:'10%'}}>
              <h2 style={{marginBottom:'2%'}}>Filters</h2>
              {/* <Divider hidden/> */}
              <Form.Field>
                <h3>Category </h3> {category}
              </Form.Field>
              {this.state.value1 == 0 ? null : <Form.Field>
                <h3>Product </h3>{product}
              </Form.Field>
            }
              {this.state.productvalue1 == 0 ? null : <div><Form.Field>
                <h3>Promocode </h3>{promocode}
              </Form.Field>
              <Form.Field>
                <h3>Time Duration</h3>
                <Checkbox label='Years' name='checkboxRadioGroup4' value='years' checked={this.state.yearvalue == 'years'} onChange={this.yearChange}/><br/>
                <Checkbox label='Months' name='checkboxRadioGroup4' value='months' checked={this.state.yearvalue == 'months'} onChange={this.yearChange}/>
              </Form.Field>
            </div>
          }
              {this.state.yearvalue != 'years' ? null : <Form.Field>
                <h3>Channel Partner </h3> {inputs}
              </Form.Field>
              }
              {this.state.yearvalue != 'months' ? null : <Form.Field>
                <h3 style={{marginTop:'5%'}}>Range</h3>
              <Dropdown placeholder='select no of weeks' fluid options={options} onChange={this.monthdropdown.bind(this)}/>
              </Form.Field>
              }
            </Form>
          </Grid.Column>
          <Grid.Column width={13} style={{marginTop:'-1.3%'}}>
            <Table celled structured >
              <Table.Header >
                <Table.Row className="tableheadcell" >
                  <Table.HeaderCell rowSpan='2'>Category</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Product</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Promocode</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Total Sales</Table.HeaderCell>
                  {this.state.yearvalue != 'years' ? null :
                  <Table.HeaderCell rowSpan='2'>Partners</Table.HeaderCell> }
                  {this.state.yearvalue != 'months' ? null :
                  <Table.HeaderCell rowSpan='2'>Partners</Table.HeaderCell>}
                  {this.state.yearvalue != 'months' ? null :<p>
                <Table.HeaderCell colSpan='4' textAlign='center'>Weeks</Table.HeaderCell>
                <Table.Row>
                  <Table.HeaderCell>week 1</Table.HeaderCell>
                  <Table.HeaderCell>week 2</Table.HeaderCell>
                  <Table.HeaderCell>week 3</Table.HeaderCell>
                  <Table.HeaderCell>week 4</Table.HeaderCell>
                </Table.Row>
              </p>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row className="tablecell">
                  <Table.Cell>
                      {this.state.value1}
                  </Table.Cell>
                   <Table.Cell>
                    {this.state.productvalue1}
                  </Table.Cell>
                   <Table.Cell>
                    {this.state.promovalue1}
                  </Table.Cell>
                   <Table.Cell>
                     {this.state.totalSales}
                  </Table.Cell>
                  {this.state.yearvalue != 'years' ? null :
                  <Table.Cell>
                    {this.state.partnerall.map((item)=>{
                      return(<span>{item.partner} - {item.sale}<br/></span>)
                    })}
                 </Table.Cell>}
                 {this.state.yearvalue != 'months' ? null :
                   <Table.Cell>
                     {this.state.montharr.map((item)=>{
                       return( <div>{item.Name}</div>)
                     })}
                  </Table.Cell>}
                   {this.state.yearvalue != 'months' ? null :<div>
                 <Table.Cell style={{fontSize:'19px'}}>
                   {this.state.montharr.map((item)=>{
                     return( <div><span>{item.value[0]}</span></div>)
                   })}
                </Table.Cell>
                <Table.Cell style={{fontSize:'19px'}}>
                  {this.state.montharr.map((item)=>{
                    return( <div>{item.value[1]}</div>)
                  })}
               </Table.Cell>
               <Table.Cell style={{fontSize:'19px'}}>
                 {this.state.montharr.map((item)=>{
                   return( <div>{item.value[2]}</div>)
                 })}
              </Table.Cell>
              <Table.Cell style={{fontSize:'19px'}}>
                {this.state.montharr.map((item)=>{
                  return( <div>{item.value[3]}</div>)
                })}
             </Table.Cell>
           </div>}
                  </Table.Row>
              </Table.Body>
            </Table>
            {this.state.yearvalue != 'years' ? null :
          <Line data={data}/>}
          {this.state.monthnumber == 0 ? null :
          <Bar data={chart} />
          }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>)
  }
}
