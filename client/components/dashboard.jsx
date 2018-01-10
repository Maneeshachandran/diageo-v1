import React from 'react';
import {Grid, Image,Header} from 'semantic-ui-react';
import HeaderComponent from './header.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

export default class Dashboard extends React.Component {
  constructor() {
    super();

    this.salesPerformance=this.salesPerformance.bind(this);
    this.yoyPerformance=this.yoyPerformance.bind(this);
    this.Scorecard=this.Scorecard.bind(this);
  }


  salesPerformance(){
    hashHistory.push('/productPerformance');
  }

  yoyPerformance(){
    hashHistory.push('/categoryPerformance');
  }

  Scorecard(){
    hashHistory.push('/customerSegmentation');
  }

  render() {
    return (<div>
      <HeaderComponent />
      <Grid columns={3} style={{marginTop:'55px',marginLeft:'30px',marginRight:'30px'}}>
        <Grid.Row>
          <Grid.Column>
            <Image src='./client/assets/images/graph.jpg' style={{height:'350px'}} onClick={this.salesPerformance}/>
          <center><Header as='h1'><span className="headers" style={{color:'white',fontSize:'1.875rem',position:'absolute',top:'40%',left:'17%',fontFamily:'open sans-serif'}}>Promocode Performance</span></Header></center><br/>
          </Grid.Column>
          <Grid.Column>
            <Image src='./client/assets/images/compare.jpg' style={{height:'350px'}} onClick={this.yoyPerformance}/>
            <center><Header as='h1'><span className="headers" style={{color:'white',fontSize:'1.875rem',textAlign:'center',position:'absolute',top:'40%',left:'25%',fontFamily:'open sans-serif'}}>YOY Performance</span></Header></center>
          </Grid.Column>
          <Grid.Column>
            <Image src='./client/assets/images/diagioCustomer.jpg' style={{height:'350px'}} onClick={this.Scorecard}/>
            <center><Header as='h1'><span className="headers" style={{color:'white',fontSize:'1.875rem',position:'absolute',top:'40%',left:'15%',fontFamily:'open sans-serif'}}>Segmentation Performance</span></Header></center>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
      );
  }
}
