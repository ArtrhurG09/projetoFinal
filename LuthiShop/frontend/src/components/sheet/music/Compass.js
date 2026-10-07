import { Note, Stave } from "vexflow";
import { StaveNote } from "vexflow";
import { Voice } from "vexflow";
import { Formatter } from "vexflow";

export class Compass {
    stave
    notas
    voice
    x
    y

    constructor({
        x,
        y,
        width,
        context,
        showTimeAndKeySignature,
        clef,
        timeSignature,
        tone,
        notes
    }) {
        this.stave = new Stave(x, y, width)

        this.x = x
        this.y = y

        if (showTimeAndKeySignature) {
            this.stave.setClef(clef)
            this.stave.addTimeSignature(timeSignature)
            this.stave.addKeySignature(tone)
        }

        this.stave.setContext(context)
        this.stave.draw()

        this.notas = notes.length > 0
            ? notes.map(note =>
                new StaveNote({
                    keys: note.keys,
                    duration: note.duration
                })
            )
            : [
                new StaveNote({
                    keys: ["b/4"],
                    duration: "wr"
                })
            ]

        this.voice = new Voice({
            numBeats: parseInt(timeSignature.charAt(0)),
            beatValue: parseInt(timeSignature.charAt(2))
        })

        this.voice.addTickables(this.notas)

        new Formatter()
            .joinVoices([this.voice])
            .format([this.voice], width - 50)

        this.voice.draw(
            context,
            this.stave
        )
    }

    getCompass() {
        return this.stave
    }
}


