  import React, {Component} from 'react';
  import { Card,Image ,Grid, Segment, Divider} from 'semantic-ui-react';
  import {Router, Route, IndexRoute, hashHistory,Link} from 'react-router';
  import Header from './header.jsx';
  import CategoryPerformance from'./categoryPerformance.jsx';
  import ProductPerformance from './productPerformance.jsx';
  import Segmentation from './segmentation.jsx';


  import "../styles/style.css";


  export default class Mainpage extends Component {
    constructor(props) {
     super(props);
     this.state={

     };

   }


  render(){
    return(
      <div className="menu">
        <Header />

          <Card.Group itemsPerRow={4}>
                  <Link to={'/productPerformance'}>
                  <Card style={{width:'300px',height:'300px',mozBorderRadius:'50px',webkitBorderRadius:'50px',borderRadius:'150px'}}>
                    <Image size='tiny' verticalAlign='middle'  src='./client/assets/images/line.png' alt='line' circular />
                    <Card.Content>
                      <Card.Header>
                        Product Performance
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Link>



                <Link to={'/categoryPerformance'}>
                  <Card>
                    <Image src='./client/assets/images/column.jpg' alt='column' />
                    <Card.Content>
                      <Card.Header>
                        Category Performance
                      </Card.Header>
                      <Card.Meta>
                        <span className='date'>
                          Current Financial Year vs Previous Year
                        </span>
                      </Card.Meta>
                      <Card.Description>
                        Click to View Details
                      </Card.Description>
                    </Card.Content>
                  </Card>
                  </Link>

                <Link to={'/customerSegmentation'}>
                  <Card>
                    <Image src='./client/assets/images/columnGrouped.png' alt='group'/>
                    <Card.Content>
                      <Card.Header>
                        Category Score Card
                      </Card.Header>
                      <Card.Meta>
                        <span className='date'>
                          Customer Behavioral Segmentation
                        </span>
                      </Card.Meta>
                      <Card.Description>
                        Click to View Details
                      </Card.Description>
                    </Card.Content>
                  </Card>
                  </Link>
                </Card.Group>

      </div>
    );
  }
  }
