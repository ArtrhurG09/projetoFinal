import "./selectComponent.css"

function OptionFunction({isSelected, value, setSelectedIndex, index, argument, updateConfig, updateKey}){
    function click(){
        setSelectedIndex(index)
        updateConfig(updateKey, argument)
    }

    return (
        <>
            <button onClick={click} className={
                function (){
                    if (isSelected){
                        return "btn selected"
                    }else{
                        return "btn notSelected"
                    }
                }()
            }>
                {value}
            </button>
        </>
    )
}

export default OptionFunction