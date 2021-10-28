import './Spinner.css'

const Spinner = ({ height = 16, width = 16 }) => {
	return (
		<div className=" flex justify-center items-center mt-3">
			<div
				className={`loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-${height} w-${width}`}
				style={{ borderTopColor: '#3498db' }}
			/>
		</div>  
	)
}

export default Spinner