import axios from 'axios'

export default axios.create({
	baseURL: 'https://quiz-ef1c2.firebaseio.com'
})