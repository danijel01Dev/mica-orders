import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logo.jpg'
import axios from 'axios'
type Order = {
  id: number;
  name: string;
  date: string;
  number: string;
  description: string;
  price: number;
  userId: number;
  status: string;
};
function App() {
  const [title , setTitle] = useState<string>('')
  const [date , setDate] = useState<string>('')
  const [number , setNumber] = useState<string>('')
  const [price , setPrice] = useState<number>(0)
const [month, setMonth] = useState(new Date().getMonth() + 1 );
const [orders , setOrders] = useState<Order[]>([])
const [description , setDescription] = useState<string>('')
const year = new Date().getFullYear()
const [selectOrder , setSelectOrder] = useState<Order | null>(null)
const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:30235/order", {
      params: {
        month,
        year,
      },
    });

    setOrders(response.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchOrders();
}, [month, year]);


   const data = {
      name : title ,
      date : new Date(date) ,
      number ,
      price,
      userId : 1,
      description,

   }
  async  function createOrder(){
   await axios.post("http://localhost:30235/order", data)
   console.log('fetchujes')
   await fetchOrders();

  setTitle("");
  setDate("");
  setNumber("");
  setPrice(0);
  setDescription("");
  }
  return (
  <div className='App'> 
   <div className='divone'>
     <Form   title={title}
     
     description={description}
     setDescription={setDescription}
     createOrder={createOrder}
    setTitle={setTitle}
     date={date}
     setDate={setDate}
     number={number}
     setNumber={setNumber}
     price={price}
     setPrice ={setPrice}/>
     <Preview 
    
     selectOrder={selectOrder}/>
 </div>
    <div className='calendar'>
     <Calendar
     setSelectOrder={setSelectOrder}
     month={month}
     year={year}
     setMonth={setMonth} 
     orders={orders}/>
     </div>
  </div>
    
    
  )
}
type FormProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  price : number;
  setPrice : React.Dispatch<React.SetStateAction<number>>
  createOrder: (data: any) => Promise<void>;
  description : string;
  setDescription : React.Dispatch<React.SetStateAction<string>>
 
};

function Form({title, 
  setTitle, 
  date , 
  setDate, 
  number , 
  setNumber,
  price,
  setPrice,
  createOrder,
  description,
  setDescription,
 
}: FormProps){
  return (
  <div>
    <h1><span><img src={logo} alt='logo' className='logo'></img></span> Popuni Narudzbu</h1>
        <form className='form' onSubmit={async (e) => {
    e.preventDefault();
  }} >
           <input className='formInput' type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Ime'></input>
             <input className='formInput' type='datetime-local' value={date} onChange={(e)=> setDate(e.target.value)} placeholder='unesi datum' ></input>
               <input className='formInput' type='tel' value={number} onChange={(e)=> setNumber(e.target.value)} placeholder='unesi broj' ></input>
                 <input className='formInput' type='tel' value={price} onChange={(e)=> setPrice(Number(e.target.value))} placeholder='unesi cijenu' ></input>
                  <input className='formInput' type='tel' value={description} onChange={(e)=> setDescription(e.target.value)} placeholder='unesi opis' ></input>
                <button className='dodaj'  onClick={createOrder}> Dodaj Narudzbu</button>
        </form>
       
  </div>)
}
type PreviewProps = {
  selectOrder: Order | null;
};

function Preview({ selectOrder }: PreviewProps) {
  if (!selectOrder) {
    return (
      <div className="preview">
        <h2>Nema odabrane narudžbe</h2>
        <p>Klikni na narudžbu u kalendaru.</p>
      </div>
    );
  }

  return (
    <div className="preview">
      <h2>{selectOrder.name}</h2>
      <p>{selectOrder.description}</p>
      <p>{selectOrder.number}</p>
      <p>{selectOrder.price} KM</p>
      <p>{new Date(selectOrder.date).toLocaleString()}</p>
    </div>
  );
}
type CalendarProps = {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  orders: Order[];
  year: number;
  setSelectOrder: React.Dispatch<React.SetStateAction<Order| null>>;
};
function Calendar({month , setMonth, orders , year, setSelectOrder}: CalendarProps){
  return (
    <div>
      <Calendarh 
      month={month}
      setMonth={setMonth}/>
     <CalendarC 
     setSelectOrder={setSelectOrder}
     month={month}
     orders={orders}
     year={year}/>
    </div>
  )
}
type CalendarhProps = {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

function Calendarh({month , setMonth}: CalendarhProps){
  const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
  return (
 <div className='calHead'>
   <select
  value={month}
  onChange={(e) => setMonth(Number(e.target.value))}
>
  {months.map((name, index) => (
    <option key={index} value={index + 1}>
      {name}
    </option>
  ))}
</select>
 </div>
  ) 
}
type CalendarCProps = {
  month: number;
  year: number;
  orders: Order[];
  setSelectOrder: React.Dispatch<React.SetStateAction<Order | null>>;
};

function CalendarC({
  month,
  orders,
  year,
  setSelectOrder,
}: CalendarCProps){
 



const daysInMonth = new Date(year, month , 0).getDate();
const days = Array.from(
  { length: daysInMonth },
  (_, index) => index + 1
);

 return (
  <div className="content">
    {days.map((day) => (
      <Daycard
      setSelectOrder={setSelectOrder}
        key={day}
        day={day}
        month={month}
        orders={orders}
      />
    ))}
  </div>
);

type DaycardProps = {
  day: number;
  month: number;
  orders: Order[];
  setSelectOrder: React.Dispatch<React.SetStateAction<Order | null>>;
};

function Daycard({
  day,
  month,
  orders,
  setSelectOrder,
}: DaycardProps){
  const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
   const dayOrders = orders.filter((order) => {
  return new Date(order.date).getDate() === day;
});
return (
  <div className='card' >
    <h3> {day}</h3>
    <p> {months[month - 1]}</p>
   {dayOrders.map((order) => (
  <div
    key={order.id}
    className="order"
    onClick={() => setSelectOrder(order)}
  >
    🎂 {order.name}
  </div>
))}
    
  </div>
)}
}


export default App