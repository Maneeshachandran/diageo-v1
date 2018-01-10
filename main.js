import React from 'react';
import ReactDom from 'react-dom';
import Dashboard from './client/components/dashboard.jsx';
import ProductPerformance from './client/components/productPerformance.jsx';
import CategoryPerformance from './client/components/categoryPerformance.jsx';
import Segmentation from './client/components/segmentation.jsx';
import {Router, Route, IndexRoute, hashHistory,Link} from 'react-router';
ReactDom.render(
  <Router history={hashHistory}>
    <Route path={"/"} component={Dashboard}/>
    <Route path={"/productPerformance"} component={ProductPerformance}/>
    <Route path={"/categoryPerformance"} component={CategoryPerformance} />
    <Route path={"/customerSegmentation"} component={Segmentation} />
</Router>,
  document.getElementById('reactApp')
);
