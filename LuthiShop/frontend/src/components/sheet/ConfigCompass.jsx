import { useState } from 'react'
import './music/music.css'
import SelectFunction from '../selectFunction/SelectFunction'

function ConfigCompass({changeCompassNumber, setChangeCompassNumber, config, compassArray, setCompassArray}){
    const [newConfig, setNewConfig] = useState(config)
    
    function change(){
        setCompassArray(
            compassArray.map((cCompass, index) => {
                if (index == changeCompassNumber){
                    return newConfig
                }
                return cCompass
            })
        )
        setChangeCompassNumber(null)
    }

    function updateConfig(key, value){
        setNewConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const clefs = [
        ["Sol", "treble"],
        ["Fá", "bass"],
        ["Dó", "alto"]
    ]

    const tempos = [
        ["2/4", "2/4"],
        ["2/2", "2/2"],
        ["3/4", "3/4"],
        ["3/8", "3/8"],
        ["4/4", "4/4"],
        ["12/8", "12/8"],
        ["5/4", "5/4"],
        ["7/8", "7/8"]
    ]

    const tones = [
        ["Dó Maior", "C"],
        ["Sol Maior", "G"],
        ["Ré Maior", "D"],
        ["Lá Maior", "A"],
        ["Mi Maior", "E"],
        ["Si Maior", "B"],
        ["Fá Sustenido Maior", "F#"],
        ["Dó Sustenido Maior", "C#"]
    ]
    return (
        <>
            <div className="bg rounded-3 p-4 w-50 compassConfig">
                <div>
                    <h2>Clave</h2>
                    <SelectFunction defaultSelected={newConfig.clef} options={clefs} updateKey="clef" updateConfig={updateConfig}></SelectFunction>
                </div>
                <div className='my-3'>
                    <h2>Tempo</h2>
                    <SelectFunction defaultSelected={newConfig.timeSignature} options={tempos} updateKey="timeSignature" updateConfig={updateConfig}></SelectFunction>
                </div>
                <div className="my-5">
                    <h2>Tonalidade</h2>
                    <div className="my-3">
                        <h4>Maiores</h4>
                        <SelectFunction defaultSelected={newConfig.tone} options={tones} updateKey="tone" updateConfig={updateConfig}></SelectFunction>
                    </div>
                </div>
                <div>
                    <h2>Armadura de Clave</h2>
                    <button className={
                        function (event){
                            if (newConfig.showTimeAndKeySignature){
                                return "btn btn-primary"
                            }else{
                                return "btn btn-secondary"
                            }
                        }()
                    } onClick={(event) => {// corrigir tempos, corrigir continuidade de configs nos compasoss
                        if (newConfig.showTimeAndKeySignature){
                            setNewConfig({ ...newConfig, showTimeAndKeySignature: false })
                        }else{
                            setNewConfig({ ...newConfig, showTimeAndKeySignature: true })
                        }

                    }}>{
                        function (){
                            if (newConfig.showTimeAndKeySignature){
                                return "Mostrar"
                            }else{
                                return "Não Mostrar"
                            }
                        }()
                    }</button>
                </div>
                <div className="d-flex gap-1 my-3 justify-content-end">
                    <button className="btn btn-secondary" onClick={()=>{setChangeCompassNumber(null)}}>Cancelar</button>
                    <button className="btn btn-primary" onClick={change}>Ok</button>
                </div>
            </div>
        </>
    )
}

export default ConfigCompass