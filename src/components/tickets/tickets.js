import React from 'react';

import './tickets.css';

export class Tickets extends React.Component {
  
  timeFly(time) {
    const hour = Math.floor(time/60);
    const minute = time - hour * 60;
    return `${hour}ч ${minute}м`
  }; // перевод времени полета в формат Ч:М

  timeFinish(startTime, time) {
    let [a, b] = startTime.split(':');
    b = +b + time;
    a = +a + Math.floor(b / 60);
    if (a > 23 ) a = a % 24;
    b = b - (Math.floor(b / 60) * 60);

    if (`${a}`.length === 1) a = '0' + a;
    if (`${b}`.length === 1) b = '0' + b;

    return `${a}:${b}`
  }; // вычисления времени посадки
  
  renderTickets(arr) {
    return arr.map(({ key, price, carrier,
                      departureDays, arrivalDays, // дни вылета/возвращения
                      departureTransferСount, arrivalTransferСount, // колличество пересадок
                      departureTransfer, arrivalTransfer, // пересадки
                      departureDuration, arrivalDuration, //время полета
                      departureTime, arrivalTime // время вылета
                    }) => {
      const transfer = [
        'без пересадок',
        '1 пересадка',
        '2 пересадки',
        '3 пересадки',
        '4 пересадки'
      ];

      return (
        <div className="ticket" key={key}>
                <div className="ticket__header">
                  <div className="ticket__price">{price.toLocaleString('ru-RU')} Р</div>
                  <div className="ticket__logo">
                    <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="Airlines"/>
                  </div>
                </div>
                <div className="ticket_data-wrapper">
                  <div className="ticket_data">
                    <div className="ticket_data__item">
                      <p className="ticket_data__item__grey">{departureDays}</p>
                      <p>{departureTime} - {this.timeFinish(departureTime, departureDuration)}</p>
                    </div>
                    <div className="ticket_data__item">
                      <p className="ticket_data__item__grey">В Пути</p>
                      <p className="ticket_data__item__grey-time">{this.timeFly(departureDuration)}</p>
                    </div>
                    <div className="ticket_data__item">
                      <p className="ticket_data__item__grey">{transfer[departureTransferСount]}</p>
                      <p>{departureTransfer.join(',')}</p>
                    </div>
                  </div>
                  <div className="ticket_data">
                    <div className="ticket_data__item">
                      <p className="ticket_data__item__grey">{arrivalDays}</p>
                      <p>{arrivalTime} - {this.timeFinish(arrivalTime, arrivalDuration)}</p>
                    </div>
                    <div className="ticket_data__item">
                      <p className="ticket_data__item__grey">В Пути</p>
                      <p className="ticket_data__item__grey-time">{this.timeFly(arrivalDuration)}</p>
                    </div>
                    <div className="ticket_data__item">
                      <p className="ticket_data__item__grey">{transfer[arrivalTransferСount]}</p>
                      <p>{arrivalTransfer.join(',')}</p>
                    </div>
                  </div>
                </div>
              </div>
      )
    })
  };

  render() {
    const tickets = this.renderTickets(this.props.dataTickets);
    
    return (
      <div className="tickets">
        {tickets}
        <div className="add-tickets" onClick={this.props.pushTickets}>
          <div className="add-tickets__button">Показать еще 5 билетов!</div>
        </div>
      </div>
   )
  }
};

