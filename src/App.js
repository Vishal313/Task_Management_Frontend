import './App.css';
import SideBarComponent from './components/SideBarComponent';
import { Component } from 'react';
import HeaderComponent from './components/HeaderComponent';

class App extends Component{
  constructor () {
    super ();
    this.state = {
      isLoggedIn: false
    }
  }

  checkForLoggedin = (childData) => {
    this.setState({isLoggedIn: childData})
  }
 
  render () {
    return (
      <div>
          {this.state.isLoggedIn ? <SideBarComponent /> : <HeaderComponent isLoggedIn={this.checkForLoggedin} />}
      </div>
    );
  }
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <Router>
//           <div className="container">
//             <SideBarComponent />
//                 {/* <div className="container">   
//                     <Switch>
//                         <Route path = "/" component = {DashboardComponent}></Route>
//                     </Switch>   
//                 </div> */}
//           </div>   
//         </Router>   
//     </div>
//   );
// }