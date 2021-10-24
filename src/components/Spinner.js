import './Spinner.css'

const Spinner = () => {
	return (
		<div className=" flex justify-center items-center">
			<div
				className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
				style={{ borderTopColor: '#3498db' }}
			/>
		</div>  
	)
}

export default Spinner