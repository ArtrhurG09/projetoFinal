import { useState } from "react"
import OptionFunction from "./OptionFunction"

function SelectFunction({updateConfig, options, updateKey, defaultSelected}){
    function getIndexDefault(){
        for (let i = 0; i < options.length; i++) {
            if (options[i][1] == defaultSelected){
                return i
            }
        }
        return null
    }
    const [selectedIndex, setSelectedIndex] = useState(getIndexDefault())

    function verifySelected(index){
        if (index == selectedIndex){
            return true
        }else{
            return false
        }
    }

    return (
        <>
            <div className="d-flex gap-1">
                {options.map(([value, argument], index)=>{
                    return <OptionFunction updateKey={updateKey} argument={argument} updateConfig={updateConfig} value={value} isSelected={verifySelected(index)} index={index} setSelectedIndex={setSelectedIndex}></OptionFunction>
                })}
            </div>
        </>
    )
}

export default SelectFunction