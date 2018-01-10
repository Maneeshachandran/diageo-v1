import React, {Component} from 'react';
import { Container, Grid} from "semantic-ui-react";
import Header from './header.jsx';
import Comparison from'./comparison.jsx';
import "../styles/style.css";

export default class CategoryPerformance extends Component {
  constructor() {
    super();
   
  }

    
 render() {
    return (
      <div>
        <Header />
        <Container className='product'>
        <Grid >
          <Grid.Column width={16}>
            <Comparison />
          </Grid.Column>
        </Grid>
        </Container>
      </div>
    );
  }
}
