import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import { Grid , Dropdown ,Segment ,Checkbox, Divider ,Table} from "semantic-ui-react";
import request from 'superagent';
import Header from './header.jsx';
import "../styles/style.css";

 var keys=[];
 var values=[];
 var spendingKeys=[];
 var spendingValues=[];
export default class Segmentation extends Component {
  constructor() {
    super();
    this.state={
      behaviouralData:[],
      behaviouralKeys:[],
      allBehavioural:{
        key : [],
        values : []
      },
      allSpending:{
        key : [],
        values : []
      }
    };

    }


componentWillMount(){
   var context =this;
   var temp=[];
   var data1={};
   var data2={};

	 request.post('/getBehavioural')
      .end((err, res) => {
        if (err || !res.ok) {
              alert('Oh no! error');
            } else {
            res.body.map((item,i)=>{
              for (var key in item) {
                keys.push(key);
                values.push(Object.values(item[key]));
              }
            })
              data1.key=keys;
              data1.values=values;
              context.setState({allBehavioural:data1});
            }
           });

           request.post('/getSpending')
              .end((err, res) => {
                if (err || !res.ok) {
                      alert('Oh no! error');
                    } else {
                     res.body.map((item,i)=>{
                       for (var key in item) {
                          spendingKeys.push(key);
                          spendingValues.push(Object.values(item[key]));
                      }
                     })
                       data2.key=spendingKeys;
                      data2.values=spendingValues;
                      context.setState({allSpending:data2});
                    }
                   });
}


  render(){
    var chart1={};
    var chart2={};
    var ref1=[];
    var ref2=[];
    var ref3=[];
    var ref4=[];
    var tabRef1=[];
    var tabRef2=[];
    var tabRef3=[];
    var tabRef4=[];
    var s_ref1=[];
    var s_ref2=[];
    var s_ref3=[];
    var s_ref4=[];
    var s_tabRef1=[];
    var s_tabRef2=[];
    var s_tabRef3=[];
    var s_tabRef4=[];


  values.map(function(element){
    ref1.push(element[0]);
    ref2.push(element[1]);
    ref3.push(element[2]);
    ref4.push(element[3]);
  })
  ref1.map((item)=>{
    var x1=parseFloat(item.replace("%",""));
      tabRef1.push(x1);
  })
  ref2.map((item)=>{
    var x2=parseFloat(item.replace("%",""));
      tabRef2.push(x2);
  })
  ref3.map((item)=>{
    var x3=parseFloat(item.replace("%",""));
      tabRef3.push(x3);
  })
  ref4.map((item)=>{
    var x4=parseFloat(item.replace("%",""));
      tabRef4.push(x4);
  })

  spendingValues.map(function(element){
    s_ref1.push(element[0]);
    s_ref2.push(element[1]);
    s_ref3.push(element[2]);
    s_ref4.push(element[3]);
  })
  s_ref1.map((item)=>{
    var x1=parseFloat(item.replace("%",""));
      s_tabRef1.push(x1);
  })
  s_ref2.map((item)=>{
    var x2=parseFloat(item.replace("%",""));
      s_tabRef2.push(x2);
  })
  s_ref3.map((item)=>{
    var x3=parseFloat(item.replace("%",""));
      s_tabRef3.push(x3);
  })
  s_ref4.map((item)=>{
    var x4=parseFloat(item.replace("%",""));
      s_tabRef4.push(x4);
  })

  chart1={
    labels: keys,
    datasets: [
      {
        label: 'Net % change',
        backgroundColor: 'rgba(6,115,204,1)',
        borderColor: 'rgba(6,115,204,1)',
        borderWidth: 1,
        data:tabRef1
      },
      {
        label: '% HH change',
        backgroundColor: 'rgba(228,80,80,1)',
        borderColor: 'rgba(228,80,80,1)',
        borderWidth: 1,
        data:tabRef2
      },
      {
        label: 'Trips % change',
        backgroundColor: 'rgba(122,150,55,1)',
        borderColor: 'rgba(122,150,55,1)',
        borderWidth: 1,
        data:tabRef3
      },{
        label: 'Units % change',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1,
        data:tabRef4
      }

    ]
  };

  chart2={
    labels: spendingKeys,
    datasets: [
      {
        label: 'Net % change',
        backgroundColor: 'rgba(6,115,204,1)',
        borderColor: 'rgba(6,115,204,1)',
        borderWidth: 1,
        data:s_tabRef1
      },
      {
        label: '% HH change',
        backgroundColor: 'rgba(228,80,80,1)',
        borderColor: 'rgba(228,80,80,1)',
        borderWidth: 1,
        data:s_tabRef2
      },
      {
        label: 'Trips % change',
        backgroundColor: 'rgba(122,150,55,1)',
        borderColor: 'rgba(122,150,55,1)',
        borderWidth: 1,
        data:s_tabRef3
      },{
        label: 'Units % change',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1,
        data:s_tabRef4
      }

    ]
  };


        var table1 = '';
        var table2 = '';
        if (this.state.allBehavioural.key!=0) {
          table1=
             this.state.allBehavioural.key.map((item,i)=>{
               return(<Table.Row key={i}>
                 <Table.Cell>
                   {item}
               </Table.Cell>
               <Table.Cell>
                    {this.state.allBehavioural.values[i][0]}
               </Table.Cell>
               <Table.Cell>
                    {this.state.allBehavioural.values[i][1]}
               </Table.Cell>
               <Table.Cell>
                      {this.state.allBehavioural.values[i][2]}
               </Table.Cell>
               <Table.Cell>
                        {this.state.allBehavioural.values[i][3]}
               </Table.Cell>
             </Table.Row>);
           });
        }

        if (this.state.allSpending.key!=0) {
          table2=
             this.state.allSpending.key.map((item,i)=>{
               return(<Table.Row key={i}>
                 <Table.Cell>
                   {item}
               </Table.Cell>
               <Table.Cell>
                    {this.state.allSpending.values[i][0]}
               </Table.Cell>
               <Table.Cell>
                    {this.state.allSpending.values[i][1]}
               </Table.Cell>
               <Table.Cell>
                      {this.state.allSpending.values[i][2]}
               </Table.Cell>
               <Table.Cell>
                        {this.state.allSpending.values[i][3]}
               </Table.Cell>
             </Table.Row>);
           });
        }

  	return(
  		<div >
        <Header />
        <div className="segment" >
        <h2>Customer Segmentation</h2>
        <Grid>
	          <Grid.Column width={16}>
	            <div className="table">
	            <h3>All Behavioural Segments</h3>
	             <Table padded>
	                    <Table.Header >
	                      <Table.Row >
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Customers</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Net % change vs 1yr ago</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>% HHschange vs 1yr ago</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Trips % change vs 1yr ago</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Units % change vs 1yr ago</Table.HeaderCell>
	                      </Table.Row>
	                    </Table.Header>
	                    <Table.Body>
                        {table1}
	                    </Table.Body>
	                  </Table>
	            </div>
	          </Grid.Column>
        </Grid>
        <Divider horizontal></Divider>
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
        <Divider horizontal></Divider>
        <Grid>
	          <Grid.Column width={16}>
	            <div className="table">
	            <h3>All Spending Segments</h3>
	             <Table padded>
	                    <Table.Header >
	                      <Table.Row >
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Customers</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Net % change vs 1yr ago</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>% HHschange vs 1yr ago</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Trips % change vs 1yr ago</Table.HeaderCell>
	                        <Table.HeaderCell style={{"backgroundColor":"#d1cfcf"}}>Units % change vs 1yr ago</Table.HeaderCell>
	                      </Table.Row>
	                    </Table.Header>
	                    <Table.Body>
                        {table2}
	                    </Table.Body>
	                  </Table>
	            </div>
	          </Grid.Column>
        </Grid>
        <Divider horizontal></Divider>
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
  		</div>
    );
  }
}
