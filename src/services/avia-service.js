
const _apiId = `https://front-test.beta.aviasales.ru/search`;
const _apiTickets = `https://front-test.beta.aviasales.ru/tickets?searchId=`;
let key = 0;

const getTickets = async () => {

  const responseId = await fetch(_apiId);
  if (!responseId.ok) {
    console.log(`error fetch ${_apiId}`, responseId.status);
  }
  const { searchId } = await responseId.json();
  
  const responseTickets = await fetch(`${_apiTickets}${searchId}`);
  if (!responseTickets.ok) {
    console.log(`error fetch ${_apiTickets}`, responseTickets.status);
  }
  const { tickets } = await responseTickets.json();

  return tickets.slice(0,5).map((el) => {
    return {
      key: key++,
      price: el.price,
      carrier: el.carrier,
      departureDays: `${el.segments[0]['origin']} - ${el.segments[0]['destination']}`,
      arrivalDays: `${el.segments[1]['origin']} - ${el.segments[1]['destination']}`,
      departureTransferСount: el.segments[0].stops.length,
      arrivalTransferСount: el.segments[1].stops.length,
      departureTransfer: el.segments[0].stops,
      arrivalTransfer: el.segments[1].stops,
      departureDuration: el.segments[0].duration,
      arrivalDuration: el.segments[1].duration,
      departureTime: el.segments[0].date.match(/\d+[:]\d+/g).join(),
      arrivalTime: el.segments[1].date.match(/\d+[:]\d+/g).join()
    }
  }); 
};

export default getTickets;