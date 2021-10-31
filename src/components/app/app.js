import React from 'react';

import logo from '../../assets/logo.svg';
import spinner from '../../assets/spinner.gif';

import { Tickets, Filter2, Sidebar } from '../../components';
import getTickets from '../../services/avia-service';

import './app.css';

export const App = () => {
  const [state, setState] = React.useState({
    loading: false,
    origDataTickets: [],
    dataTickets: [],
    problem: 0
  });

  const [stateFilter, setStateFilter] = React.useState({
    all: true,
    zero: false,
    one: false,
    two: false,
    three: false,
    item: ''
  });

  const connect = () => {
    getTickets().then(data => {
      setState({
          loading: true,
          origDataTickets: data,
          dataTickets: data,
          problem: 0
      })
    })
    .catch(() => connect())
  }; // первичный запрос данных
  
  React.useEffect(() => {
    connect()
  },[]);

  React.useEffect(() => {
    filterTransfer();
  },[stateFilter, state.origDataTickets]);

  const filter = (arr = [...state.dataTickets]) => {
        
    if (stateFilter.all === false 
      && stateFilter.one === false 
      && stateFilter.two === false 
      && stateFilter.three === false 
      && stateFilter.zero === false) return;

    if (stateFilter.item === 'low-price') {  
      arr.sort((a, b) => a['price'] - b['price']);
    };
    if (stateFilter.item === 'faster') {
      arr.sort((a, b) => (a['departureDuration'] + a['arrivalDuration']) - (b['departureDuration'] + b['arrivalDuration']));
    };
    if (stateFilter.item === 'optimal') {
      arr.sort((a, b) => a['price'] / (a['departureDuration'] + a['arrivalDuration']) - 
                        b['price'] / (b['departureDuration'] + b['arrivalDuration'])
    );
    }
    
    setState({...state, dataTickets: arr});
  }; //фильтр билетов по критериям времени или цены

  const filterTransfer = () => {

    let arr = [...state.origDataTickets];

    if (stateFilter.all === true) {
      setState({...state, dataTickets: arr});
      filter(arr);
      return;
    }
    if (stateFilter.three === true) {
      arr = state.origDataTickets.filter((el) => el.departureTransferСount <= 3 && el.arrivalTransferСount <= 3);
      setState({...state, dataTickets: arr});
      filter(arr);
      return;
    }
    if (stateFilter.two === true) {
      arr = state.origDataTickets.filter((el) => el.departureTransferСount <= 2 && el.arrivalTransferСount <= 2);
      setState({...state, dataTickets: arr});
      filter(arr);
      return;
    }
    if (stateFilter.one === true) {
      arr = state.origDataTickets.filter((el) => el.departureTransferСount <= 1 && el.arrivalTransferСount <= 1);
      setState({...state, dataTickets: arr});
      filter(arr);
      return;
    }
    if (stateFilter.zero === true) {
      arr = state.origDataTickets.filter((el) => el.departureTransferСount === 0 && el.arrivalTransferСount === 0);
      setState({...state, dataTickets: arr});
      filter(arr);
      return;
    }
    setState({...state, dataTickets: []});
    
  }; // фильтр билетов по пересадкам

  const pushTickets = () => {
    getTickets().then(data => {
      setState({
          origDataTickets: [...state.origDataTickets, ...data],
          dataTickets: [...state.dataTickets],
          loading: true,
          problem: 0
        }
      )
    })
      .catch(() => {
        setState((st) => {
          if (st.problem === 3) {
            alert("Не удалось загрузить данные - проблема с сетью");
            return {...st, loading: true, problem: 0};
          }
          if (st.problem < 3) {
            setTimeout(() => pushTickets(), 1000);
            return {...st, loading: false, problem: 1 + +st.problem};
          }
        })
      })
  }; // добавление +5 билетов

  const loadingTickets = state.loading 
      ? <Tickets dataTickets={state.dataTickets} pushTickets={pushTickets}/> 
      : <img className='spinner' src={spinner} alt="loading..."/>;

  return (
    <div className="app">
        <div className='app-weapper'>
          <div className="header">
            <img src={logo} alt="Avia"/>
          </div>
          <div className="main">
            <Sidebar filterTransfer={filterTransfer} setStateFilter={setStateFilter} stateFilter={stateFilter} /> 
            <Filter2 filter={filter} setStateFilter={setStateFilter} stateFilter={stateFilter} />         
            {loadingTickets} 
          </div>
        </div>
      </div>
    )
};