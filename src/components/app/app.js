import React from 'react';

import logo from '../../assets/logo.svg';
import spinner from '../../assets/spinner.gif';

import { Tickets, Filter2, Sidebar } from '../../components';
import getTickets from '../../services/swapi-service';

import './app.css';

const reducer = {
  all: true,
  zero: false,
  one: false,
  two: false,
  three: false,
  item: ''
};

export class App extends React.Component {
  
  state = { 
    loading: false,
    origDataTickets: null,
    dataTickets: null,
    problem: 0
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
    reducer.item = item ?? reducer.item;
    
    if (reducer.all === false && reducer.one === false && reducer.two === false && reducer.three === false && reducer.zero === false) return;
    
    let arr = [...this.state.dataTickets];

    if (reducer.item === 'low-price') {  
      arr.sort((a, b) => a['price'] - b['price']);
    }

    if (reducer.item === 'faster') {
      arr.sort((a, b) => (a['departureDuration'] + a['arrivalDuration']) - (b['departureDuration'] + b['arrivalDuration']));
    }

    if (reducer.item === 'optimal') {
      arr.sort((a, b) => a['price'] / (a['departureDuration'] + a['arrivalDuration']) - 
                        b['price'] / (b['departureDuration'] + b['arrivalDuration'])
      );
    }
    
    this.setState({
      dataTickets: arr      
    });
  }; //фильтр билетов по критериям времени или цены

  filterTransfer = (num, boolean) => {
    reducer[num] = boolean;
    const arr = [...this.state.origDataTickets];
    let arrFilter = [];

    if (reducer.all === true) {
      this.setState({dataTickets: arr});
      
      return;
    }
    if (reducer.all === false) {
    }
    if (reducer.zero === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => 
        el.departureTransferСount === 0 && el.arrivalTransferСount === 0)];
    }
    if (reducer.one === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount <= 1 && el.arrivalTransferСount <= 1)];
    }
    if (reducer.two === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount <= 2 && el.arrivalTransferСount <= 2)];
    }
    if (reducer.three === true) {
      arrFilter = [...arrFilter, ...arr.filter((el) => el.departureTransferСount <= 3 && el.arrivalTransferСount <= 3)];
    }
    
    this.setState({dataTickets: [...new Set(arrFilter)]});
    
  }; // фильтр билетов по пересадкам

  pushTickets = () => {
    getTickets().then(data => {
      this.setState((state) => {
        return {
          origDataTickets: [...state.origDataTickets, ...data],
          dataTickets: [...state.dataTickets, ...data],
          loading: true,
          problem: 0
        }
      })
    })
      .catch(() => {
        this.setState(({ problem }) => {
          return {
          loading: false,
          problem: 1 + +problem
          }
        })
        if (this.state.problem === 3) {
          this.setState({loading: true, problem: 0});
          alert("Не удалось загрузить данные - проблема с сетью");
          return;
        }
        setTimeout(() => this.pushTickets(), 1000)});
    
  }; // добавление +5 билетов

  render() {
    
    const loadingTickets = this.state.loading 
      ? <Tickets dataTickets={this.state.dataTickets} pushTickets={this.pushTickets}/> 
      : <img className='spinner' src={spinner} alt="loading..."/>;
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