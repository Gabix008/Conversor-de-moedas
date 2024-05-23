import './style.css'
import image from '../imagens/image.png'
import { useEffect, useState } from 'react';
import axios from 'axios';


const CurrencyConverter = () => {
    const [rates,setRates] = useState([])
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('BRL')
    const [amount, setAmount] = useState(1)
    const [convertedAmount, setConvertedAmount] = useState(null)


    useEffect(()=>{
        axios.get("https://v6.exchangerate-api.com/v6/9460a7a5f87132341e283683/latest/USD")
        .then((response) =>{
            setRates(response.data.conversion_rates)
        }).catch((err)=>{
            console.log('Ocorreu um erro: '+ err)
        })
    },[])

    useEffect(()=>{
        if(rates){
            const rateFrom = rates[fromCurrency] || 0
            const rateTo=rates[toCurrency]||0
            setConvertedAmount(((amount/rateFrom) * rateTo).toFixed(2))
        }

    },[amount, rates, fromCurrency, toCurrency])


    return (
        
        <div className='converter'>
            
            
            
            <div className='container-converter'>
            <img src={image} className='logo' />
                    <h2>Conversor de Moedas</h2>
                <input type='number' placeholder='Digite o valor' value={amount} onChange={(e)=> setAmount(e.target.value)}/>
                <span>Selecione as moedas</span>
                <select onChange={(e)=> setFromCurrency(e.target.value)}>
                    {Object.keys(rates).map((currency)=>(
                    <option value={currency} key={currency}>{currency}</option>
                    ))}
                    
                </select>
                <span>para</span>
                <select  onChange={(e)=> setToCurrency(e.target.value)}>
                {Object.keys(rates).map((currency)=>(
                    <option value={currency} key={currency}>{currency}</option>
                    ))}
                </select>

                <h3>{convertedAmount} {toCurrency}</h3>
                <p> {amount} {fromCurrency} valem {convertedAmount} {toCurrency}</p>
            </div>
       
    </div>
    )
}
export default CurrencyConverter;