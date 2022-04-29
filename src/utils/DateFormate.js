import React, {useState} from 'react';
import { View } from 'react-native';
import Moment from 'moment';
// import { Container } from './styles';

const DateFormate = ({date, locale}) => {

    const [value, setValue] = useState(date);
    console.log(date)
    
    return Moment(value).format('MMMM Do YYYY, h:mm a')
}

export default DateFormate;