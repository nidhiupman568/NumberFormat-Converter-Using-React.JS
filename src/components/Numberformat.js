// NumberFormat.js 

import React, { useState } from 'react'
import './Numberformat.css'; 
import numberToWords from 'number-to-words'; 

export default function Numberformat() { 
	const [inputFormat, setInputFormat] = useState('decimal'); 
	const [inputNumber, setInputNumber] = useState(''); 
	const [decimal, setDecimal] = useState(''); 
	const [binary, setBinary] = useState(''); 
	const [octal, setOctal] = useState(''); 
	const [hexadecimal, setHexadecimal] = useState(''); 
	const [rounddigit, setRoundDigit] = useState(''); 
	const [rounddigitindex, setRoundDigitindex] = useState('2'); 
	const [significantno, setSignificantno] = useState(''); 
	const [significantnoindex, setSignificantnoindex] = useState('2'); 
	const [integer, setInteger] = useState(' '); 
	const [numerator, setNumerator] = useState('0'); 
	const [denominator, setDenominator] = useState('0'); 
	const [inword, setInword] = useState(''); 

	const handleConversion = () => { 
		let decimalValue; 
		switch (inputFormat) { 
			case 'binary': 
				decimalValue = parseInt(inputNumber, 2); 
				break; 
			case 'octal': 
				decimalValue = parseInt(inputNumber, 8); 
				break; 
			case 'hexadecimal': 
				decimalValue = parseInt(inputNumber, 16); 
				break; 
			default: 
				decimalValue = parseInt(inputNumber, 10); 
		} 
		if (inputFormat !== 'decimal') setDecimal(decimalValue); 

		// Finding Integer Number 
		setInteger(Math.floor(decimalValue)); 

		// Finding the Binary Representation 
		setBinary((Math.floor(decimalValue)).toString(2)); 

		// Finding the Octal Representation 
		setOctal((Math.floor(decimalValue)).toString(8)); 

		// Finding the Hexadecimal Representation 
		setHexadecimal((Math.floor(decimalValue)).toString(16).toUpperCase()); 

		// Setting the word for given integer 
		if(decimalValue <= 1000000000000000) setInword(numberToWords.toWords(decimalValue)); 
		else setInword("Over Limit (Max-Limit : 1000000000000000"); 

		// Setting the Rounded Number 
		if (inputFormat === 'decimal') setRoundDigit(roundToKthInteger(parseFloat(decimal, 10), parseInt(rounddigitindex, 10))); 
		else setRoundDigit(roundToKthInteger(parseFloat(decimalValue, 10), parseInt(rounddigitindex, 10))); 

		// Setting the numerator and denominator 
		if (inputFormat === 'decimal' && parseFloat(decimal, 10) - decimalValue !== 0) { 
			const result = floatToFraction(parseFloat(decimal, 10) - decimalValue); 
			setNumerator(result.numerator); 
			setDenominator(result.denominator); 
		} else { 
			setNumerator('0'); 
			setDenominator('0'); 
		} 

		// Setting the Significant Digits 
		if (inputFormat === 'decimal') setSignificantno(roundToSignificantDigits(parseFloat(decimal, 10), parseInt(significantnoindex, 10))); 
		else setSignificantno(roundToSignificantDigits(parseFloat(decimalValue, 10), parseInt(significantnoindex, 10))); 
	} 

	function floatToFraction(number) { 
		const tolerance = 0.000001; 
		let numerator = 1; 
		let denominator = 1; 
		let error = number - numerator / denominator; 

		while (Math.abs(error) > tolerance) { 
			if (error > 0) numerator++; 
			else denominator++; 
			error = number - numerator / denominator; 
		} 
		return { 
			numerator: numerator, 
			denominator: denominator 
		}; 
	} 

	function roundToKthInteger(number, k) { 
		const multiplier = Math.pow(10, k); 
		return Math.round(number * multiplier) / multiplier; 
	} 

	function roundToSignificantDigits(number, significantDigits) { 
		if (significantDigits <= 0) return 0; 
		const multiplier = Math.pow(10, significantDigits - Math.floor(Math.log10(Math.abs(number))) - 1); 
		const roundedNumber = (Math.round(number * multiplier) / multiplier); 
		return roundedNumber; 
	} 

	return ( 
		<div className='application'> 
			<h1>Number Format Converter</h1> 
			<div className="section"> 
				<div className="row"> 
					<p>From</p> 
					<select value={inputFormat} onChange={(e) => setInputFormat(e.target.value)}> 
						<option value="binary">Binary</option> 
						<option value="decimal">Decimal</option> 
						<option value="octal">Octal</option> 
						<option value="hexadecimal">Hexadecimal</option> 
					</select> 
				</div> 
				<div className="row"> 
					<p>Enter {inputFormat} Number</p> 
					<div> 
						<input 
							type={(inputFormat !== 'decimal') ? "text" : "number"} 
							value={inputNumber} 
							onChange={(e) => { 
								if (inputFormat === 'decimal') { 
									setDecimal(e.target.value); 
									setInputNumber(e.target.value) 
								} else { 
									setInputNumber(e.target.value); 
								} 
							}} 
						/> 
						<button onClick={handleConversion}>Convert</button> 
					</div> 
				</div> 
				<div className="row"> 
					<p>Integer Number</p> 
					<input 
						type="number"
						value={integer} 
						onChange={(e) => { }} 
					/> 
				</div> 
				<div className="row"> 
					<p>Significant Number</p> 
					<div> 
						<input 
							type="number"
							value={significantno} 
							onChange={(e) => { }} 
						/> 
						<select value={significantnoindex} onChange={(e) => { 
							setSignificantnoindex(e.target.value) 
							if (decimal !== '') setSignificantno(roundToSignificantDigits(parseFloat(decimal, 10), parseInt(e.target.value, 10))); 
						}}> 
							{[...Array(9).keys()].map((value) => ( 
								<option key={value + 1} value={value + 1}> 
									{value + 1} 
								</option> 
							))} 
						</select> 
					</div> 
				</div> 
				<div className="row"> 
					<p>Rounded Number</p> 
					<div> 
						<input 
							type="number"
							value={rounddigit} 
							onChange={(e) => { }} 
						/> 
						<select value={rounddigitindex} onChange={(e) => { 
							setRoundDigitindex(e.target.value); 
							if (decimal !== '') setRoundDigit(roundToKthInteger(parseFloat(decimal), parseInt(e.target.value, 10))); 
						}}> 
							{[...Array(10).keys()].map((value) => ( 
								<option key={value} value={value}> 
									{value} 
								</option> 
							))} 
						</select> 
					</div> 
				</div> 
				<div className="row"> 
					<p>Fraction</p> 
					<div> 
						<input 
							type="number"
							value={integer} 
							onChange={(e) => { }} 
						/> 
						<input 
							type="number"
							value={numerator} 
							onChange={(e) => { }} 
						/> 
						<p>/</p> 
						<input 
							type="number"
							value={denominator} 
							onChange={(e) => { }} 
						/> 
					</div> 
				</div> 
				<div className="row"> 
					<p>{(inputFormat === 'binary') ? "Decimal" : "Binary"} Format(Base-{(inputFormat === 'binary') ? "10" : "2"}) of Integer {integer}</p> 
					<input 
						type="number"
						value={(inputFormat === 'binary') ? decimal : binary} 
						onChange={(e) => { }} 
					/> 
				</div> 
				<div className="row"> 
					<p>{(inputFormat === 'octal') ? "Decimal" : "Octal"} Format(Base-{(inputFormat === 'octal') ? "10" : "8"}) of Integer {integer}</p> 
					<input 
						type="number"
						value={(inputFormat === 'octal') ? decimal : octal} 
						onChange={(e) => { }} 
					/> 
				</div> 
				<div className="row"> 
					<p>{(inputFormat === 'hexadecimal') ? "Decimal" : "Hexadecimal"} Format(Base-{(inputFormat === 'hexadecimal') ? "10" : "16"}) of Integer {integer}</p> 
					<input 
						type="text"
						value={(inputFormat === 'hexadecimal') ? decimal : hexadecimal} 
						onChange={(e) => { }} 
					/> 
				</div> 
				<div className="row"> 
					<p>In Words of Integer {integer}</p> 
					<input 
						type="text"
						value={inword} 
						onChange={(e) => { }} 
					/> 
				</div> 
			</div> 
		</div> 
	) 
} 
