import React from 'react';

import logo from '../../assets/logo.svg';

import Tickets from '../tickets';
import Filter2 from '../filter2';
import Sidebar from '../sidebar';
import getTickets from '../../services/swapi-service';

import './app.css';

let arrData = {
  all: true,
  item: ''
};

export default class App extends React.Component {
  
  state = { loading: false,
            origDataTickets: null,
            dataTickets: null,
            filterItem: ''

  };

  connect = () => {
    getTickets().then(data => {
      this.setState({
          loading: true,
          origDataTickets: data,
          dataTickets: data
      })
    })
    .catch(() => this.connect())
  }; // запрос данных

  componentDidMount() {
    this.connect();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.origDataTickets !== prevState.origDataTickets) {
      this.filterTransfer();
      this.filter();
    }
  };

  filter = (item) => {
    arrData.item = item || arrData.item;
    const arr = [...this.state.dataTickets];

    if (arrData.item === 'low-price') {  
      arr.sort((a, b) => a['price'] - b['price']);
      this.setState({
        dataTickets: arr,
        filterItem: 'low-price'
      });
    }

    if (arrData.item === 'faster') {
      arr.sort((a, b) => (a['departureDuration'] + a['arrivalDuration']) - (b['departureDuration'] + b['arrivalDuration']));
      this.setState({
        dataTickets: arr,
        filterItem: 'faster'
      });
    }

    if (arrData.item === 'optimal') {
      arr.sort((a, b) => a['price'] / (a['departureDuration'] + a['arrivalDuration']) - 
                        b['price'] / (b['departureDuration'] + b['arrivalDuration'])
      );
      this.setState({
        dataTickets: arr,
        filterItem: 'optimal'
      });
    }
  }; //фильтр билетов по критериям времени или цены

  filterTransfer = (num, boolean) => {
    arrData[num] = boolean;
    const arr = [...this.state.origDataTickets];
    let arrFilter = [];

    if (arrData.all === true) {
      this.setState({dataTickets: arr});
      return;
    }
    if (arrData.all === false) {
    }
    if (arrData.zero === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount === 0)];
    }
    if (arrData.one === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount === 1)];
    }
    if (arrData.two === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount === 2)];
    }
    if (arrData.three === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount === 3)];
    }
    this.setState({dataTickets: arrFilter});
  }; // фильтр билетов по пересадкам

  pushTickets = () => {
    getTickets().then(data => {
      this.setState({
        origDataTickets: [...this.state.origDataTickets, ...data],
        dataTickets: [...this.state.dataTickets, ...data],
      })
    })
      .catch(() => this.pushTickets());
  }; // добавление +5 билетов

  render() {
    const loadingTickets = this.state.loading ? <Tickets dataTickets={this.state.dataTickets} pushTickets={this.pushTickets}/> : "loading...";
    return (
      <div className="app">
        <div className='app-weapper'>
          <div className="header">
            <img src={logo} alt="Avia"/>
          </div>
          <div className="main">
            <Sidebar filterTransfer={this.filterTransfer}/> 
            <Filter2 filter={this.filter}/>         
            {loadingTickets} 
          </div>
        </div>
      </div>
    )
  }
}